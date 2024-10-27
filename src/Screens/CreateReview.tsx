import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { AirbnbRating } from 'react-native-ratings'; 
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

const CreateReview = () => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const { hotelId, userID } = route.params;

  // Updated addReview function
  const addReview = async (newReview) => {
    try {
      const reviewsCollection = collection(db, 'reviews');
      await addDoc(reviewsCollection, newReview);
      console.log('Review added successfully!');
      return true; // Indicate success
    } catch (error) {
      console.error('Error adding review:', error);
      return false; // Indicate failure
    }
  };

  const handleSubmit = async () => {
    const newReview = { 
      hotelId,
      review,
      rating,
      userID
    };

    const success = await addReview(newReview);
    if (success) {
      // Clear input after successful submission
      setReview('');
      setRating(0);
      // Navigate back to the previous screen
      navigation.navigate("Feedback");
    }
  };

  const handleBackPress = () => {
    navigation.navigate("Feedback");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon2 name="chevron-back" size={25} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Review</Text>
      </View>

      <View style={styles.reviewContainer}>
        <View style={styles.reviewInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Write your review here..."
            placeholderTextColor="#808080"
            value={review}
            onChangeText={setReview}
            autoCapitalize="none"
            multiline
          />
          <TouchableOpacity onPress={() => {}} style={styles.iconContainer}>
            <Icon name="smile-o" size={24} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>How was your experience?</Text>
          <AirbnbRating
            count={5}
            defaultRating={0}
            size={30}
            showRating={false}
            selectedColor="#FFD700"
            onFinishRating={setRating}
          />
        </View>

        <Button
          title="Submit Review"
          buttonStyle={styles.button}
          onPress={handleSubmit}
          containerStyle={styles.buttonContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#75A82B',
  },
  header: {
    flex: 0.5,
    backgroundColor: '#75A82B',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    padding: 10,
  },
  reviewContainer: {
    flex: 5,
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: 'center',
    padding: 20,
  },
  reviewInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    backgroundColor: '#fff',
    width: '100%',
    height: 150,
    top: 30,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  icon: {
    marginLeft: 10,
    color: '#000',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#75A82B',
    borderRadius: 20,
  },
  buttonContainer: {
    width: '80%',
  },
});

export default CreateReview;
