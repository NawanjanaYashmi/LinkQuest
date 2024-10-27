import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { db } from '../../firebaseconfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRoute } from'@react-navigation/native';
import { AirbnbRating } from 'react-native-ratings';




interface Review {
  id: string;
  hotelId: string;
  review: string;
  rating: number;
}

const AllReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const navigation = useNavigation(); // Use the navigation hook
  const route = useRoute(); // Use the route hook
  const{ hotelId} = route.params;


  useEffect(() => {

    console.log(hotelId)
    const fetchReviews = async () => {
      try {
        
        const reviewCollection = collection(db, 'reviews');
        const q = query(reviewCollection, where('hotelId', '==', hotelId));
        const reviewSnapshot = await getDocs(q);
        const reviewList = reviewSnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as { hotelId: string; review: string; rating: number })
        }));
        setReviews(reviewList);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  const handleBackPress = () => {
    navigation.goBack(); // Go back to the previous screen
  };

  const renderReview = ({ item }: { item: Review }) => (
    <View style={styles.reviewItem}>
      <Text style={styles.reviewText}>Review: {item.review}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingLabel}>Rating:</Text>
        <AirbnbRating
            count={5}
            defaultRating={item.rating}
            size={15}
            showRating={false}
            isDisabled={true}
            selectedColor="#FFD700"
          />
        <View style={styles.ratingValueContainer}>
          <Text style={styles.ratingValue}>{item.rating}</Text>
          
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Icon2 name="chevron-back" size={25} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={{ left: 60 }}>
            <Icon3 name="edit-location-alt" size={36} color="white" />
          </TouchableOpacity>

          <Text style={styles.headerText}>All Review</Text>
        </View>
      </View>

      <View style={styles.greenBackgroundContainer}>
        <FlatList
          data={reviews}
          renderItem={renderReview}
          keyExtractor={item => item.id}
        />
      </View>

      <View style={{ flex: 0.05, backgroundColor: '#75A82B' }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#75A82B',
  },
  headerContainer: {
    flex: 0.3,
    backgroundColor: '#75A82B',
    borderRadius: 10,
  },
  header: {
    flex: 1,
    backgroundColor: '#75A82B',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    padding: 10,
  },
  greenBackgroundContainer: {
    flex: 2,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    borderColor: '#75A82B',
    top: 20,
  },
  reviewItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 20,
  },
  reviewText: {
    fontSize: 16,
    color: '#000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    color:'blue',
    marginTop: 5,
  },
  ratingLabel: {
    fontSize: 16,
    color: 'white',
    marginRight: 5,
    backgroundColor: '#494a49', // Optional: background color for the rounded box
    padding: 5, // Optional: padding inside the rounded box
    borderRadius: 10, // Rounded corners
  },
  ratingValueContainer: {
    width: 30, // Adjust size as needed
    height: 30, // Adjust size as needed
    borderRadius: 15, // Make it circular
    backgroundColor: '#75A82B',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:150
  },
  ratingValue: {
    fontSize: 16,
    color: 'white', // Contrast color for text
  },
});

export default AllReviews;
