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

const baseUrl = 'https://700b-212-104-229-60.ngrok-free.app/getsentiment';

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
      if (maxCount === sentimentCounts.good) setMaxSentiment('Hotel is Good.');
      else if (maxCount === sentimentCounts.average) setMaxSentiment('Hotel Rview is Average.');
      else if (maxCount === sentimentCounts.bad) setMaxSentiment('Hotel is Bad.');
      
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
          setReviews([]);
          return; 
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
        <Text style={styles.sentimentText1}>Sentiment Analysis</Text>
        
      </View>

      <View style={styles.sentimentContainer3}>

      <View style={styles.sentimentContainer4}>

      <Text style={styles.sentimentText2}>Good</Text>
      <Text style={styles.sentimentTextGood}>{sentimentCounts.good}</Text>

      </View>

      <View style={styles.sentimentContainer5}>
      <Text style={styles.sentimentText2}>Average</Text>
      <Text style={styles.sentimentTextGood}>{sentimentCounts.average}</Text>

      </View>

      <View style={styles.sentimentContainer6}>
      <Text style={styles.sentimentText2}>Bad</Text>
      <Text style={styles.sentimentTextGood}>{sentimentCounts.bad}</Text>

      </View>
        

      </View>
      
      

      {/* Flex 02 */}
      <View style={styles.container2}>

        <Text style={styles.sentimentText}>Most Common Sentiment</Text>

        <View style={styles.containerMCS}>
        <Text style={styles.sentimentTextMCS}>{maxSentiment}</Text>
        </View>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#75A82B',
  },

  container2: {
    flex: 0.5,
    backgroundColor: 'white',
    borderRadius:20,
    marginRight:5,
    marginLeft:5,
    marginTop: 30,
    marginBottom:100,
  },
  containerMCS: {
    flex: 1.5,
    backgroundColor: '#75A82B',
    borderRadius:20,
    marginRight:0,
    marginLeft:14,
    marginTop: 28,
    marginBottom:40,
    width:350,
    alignContent:'center',
  },
  headerContainer: {
    flex: 0.1,
    backgroundColor: '#75A82B',
    borderRadius: 10,
    marginTop:10,
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
  sentimentContainer3: {
    flex:0.2,
    flexDirection: 'row',
    marginTop: 30,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft:5,
    marginRight:5,
    
  },
  sentimentContainer4: {
    width: 100,
    marginTop: 10,
    padding: 15,
    backgroundColor: '#75A82B',
    borderRadius: 10,
    // Shadow properties
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, // For Android
  },
  sentimentContainer5: {
    width: 100,
    marginLeft: 20,
    marginTop: 10,
    padding: 15,
    backgroundColor: '#75A82B',
    borderRadius: 10,
    // Shadow properties
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, // For Android
  },
  sentimentContainer6: {
    width: 100,
    marginLeft: 20,
    marginTop: 10,
    padding: 15,
    backgroundColor: '#75A82B',
    borderRadius: 10,
    // Shadow properties
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.5,
    elevation: 5, // For Android
  },
  sentimentText: {
    fontSize: 20,
    color: 'black',
    textAlign:'center',
    fontWeight:'bold',
    marginTop:15,
  },
  sentimentTextMCS: {
    fontSize: 40,
    color: 'white',
    textAlign:'center',
    fontWeight:'bold',
    marginTop:30,
  },
  sentimentText1: {
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    // Shadow properties
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, // For Android
  },
  sentimentText2: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    // Shadow properties
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, // For Android
  },
  sentimentTextGood: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    // Shadow properties
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, // For Android
  },
});

export default SentimentScore;
