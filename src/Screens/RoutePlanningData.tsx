import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Platform, TextInput, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const RoutePlanningData: React.FC = ({ navigation }: any) => {
  const [location, setLocation] = useState<string>('');
  const [time, setTime] = useState<Date | undefined>(undefined);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setTime(selectedDate);
    }
  };

  const handleSubmit = async () => {
    if (!location) {
      Alert.alert('Validation Error', 'Location is required.');
      return;
    }

    if (!time) {
      Alert.alert('Validation Error', 'Time is required.');
      return;
    }

    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    const timeString = new Intl.DateTimeFormat('en-GB', options).format(time).substring(0, 5);

    try {
      await AsyncStorage.setItem('Starting_Place', location);
      await AsyncStorage.setItem('Starting_Time', timeString);
      Alert.alert('Success', 'Data saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save data.');
    }

    navigation.navigate('RouteMap');
  };

  return (
    <View style={styles.container}>
      
      <Image 
        source={require('../Images/pickerPageImg.png')} 
        style={styles.image} 
        resizeMode="contain" // Options: cover, contain, stretch, etc.
      />
      <Text style={styles.header}>Route Planning</Text>
      <Text style={styles.label}>Starting From This Location:</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Enter location"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Starting Time:</Text>
      <TouchableOpacity style={styles.timeButton} onPress={() => setShowTimePicker(true)}>
        <Text style={styles.buttonText}>Select Time</Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={time || new Date()}
          onChange={handleTimeChange}
          display="default"
        />
      )}

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#2A2A2A',
  },
  image:{
    alignSelf:'center',
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  timeButton: {
    backgroundColor: '#75a82b',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#75a82b',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RoutePlanningData;