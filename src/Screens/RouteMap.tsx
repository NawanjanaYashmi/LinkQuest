import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ScrollView, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import TestMap from './MapCard';
import MapCardPlace from './MapcardPlace';


const RouteMap: React.FC = () => {
  const [numberOfDays, setNumberOfDays] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [startingPlace, setStartingPlace] = useState<string | null>(null);
  const [startingTime, setStartingTime] = useState<string | null>(null);
  const [tripPlan, setTripPlan] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const days = await AsyncStorage.getItem('number_of_days');
        const month = await AsyncStorage.getItem('selected_month');
        const tags = await AsyncStorage.getItem('selected_tags');
        const startingPlace = await AsyncStorage.getItem('Starting_Place');
        const startingTime = await AsyncStorage.getItem('Starting_Time');
        const location = await AsyncStorage.getItem('location');

        setNumberOfDays(days);
        setSelectedMonth(month);
        setStartingPlace(startingPlace);
        setStartingTime(startingTime);

        if (tags) {
          setSelectedTags(JSON.parse(tags));
        }

        const requestData = {
          day: days,
          starting_from: startingPlace,
          locations: location,
          starting_time: startingTime,
          starting_date: month,
          tags: selectedTags
        };
        

        const response = await axios.post('http://10.0.2.2:5000/map/process', requestData);
        if (response.status === 200) {
          setTripPlan(response.data);
        } else {
          Alert.alert('Error', 'Failed to fetch trip plan from server.');
        }
      } catch (error) {
        console.error('Failed to load data from AsyncStorage or server', error);
        Alert.alert('Error', 'An error occurred while fetching data.');
      }
    };

    fetchData();
  }, []);

  const renderDayPlan = (day: any, index: number) => {
  const locationsArray = [day.breakfast_location, day.night_staying_location]; 
    return (
      <View key={index} style={styles.dayContainer}>
        <Text style={styles.dayTitle}>Day {index + 1} - {day.date}</Text>
        
        <View style={styles.mapContainer}>
          
        <TestMap 
        locations={locationsArray}
        />
        </View>
        {day.locations.map((location: any, locIndex: number) => (
          <View key={locIndex} style={styles.locationContainer}>
            <Text style={styles.locationTitle}>{location.name} ({location.arrival_time} - {location.departure_time})</Text>
            {location.activities.map((activity: any, actIndex: number) => {
  
  let mealLocation = null;
  if (activity.description.toLowerCase().includes('breakfast')) {
    mealLocation = day.breakfast_location;
  } else if (activity.description.toLowerCase().includes('lunch')) {
    mealLocation = day.lunch_location;
  } else if (activity.description.toLowerCase().includes('dinner')) {
    mealLocation = day.dinner_location;
  }
  return (
    <View key={actIndex} style={styles.activityContainer}>
      <Text style={styles.activityPlace}>{activity.place}</Text>
      <Text style={styles.activityTime}>{activity.time}</Text>
      <Text style={styles.activityDescription}>{activity.description}</Text>

      {mealLocation && (
        <View style={styles.mapContainer}>
          <MapCardPlace locations={[mealLocation]} />
        </View>
      )}
    </View>
  );
})}
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Trip Plan</Text>

    
      {tripPlan ? (
        <View style={styles.tripPlanContainer}>
          <ImageBackground
            source={require('../Images/SummaryCard.png')} // Update with the path to your background image
            style={styles.summaryCard}
          >
            <Text style={styles.infoTextDay}>{tripPlan.trip_duration_days}</Text>
            <Text style={styles.infoTextDayString}>Days {tripPlan.month}</Text>
            <Text style={styles.infoText}>{tripPlan.starting_time}</Text>
            <Text style={styles.infoTextPlace}>{tripPlan.starting_from}</Text>
          </ImageBackground>
          {Object.keys(tripPlan.daily_plan).map((key, index) => (
            renderDayPlan(tripPlan.daily_plan[key], index)
          ))}
          
        </View>
        
        
      ) : (
        <Text style={styles.infoText}>Fetching trip plan...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
     color: '#75A82B',
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  tripPlanContainer: {
    marginTop: 20,
   
    
  },
  dayContainer: {
    elevation: 8,
    marginBottom: 20,
    padding: 16,
    borderColor: '#275300',
    borderWidth: 1,
    backgroundColor: '#ECFADC',
    borderRadius: 20,
    shadowColor: '#00000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 20,
   
  },
  dayTitle: {
    color: '#275300',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoTextDayString:{
    marginStart:30,
    color: '#275300',
    fontSize: 20,
    marginBottom: 5,
  },
  infoText: {
    marginStart:60,
    marginTop: 10,
    color: '#275300',
    fontSize: 16,
    marginBottom: 5,
  },
  mapContainer:{
    height: 200,
    borderRadius: 8,
  },
  infoTextPlace: {
    marginTop: 4,
    marginStart:60,
    color: '#275300',
    fontSize: 16,
    marginBottom: 5,
  },
  infoTextDay: {
    marginTop: 10,
    fontWeight: 'bold',
    marginStart:34,
    color: '#275300',
    fontSize: 40,
  
  },


  
  locationContainer: {
    elevation: 8,
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  locationTitle: {
    color: '#275300',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  activityContainer: {
    
    marginTop: 10,
  },
  activityPlace: {
    color: '#275300',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityTime: {
    color: '#555',
    fontSize: 14,
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  summaryCard: {
    height:175,
    resizeMode: 'contain',
    borderRadius: 8,
    marginBottom: 20,
  },
  boxText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RouteMap;
