import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { Header, Image } from 'react-native-elements';
import { Card, Button } from 'react-native-paper';
import SearchBar from 'react-native-dynamic-search-bar';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';

interface Hotel {
  id: string; 
  Img_URL?: string;
  Name: string;
  City: string;
  Visits: number;
  About: string;
}

const HotelScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Hotel'));
        const hotelData = querySnapshot.docs.map(doc => ({
          id: doc.id, // Set the document ID as the hotel ID
          ...doc.data(), // Spread the document's data into the hotel object
        })) as Hotel[];
        setHotels(hotelData);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        setEmail(storedEmail);
        console.log('Fetched Email:', storedEmail);
      } catch (err) {
        console.error('Error fetching email:', err);
      }
    };

    fetchEmail();
  }, []);

  const filteredHotels = hotels.filter((hotel) =>
    hotel.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewMore = async (hotel: Hotel) => {
    console.log('Selected Hotel ID:', hotel.id); // Log the hotel ID for debugging
    // Here you can save the hotel ID or navigate to another screen if needed
    // For example, save to AsyncStorage or navigate to details
  };

  return (
    <ScrollView>
      <Header
        centerComponent={{
          text: 'Hotels',
          style: { color: '#2A2A2A', fontSize: 20, fontWeight: 'bold', marginTop: 10 },
        }}
        backgroundColor="white"
      />

      <View style={styles.container}>
        <SearchBar
          style={styles.searchbar}
          placeholder="Search here"
          onChangeText={text => setSearchQuery(text)}
        />

        {filteredHotels.map((hotel) => (
          <Card style={styles.cardMain} key={hotel.id}>
            <Card.Cover
              source={{ uri: hotel.Img_URL || 'https://via.placeholder.com/150' }}
              style={{ width: 355, height: 180 }}
            />
            <Card.Content>
              <View style={styles.rowContainerTextOne}>
                <Text style={styles.cardTextOneLeft}>{hotel.Name}</Text>
              </View>
              <Text style={styles.cardTextTwo}>
                {hotel.City} - Visits: {hotel.Visits}
              </Text>
              <Text style={styles.cardAboutText}>{hotel.About}</Text>
              <Button
                style={styles.viewMoreBtn}
                onPress={() => handleViewMore(hotel)} // Trigger the view more function
              >
                <Text style={styles.viewMoreText}>View More Details</Text>
              </Button>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', alignItems: 'center' },
  searchbar: { marginTop: 35, width: '90%', height: 40, backgroundColor: '#F5F5F5' },
  cardMain: { width: '90%', marginTop: 20, backgroundColor: '#F5F5F5' },
  rowContainerTextOne: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardTextOneLeft: { marginTop: 8, fontSize: 17, fontWeight: '500', color: '#2A2A2A' },
  cardTextTwo: { fontSize: 14, fontWeight: '500', color: '#c5c5c5' },
  cardAboutText: { fontSize: 12, color: '#6b6b6b', marginTop: 5 },
  viewMoreBtn: { backgroundColor: '#75A82B', borderRadius: 15, marginTop: 10 },
  viewMoreText: { color: 'white', fontSize: 12, fontWeight: '500' },
});

export default HotelScreen;