import { View, Text, StyleSheet, TouchableOpacity, Alert, Image as RNImage } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { AirbnbRating } from 'react-native-ratings';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { db } from '../../firebaseconfig';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import axios from 'axios';
import { useRoute } from'@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const Feedback = () => {
  const [hotelName, setHotelName] = useState('');
  const [hotelImage, setHotelImage] = useState('');
  const [rating, setRating] = useState(0);
  const [about, setAbout] = useState('');
  const [summary, setSummary] = useState(''); 
  
  
  const navigation = useNavigation();
  const route = useRoute();
  const { hotelId, userID} = route.params;
  
  console.log(hotelId, userID);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const navigateallreviews = () => {
    navigation.navigate("AllReviews", { hotelId });
  };

  const navigatelinkquestreviews = () => {
    navigation.navigate("LinkQuestReviews", { hotelId, userID });
  };

  useEffect(() => {
    fetchHotel();
  }, []);

  const fetchHotel = async () => {
    try {
      const hotelDoc = doc(db, 'Hotel', hotelId);
      const snapshot = await getDoc(hotelDoc);
      
      if (snapshot.exists()) {
        const data = snapshot.data();
        setHotelName(data.Name);
        setHotelImage(data.Img_URL);
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

        // Call the summarization function here
        const generatedSummary = await summarizeHotelDetails(data.about);
        setSummary(generatedSummary);
        
      } else {
        Alert.alert('No hotel found', 'The hotel ID does not exist.');
        setHotelName('');
        setHotelImage('');
        setRating(0);
        setAbout('');
        setSummary(''); // Reset summary if no hotel found
      }
    } catch (error) {
      console.error('Error fetching hotel:', error);
      Alert.alert('Error', 'There was an error fetching the hotel data.');
    }
  };

  const summarizeHotelDetails = async (about) => {
    const Akey = 'sk-20bFLb5DiExGnTWh1QZwQMhjXGln7bjk-_wl6axzKjT3BlbkFJdbQTQ5Mjyc9jHZSNbz8Rjv4YURKcDd8pACxsrlH1QA';
  
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
            Authorization: `Bearer ${Akey}`,
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
  };
  
  return (
    <View style={{ flex: 1 }}>
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

      <View style={{ flex: 0.7, backgroundColor: 'white', borderRadius: 30}}>
        <Text style={styles.hotelName}>{hotelName}</Text>

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

        <Text style={styles.details}>Hotel Details : </Text>
      </View>

      <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 30, alignContent:'center',marginTop:10}}>

      <ScrollView style={styles.hotelAbout}>
        <Text >{about}</Text>
      </ScrollView>

      </View>

      <View style={{ flex: 1,backgroundColor:'white', flexDirection: 'column', borderRadius: 20, top: 15 }}>
        <Text style={styles.summary}>Summary Of the Hotel</Text>
        <ScrollView>
          <View style={styles.box2}>
            <Text style={styles.boxText}>{summary}</Text>
          </View>
        </ScrollView>
      </View>

      <View style={{ flex: 0.65,backgroundColor:'white', alignItems: 'center' }}>
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
      <TouchableOpacity style={{borderWidth: 1, borderColor: '#75A82B', alignItems: 'center', justifyContent: 'center', width: 50, position: 'absolute', top: 630, right: 5, height: 50, backgroundColor: '#75A82B', borderRadius: 100}} onPress={() => { navigation.navigate("CreateReview", { hotelId, userID }) }}>
        <Text style={{ color: "white", fontWeight: '600', fontSize: 30 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  hotelName: { fontWeight:'bold',fontSize: 25, left: 14, top: 20, position: 'absolute' },
  hotelAbout: { backgroundColor:'white',fontSize: 20,top: 0,marginBottom:25 ,left:15,right:10,width:350},
  // hotelAboutFlex :{ backgroundColor:'yellow',fontSize: 16,top: 0,marginBottom:70 ,left:0,right:500},
  details: { fontWeight:'bold',fontSize:18, left: 14, top: 95, color: '#696969', position: 'absolute' },
  summary: {fontWeight:'bold', left: 20,right:35, top: 2, fontSize: 15, position: 'absolute' },
  ratingContainer: { marginTop: 60, alignItems: 'center', right: 135 },
  box2: { top: 13, height: 100, backgroundColor: '#A7F9B6', margin: 15, justifyContent: 'center', borderRadius: 10 },
  boxText: { left: 7,right:20, fontSize: 15 },
  button: { marginTop: 10, backgroundColor: '#75A82B', borderRadius: 20 },
  button1: { marginTop: 10, backgroundColor: '#75A82B', borderRadius: 20 },
  buttonContainer: { width: '80%' },
  backButton: { position: 'absolute', left: 20, padding: 10 },
  hotelImage: { width: '100%', height: 200, borderRadius: 0, margin: 0 },
});

export default Feedback;
