import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Bar as ProgressBar } from 'react-native-progress';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebaseconfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { Button } from 'react-native-elements';

interface Review {
  id: string;
  hotelId: string;
  review: string;
  rating: number;
  userName: string;
}

interface ClassifiedReview {
  Review: string;
  Sentences: {
    'Predicted Category': string;
    Sentence: string;
  }[];
}

const baseUrl: string = 'https://7063-124-43-209-178.ngrok-free.app/';
const baseUr2: string = 'https://7063-124-43-209-178.ngrok-free.app/'; // Replace with your API base URL

const reviewClassifierService = async (reviews: string[]): Promise<ClassifiedReview[]> => {
  try {
    const response = await axios.post(`${baseUrl}/classify`, { reviews });
    return response.data;
  } catch (error) {
    console.error('Error classifying reviews:', error);
    throw error;
  }
};

const LinkQuestReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [classifiedReviews, setClassifiedReviews] = useState<ClassifiedReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigation = useNavigation();
  const route = useRoute();
  const { hotelId, userID} = route.params;
  console.log(route.params);

  const navigateSentimentScoure=() =>{
    navigation.navigate("SentimentScoure",{hotelId});
   }

   const navigateMatchPerferancepage=() =>{
    navigation.navigate("MatchPerferancepage",{hotelId, userID});
   }

  

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const reviewCollection = collection(db, 'reviews');
        const q = query(reviewCollection, where('hotelId', '==', hotelId));
        const reviewSnapshot = await getDocs(q);
        const reviewList = reviewSnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as { hotelId: string; review: string; rating: number })
        }));

        const reviewTexts = reviewList.map(r => r.review);
        const classifiedReviewsData = await reviewClassifierService(reviewTexts);

        setClassifiedReviews(classifiedReviewsData);
        setLoading(false);

      } catch (error) {
        setError('Error fetching or classifying reviews');
        setLoading(false);
      }
    };

    fetchReviews();
  }, [hotelId]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const calculateAverageRating = (category: string) => {
    const filteredReviews = classifiedReviews.flatMap(review =>
      review.Sentences
        .filter(sentence => sentence['Predicted Category'] === category)
        .map(sentence => ({ rating: 5 })) // Placeholder for rating calculation, adapt as needed
    );
    const totalRating = filteredReviews.reduce((acc, review) => acc + review.rating, 0);
    return filteredReviews.length ? totalRating / filteredReviews.length : 0;
  };

  const renderProgressBar = (category: string) => {
    const averageRating = calculateAverageRating(category);
    return (
      <View key={category} style={styles.progressBarContainer}>
        <Text style={styles.categoryLabel}>{category}</Text>
        <ProgressBar
          progress={averageRating / 20} // Assuming ratings are out of 5
          width={null}
          style={styles.progressBar}
          color="#75A82B"
        />
      </View>
    );
  };

  const renderSentence = ({ item }: { item: { 'Predicted Category': string; Sentence: string } }) => (
    <View style={styles.sentenceContainer}>
      <Text style={styles.sentenceText}>{item.Sentence}</Text>
      <View style={styles.categoryBox}>
        <Text style={styles.categoryText}>{item['Predicted Category']}</Text>
      </View>
    </View>
  );

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  const categories = Array.from(
    new Set(classifiedReviews.flatMap(review => review.Sentences.map(sentence => sentence['Predicted Category'])))
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
          <Text style={styles.headerText}>LinkQuest Review</Text>
        </View>
      </View>

      <View style={styles.whiteBackgroundContainer}>
        <ScrollView style={{ flex: 1, paddingHorizontal: 15 }}>
          {categories.map(category => renderProgressBar(category))}
        </ScrollView>
      </View>

      <View style={styles.greenBackgroundContainer}>
        <FlatList
          data={classifiedReviews.flatMap(review => review.Sentences)}
          renderItem={renderSentence}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>


      <View style={{ flex: 1, alignItems: 'center' }}>
        <Button
          title="Sentiment Scoure"
          buttonStyle={styles.button1}
          containerStyle={styles.buttonContainer}
          onPress={navigateSentimentScoure}
        />
        <Button
          title="Match My Perferance"
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={navigateMatchPerferancepage}
        />
      </View>
      

      
    </View>
  );
};

const styles = StyleSheet.create({
  button1: { marginTop: 60, backgroundColor: 'green', borderRadius: 20 },
  buttonContainer: { width: '80%' },
  button: { marginTop: 10, backgroundColor: 'green', borderRadius: 20 },

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
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    width: 280,
    flex: 1,
  },
  categoryLabel: {
    fontSize: 16,
    color: '#000',
    marginRight: 10,
  },
  whiteBackgroundContainer: {
    flex: 0.8,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  greenBackgroundContainer: {
    flex: 2,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    borderColor: '#75A82B',
    top: 20,
  },
  sentenceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 15,
    marginHorizontal: 15,
  },
  sentenceText: {
    fontSize: 16,
    color: 'black',
    flex: 1,
  },
  categoryBox: {
    backgroundColor: '#0056b3',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 16,
    color: '#fff',
  }
});

export default LinkQuestReviews;
