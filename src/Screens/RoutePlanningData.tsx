import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Platform, TextInput } from 'react-native';
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
    } catch (error) {
      Alert.alert('Error', 'Failed to save data.');
    }

    navigation.navigate('RouteMap');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Starting From This Location:</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Enter location"
      />
      <Text style={styles.label}>Starting Time:</Text>
      <Button title="Select Time" onPress={() => setShowTimePicker(true)} />
      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={time || new Date()}
          onChange={handleTimeChange}
          display="default"
        />
      )}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 16,
  },
  tagContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  tag: {
    backgroundColor: '#ddd',
    padding: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  tagText: {
    color: '#333',
    fontSize: 14,
  },
});

export default RoutePlanningData;