import React, { useState } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { authorize } from 'react-native-app-auth';
import axios from 'axios';

const config = {
  issuer: 'https://accounts.google.com',
  clientId: '591274084893-9lhjmsrntjsjfua27q3h6nd1mjbo0iq5.apps.googleusercontent.com',
  redirectUrl: 'https://linkquestapp.page.link/LinkQuest', // Your HTTPS redirect URI
  scopes: ['https://www.googleapis.com/auth/calendar'], // Request calendar read-only access
};

const GoogleCalendarScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Authenticate user with Google
      const authState = await authorize(config);
      console.log('Access Token:', authState.accessToken);

      // Fetch user's Google Calendar events
      await fetchUserCalendarEvents(authState.accessToken);
    } catch (err) {
      console.error('Failed to authenticate user', err);
      setError('Failed to authenticate user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserCalendarEvents = async (accessToken: string) => {
    try {
      const response = await axios.get(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setEvents(response.data.items);
    } catch (err) {
      console.error('Failed to fetch user events', err);
      setError('Failed to fetch user events. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Google Calendar Events</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button title="Login with Google" onPress={handleGoogleLogin} />

          {error && <Text style={styles.error}>{error}</Text>}

          <FlatList
            data={events}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.eventItem}>
                <Text style={styles.eventTitle}>{item.summary}</Text>
                <Text style={styles.eventDate}>
                  {item.start?.dateTime || item.start?.date}
                </Text>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginVertical: 10,
  },
  eventItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  eventTitle: {
    fontSize: 18,
  },
  eventDate: {
    color: '#666',
  },
});

export default GoogleCalendarScreen;