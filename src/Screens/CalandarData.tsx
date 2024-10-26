import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, ListRenderItem, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

// Define the CalendarEvent interface
interface CalendarEvent {
  id: string;
  summary: string;
  start: {
    dateTime?: string;
    date?: string;
  };
}

const CalendarDate: React.FC = () => {

  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [combinedDates, setCombinedDates] = useState<Date[][]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [eventsForSelectedDates, setEventsForSelectedDates] = useState<CalendarEvent[]>([]);
  const [predictions, setPredictions] = useState<number[]>([]);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [loadingPopup, setLoadingPopup] = useState<boolean>(false);
  const [cardColors, setCardColors] = useState<string[]>([]);
  const [calendarConnected, setCalendarConnected] = useState<boolean>(false);

  const API_KEY = 'AIzaSyAXn2msB7vYFoid-_7G7wQdIVSSUE3mBNA';
  const REGION_CODE = 'en.lk';

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1086206763805-c702vpspr6g0hf38pn5bubkn79944q6p.apps.googleusercontent.com',
      offlineAccess: true,
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { idToken } = await GoogleSignin.getTokens();

      if (idToken) {
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        await auth().signInWithCredential(googleCredential);
        setCalendarConnected(true); // Set the calendarConnected state to true
        await fetchLocalHolidays(); // Wait for holidays to be fetched
      }
    } catch (error) {
      handleSignInError(error);
    }
  };

  const handleSignInError = (error: any) => {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('User cancelled the login process');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Sign in is in progress already');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Play services are not available');
    } else {
      console.error('Sign in error:', error);
    }
  };

  const fetchLocalHolidays = async () => {
    setLoading(true);
    try {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(startOfMonth.getMonth() + 1);
      endOfMonth.setDate(0);
      endOfMonth.setHours(23, 59, 59, 999);

      const startDate = startOfMonth.toISOString();
      const endDate = endOfMonth.toISOString();

      const holidaysCalendarId = `${REGION_CODE}%23holiday@group.v.calendar.google.com`;

      const response = await axios.get<{ items: CalendarEvent[] }>(
        `https://www.googleapis.com/calendar/v3/calendars/${holidaysCalendarId}/events`,
        {
          params: {
            key: API_KEY,
            timeMin: startDate,
            timeMax: endDate,
            singleEvents: true,
            orderBy: 'startTime',
          },
        }
      );

      const allHolidays = response.data.items || [];
      const filteredHolidays = allHolidays.filter((holiday) => {
        const holidayDate = new Date(holiday.start.date || holiday.start.dateTime || '');
        return (
          holidayDate.getMonth() === new Date().getMonth() &&
          holidayDate.getFullYear() === new Date().getFullYear()
        );
      });

      const weekends = getWeekendsForCurrentMonth();
      const allDates = [...filteredHolidays.map(event => new Date(event.start.date || event.start.dateTime || '')), ...weekends];

      combineNearDates(allDates);
    } catch (error) {
      console.error('Failed to fetch holidays:', error);
    }
    setLoading(false);
  };

  const combineNearDates = (allDates: Date[]) => {
    allDates.sort((a, b) => a.getTime() - b.getTime());

    const groupedDates: Date[][] = [];
    let currentGroup: Date[] = [];

    for (let i = 0; i < allDates.length; i++) {
      if (currentGroup.length === 0) {
        currentGroup.push(allDates[i]);
      } else {
        const lastDate = currentGroup[currentGroup.length - 1];
        const diffDays = (allDates[i].getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);

        if (diffDays <= 2) {
          currentGroup.push(allDates[i]);
        } else {
          groupedDates.push([...currentGroup]);
          currentGroup = [allDates[i]];
        }
      }
    }

    if (currentGroup.length > 0) {
      groupedDates.push(currentGroup);
    }

    setCombinedDates(groupedDates);

    if (cardColors.length === 0) {
      const colors = groupedDates.map(() => getRandomColor());
      setCardColors(colors);
    }
  };

  const getWeekendsForCurrentMonth = () => {
    const weekends: Date[] = [];
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(startOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);

    let currentDate = new Date(startOfMonth);

    while (currentDate <= endOfMonth) {
      if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        weekends.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weekends;
  };

  const fetchEventsForDates = async (dates: Date[]) => {
    const dateStrings = dates.map(date => date.toISOString().split('T')[0]);
  
    try {
      const startDate = new Date(dateStrings[0]).toISOString();
      const endDate = new Date(dateStrings[dateStrings.length - 1] + 'T23:59:59Z').toISOString();
  
      const accessToken = await GoogleSignin.getTokens().then(tokens => tokens.accessToken);
  
      const response = await axios.get<{ items: CalendarEvent[] }>(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            key: API_KEY,
            timeMin: startDate,
            timeMax: endDate,
            singleEvents: true,
            orderBy: 'startTime',
          },
        }
      );
  
      const events = response.data.items || [];
      setEventsForSelectedDates(events);
  
      // Extract event names and get predictions
      const eventNames = events.map(event => event.summary);
      await getEventPredictions(eventNames); // Wait for predictions to be fetched
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };
  
  const getEventPredictions = async (eventNames: string[]) => {
    if (eventNames.length === 0) {
      // If no events, set predictions to an empty array and return early
      setPredictions([]);
      return;
    }
  
    const requestPayload = { texts: eventNames };
  
    try {
      const response = await axios.post<{ predictions: number[] }>(
        'http://10.0.2.2:5000/predict', // Update this URL if needed
        requestPayload,
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      console.log('Predictions response:', response.data);
  
      // Wait for a short period before setting predictions
      await new Promise(resolve => setTimeout(resolve, 500)); // Adjust the delay if necessary
      setPredictions(response.data.predictions || []);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error response data:', error.response?.data || 'No response data');
        console.error('Error status:', error.response?.status || 'No status');
        console.error('Error headers:', error.response?.headers || 'No headers');
        console.error('Error message:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
  
      // Set predictions to an empty array in case of error
      setPredictions([]);
    }
  };

  const handleInfoButtonPress = (dates: Date[]) => {
    setSelectedDates(dates);

    setLoadingPopup(true);
    fetchEventsForDates(dates).finally(() => {
      setLoadingPopup(false);
      setPopupVisible(true);
    });
  };

  const renderCardItem: ListRenderItem<Date[]> = ({ item, index }) => {
    const cardColor = cardColors[index] || '#ffffff';
    const height = 50 * item.length;

    return (
      <TouchableOpacity onPress={() => navigation.navigate('PromotionScreen')}>
      <View style={[styles.card, { backgroundColor: cardColor, height }]}>
        {item.map((date, dateIndex) => (
          <Text key={dateIndex} style={styles.cardText}>{date.toDateString()}</Text>
        ))}
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => handleInfoButtonPress(item)}
        >
          <Text style={styles.infoButtonText}>i</Text>
        </TouchableOpacity>
      </View>
      </TouchableOpacity>
    );
  };

  const getRandomColor = () => {
    const colors = ['#75A82B', '#7FBF3F', '#6FA33D', '#5C8B2B', '#4A7524', '#375E1D', '#294817'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {!calendarConnected ? (
        <Button color='#75A82B' title="Connect Your Calendar" onPress={signInWithGoogle} />
      ) : (
        <Image source={require('../Images/banner.png')} style={styles.connectedImage} />
      )}

      {loading ? (
        <Text style={styles.loadingText}>Loading holidays...</Text>
      ) : (
        <FlatList
          data={combinedDates}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderCardItem}
        />
      )}

      {popupVisible && (
        <View style={styles.eventsContainer}>
          {loadingPopup ? (
            <ActivityIndicator size="large" color="#75A82B" />
          ) : (
            <>
              <Text style={styles.eventsTitle}>
                {eventsForSelectedDates.length > 0 ? 'Events:' : 'No events for selected dates'}
              </Text>
              {eventsForSelectedDates.length > 0 ? (
                eventsForSelectedDates.map((event, index) => (
                  <Text
                    key={event.id}
                    style={[
                      styles.eventText,
                      {
                        color: predictions[index] === 1 ? 'red' : 'green', // Red for "Busy", Green for "Free"
                      },
                    ]}
                  >
                    {event.summary} - {predictions[index] === 1 ? 'Busy' : 'Free'}
                  </Text>
                ))
              ) : (
                <Text style={styles.eventText}>No events for selected dates</Text>
              )}
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  infoButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 5,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoButtonText: {
    fontSize: 20,
    color: '#000',
  },
  eventsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventText: {
    fontSize: 16,
    marginVertical: 5,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  connectedImage: {
    width: '100%', // Adjust width as needed
    height: 200, // Adjust height as needed
    resizeMode: 'contain', // Adjust the resize mode as needed
    marginBottom: 20, // Add margin if needed
  },
});

export default CalendarDate;