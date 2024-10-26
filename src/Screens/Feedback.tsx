import { View, Text, StyleSheet, TouchableOpacity, Alert, Image as RNImage } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { AirbnbRating } from 'react-native-ratings';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebaseconfig';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import axios from 'axios';


const Feedback = () => {
  const [hotelName, setHotelName] = useState('');
  const [hotelImage, setHotelImage] = useState('');
  const [rating, setRating] = useState(0);
  const [about, setAbout] = useState('');
  const [summary, setSummary] = useState(''); // State for summary

  const hotelId = '1NZtaXkjHTBdG0a2K2Gd';
  const userID = 'Dinusajith@gmail.com'

  

const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

   const navigateallreviews=() =>{
    navigation.navigate("AllReviews",{hotelId});
   }

   const navigatelinkquestreviews=() =>{
    navigation.navigate("LinkQuestReviews",{hotelId, userID});
   }



  // const LinkQuestreviewpage = () => {
  //   navigation.navigate('LinkQuestReviews', { hotelId });
  // };



  useEffect(() => {
    fetchHotel();
  }, []);

  const fetchHotel = async () => {
   // const hotelId = '1NZtaXkjHTBdG0a2K2Gd'; // hard-coded hotel ID
    
    try {
      const hotelDoc = doc(db, 'Hotel', hotelId);
      const snapshot = await getDoc(hotelDoc);
      
      if (snapshot.exists()) {
        const data = snapshot.data();
        setHotelName(data.Name);
        setHotelImage(data.Img_url);
        setAbout(data.about);

        const reviewsRef = collection(db, 'reviews');
        const q = query(reviewsRef, where('hotelId', '==', hotelId));
        const reviewsSnapshot = await getDocs(q);

        if (!reviewsSnapshot.empty) {
          let totalRating = 0;
          let count = 0;

          reviewsSnapshot.forEach((doc) => {
            const reviewData = doc.data();
            totalRating += reviewData.rating;
            count++;
          });

          const avgRating = totalRating / count;
          setRating(avgRating);
        } else {
          setRating(0);
        }

       
        const hotelDetails = `Hotel name: ${data.Name}, About: ${data.about}, Rating: ${rating}`;
       
      } else {
        Alert.alert('No hotel found', 'The hotel ID does not exist.');
        setHotelName('');
        setHotelImage('');
        setRating(0);
        setAbout('');
      }
    } catch (error) {
      console.error('Error fetching hotel:', error);
      Alert.alert('Error', 'There was an error fetching the hotel data.');
    }
  };

  const summarizeHotelDetails = async (about: string): Promise<string> => {

    console.log(about)//for testing
    
    const keyA = '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'; // Replace with your actual API key
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [
            { role: 'user', content: `Summarize the following hotel description in two lines:\n\n${about}` }
          ],
          max_tokens: 50,
        },
        {
          headers: {
            Authorization: `Bearer ${keyA}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.data.choices && response.data.choices.length > 0) {
        return response.data.choices[0].message.content.trim();
      } else {
        return 'No summary available.';
      }
    } catch (error) {
      console.error('Error summarizing hotel details:', error);
      return 'Error occurred while summarizing hotel details.';
    }
    return ""
  };
  
  return (
    <View style={{ flex: 2 }}>
      <View style={{ flex: 1, borderBottomEndRadius: 50 }}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon2 name="chevron-back" size={25} color="white" />
        </TouchableOpacity>

        {hotelImage ? (
          <RNImage source={{ uri: hotelImage }} style={styles.hotelImage} resizeMode="cover" />
        ) : (
          <Text>No image available</Text>
        )}
      </View>

      <View style={{ flex: 2, backgroundColor: 'white', borderRadius: 30 }}>
        <Text style={styles.hotelName}>{hotelName}</Text>
        <Text style={styles.hotelAbout}>{about}</Text>

        <View style={styles.ratingContainer}>
          <AirbnbRating
            count={5}
            defaultRating={rating}
            size={15}
            showRating={false}
            isDisabled={true}
            selectedColor="#FFD700"
          />
        </View>

        <Text style={styles.details}>Hotel Details....</Text>
      </View>

      <View style={{ flex: 1, flexDirection: 'column', borderRadius: 30, top: 15 }}>
        <Text style={styles.summary}>Summary Of Feedback</Text>
        <ScrollView>
          <View style={styles.box2}>
            <Text style={styles.boxText}>{summary || 'Summary not available yet...'}</Text>
          </View>
        </ScrollView>
      </View>

      <View style={{ flex: 1, alignItems: 'center' }}>
        <Button
          title="All Review"
          buttonStyle={styles.button1}
          containerStyle={styles.buttonContainer}
          onPress={navigateallreviews}
        />
        <Button
          title="LinkQuest Reviews"
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={navigatelinkquestreviews}
        />
      </View>
      <TouchableOpacity style={{borderWidth: 1,borderColor: 'green',alignItems: 'center',justifyContent: 'center',width: 50,position: 'absolute',top: 600,right: 20,height: 50,backgroundColor: 'green',borderRadius: 100,}}onPress={() => { navigation.navigate("CreateReview",{hotelId, userID}) }}>
      <Text style={{ color: "white" , fontWeight:600, fontSize:30}}>+</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  hotelName: { fontSize: 25, left: 14, top: 20, position: 'absolute' },
  hotelAbout: { fontSize: 15, left: 14, top: 120, position: 'absolute' },
  details: { left: 14, top: 95, color: '#696969', position: 'absolute' },
  summary: { left: 20, top: 5, fontSize: 15, position: 'absolute' },
  ratingContainer: { marginTop: 70, alignItems: 'center', right: 135 },
  box2: { top: 13, height: 100, backgroundColor: '#A7F9B6', margin: 15, justifyContent: 'center', borderRadius: 20 },
  boxText: { left: 10, fontSize: 15 },
  button: { marginTop: 10, backgroundColor: 'green', borderRadius: 20 },
  button1: { marginTop: 60, backgroundColor: 'green', borderRadius: 20 },
  buttonContainer: { width: '80%' },
  backButton: { position: 'absolute', left: 20, padding: 10 },
  hotelImage: { width: '100%', height: 200, borderRadius: 0, margin: 0 },
});

export default Feedback;



