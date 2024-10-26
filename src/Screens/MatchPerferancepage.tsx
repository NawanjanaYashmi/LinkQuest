import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { db } from '../../firebaseconfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import axios from 'axios';

interface Review {
  id: string;
  hotelId: string;
  userID: string;
  review: string;
  rating: number;
}

interface MatchedUser {
  userID: string;
  match_percentage: number;
}

const MatchPreferencePage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);

  const navigation = useNavigation();
  const route = useRoute();
  const { hotelId,userID } = route.params;

  console.log(route.params);

  const matchuserID = userID;

  const fetchMatchedUsers = async (userID: string): Promise<MatchedUser[]> => {
    try {
      const response = await axios.post('https://7063-124-43-209-178.ngrok-free.app/match_preferences', { userID });
      console.log('Matched users response:', response.data);
      return response.data.matched_users || [];
    } catch (error) {
      console.error('Error fetching matched users:', error);
      setError('Failed to fetch matched users. Please try again later.');
      return [];
    }
  };

  const fetchReviewsForMatchedUsers = async (matchedUsers: MatchedUser[]) => {
    setLoading(true);
    try {
      // Filtering for match percentage between 55% to 100%
      const filteredMatchedUsers = matchedUsers.filter(user => user.userID && user.match_percentage > 55 && user.match_percentage <= 100);
      const userIds = filteredMatchedUsers.map(user => user.userID);

      if (userIds.length === 0) {
        console.warn('No users found with a match percentage between 55% to 100%');
        return [];
      }

      const reviewCollection = collection(db, 'reviews');
      const q = query(reviewCollection, where('hotelId', '==', hotelId), where('userID', 'in', userIds));
      const reviewSnapshot = await getDocs(q);

      if (reviewSnapshot.empty) {
        console.warn('No reviews found for users with matching percentage.');
        return [];
      }

      const reviewList = reviewSnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as { hotelId: string; review: string; rating: number; userID: string })
      }));

      return reviewList;
    } catch (error) {
      console.error('Error fetching reviews for matched users:', error);
      setError('Failed to fetch reviews. Please try again later.');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchReviewsAndFilter = async () => {
    setLoading(true);
    try {
      const targetUserID = matchuserID;

      const matchedUsers = await fetchMatchedUsers(targetUserID);
      const reviews = await fetchReviewsForMatchedUsers(matchedUsers);

      setFilteredReviews(reviews); // Set the filtered reviews to state
    } catch (error) {
      setError('Error fetching reviews');
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewsAndFilter();
  }, [hotelId]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  if (loading) return <ActivityIndicator size="large" color="#75A82B" />;
  if (error) return <Text>{error}</Text>;

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
          <Text style={styles.headerText}>LinkQuest Review</Text>
        </View>
      </View>
      <View style={styles.sentimentContainer}>
        <Text style={styles.sentimentText}>Filtered Reviews (55% - 100% match):</Text>
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <View key={review.id} style={styles.reviewContainer}>
              <Text>Review: {review.review}</Text>
              <Text>Rating: {review.rating}</Text>
            </View>
          ))
        ) : (
          <Text>No reviews found within the match range.</Text>
        )}
      </View>
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
  sentimentContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  sentimentText: {
    fontSize: 16,
    color: '#000',
  },
  reviewContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
});

export default MatchPreferencePage;
