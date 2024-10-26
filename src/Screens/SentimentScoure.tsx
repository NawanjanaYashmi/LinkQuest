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
  review: string;
  rating: number;
}

interface SentimentResult {
  review: string;
  sentiment_label: string;
  sentiment_score: number;
}

const baseUrl = 'https://7063-124-43-209-178.ngrok-free.app/getsentiment';

const SentimentScore = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sentimentCounts, setSentimentCounts] = useState({ good: 0, average: 0, bad: 0 });
  const [maxSentiment, setMaxSentiment] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { hotelId } = route.params;

  const getSentiment = async (reviews: string[]): Promise<SentimentResult[]> => {
    try {
      const response = await axios.post(baseUrl, { reviews });
      return response.data;
    } catch (error) {
      console.error('Error fetching sentiment:', error);
      throw error;
    }
  };

  const analyzeReviews = async (fetchedReviews: Review[]) => {
    const reviewTexts = fetchedReviews
      .map(review => review.review)
      .filter(reviewText => {
        const isValid = typeof reviewText === 'string' && reviewText.trim() !== '';
        if (!isValid) {
          console.warn('Invalid review found:', reviewText);
        }
        return isValid;
      });

    console.log('All Reviews:', fetchedReviews);
    console.log('Valid Reviews for Sentiment Analysis:', reviewTexts);

    if (reviewTexts.length === 0) {
      console.error('No valid reviews to send for sentiment analysis');
      return;
    }

    try {
      const sentimentResults = await getSentiment(reviewTexts);
      
      const sentimentCounts = { good: 0, average: 0, bad: 0 };

      sentimentResults.forEach(({ sentiment_label }) => {
        if (sentiment_label === 'good') sentimentCounts.good++;
        else if (sentiment_label === 'average') sentimentCounts.average++;
        else if (sentiment_label === 'bad') sentimentCounts.bad++;
      });

      setSentimentCounts(sentimentCounts);

      const maxCount = Math.max(sentimentCounts.good, sentimentCounts.average, sentimentCounts.bad);
      if (maxCount === sentimentCounts.good) setMaxSentiment('good');
      else if (maxCount === sentimentCounts.average) setMaxSentiment('average');
      else if (maxCount === sentimentCounts.bad) setMaxSentiment('bad');
      
    } catch (error) {
      console.error('Error during sentiment analysis:', error);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        console.log('Fetching reviews for hotelId:', hotelId);
        const reviewCollection = collection(db, 'reviews');
        const q = query(reviewCollection, where('hotelId', '==', hotelId));
        const reviewSnapshot = await getDocs(q);

        if (reviewSnapshot.empty) {
          console.warn('No reviews found for this hotel ID.');
          setReviews([]); // Ensure you set an empty array if no reviews found
          return; // Exit early
        }

        const reviewList = reviewSnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as { hotelId: string; review: string; rating: number })
        }));

        console.log('Fetched Reviews:', reviewList);
        setReviews(reviewList); // Set the reviews in state

        // Call analyzeReviews only after reviews are set
        analyzeReviews(reviewList); // Pass the fetched reviews directly
      } catch (error) {
        setError('Error fetching reviews');
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
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
        <Text style={styles.sentimentText}>Sentiment Analysis:</Text>
        <Text style={styles.sentimentText}>Good: {sentimentCounts.good}</Text>
        <Text style={styles.sentimentText}>Average: {sentimentCounts.average}</Text>
        <Text style={styles.sentimentText}>Bad: {sentimentCounts.bad}</Text>
        <Text style={styles.sentimentText}>Most Common Sentiment: {maxSentiment}</Text>
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
});

export default SentimentScore;
