import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../firebaseconfig'; // Ensure this path is correct
import { collection, addDoc } from 'firebase/firestore';

const PreferencesTagsSeletion = ({ navigation }: any) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [email, setEmail] = useState<string | null>(null);


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

  const tags = [
    'Budget', 'Backpacking', 'Warm weather', 'Adventure sports', 'Cultural experiences', 'Street food', 'Train travel', 'Solo travel', 'Boutique hotels', 'Coastal destinations', 'Pet-friendly', 'Relaxation', 'Remote work', 'Safety', 'Sustainability', 'Language assistance', 'Local guides', 
    'Shoulder seasons', 'Family-friendly', 'Unique activities'
  ];

  const handleTagPress = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag)); // Remove tag if already selected
    } else {
      setSelectedTags([...selectedTags, tag]); // Add tag if not selected
    }
  };

  const handleNextPage = async () => {
    try {
      // Save selected tags in AsyncStorage
      await AsyncStorage.setItem('selected_tags', JSON.stringify(selectedTags));
      console.log('Selected Tags:', selectedTags);
  
      
    //   const userID = 'Dinusajith@gmail.com'; // Example user ID
      const userID = email;
  
      
      const userPreferences = {
        userID: userID, 
        userpreferences: selectedTags 
      };
  
      
      const userPreferencesRef = collection(db, 'UserPreferences'); 
      await addDoc(userPreferencesRef, userPreferences); 
  
      console.log('User preferences uploaded successfully');
  
      
      navigation.navigate('DatesPickPage');
    } catch (error) {
      console.error('Failed to save tags or upload preferences:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.skipContainer}>
          <Text style={styles.skipbtn}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.selctImge}>
          <Image
            source={require('../Images/selectionPageImg.png')}
            style={styles.selectionPageImg}
          />
        </View>

        <Text style={styles.headerTextSlectionPage}>
          Pick the Preferences that you like most
        </Text>

        <View style={styles.sectionsStyles}>
          {tags.map(tag => (
            <TouchableOpacity
              key={tag}
              style={[
                styles.sectionBtns,
                selectedTags.includes(tag) && styles.selectedSectionBtn
              ]}
              onPress={() => handleTagPress(tag)}
            >
              <Text style={[
                styles.sectionBtnsTexts,
                selectedTags.includes(tag) && styles.selectedSectionBtnText
              ]}>
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity onPress={handleNextPage} style={styles.nextButtonContainer}>
        <Image source={require('../Images/selectionImg2.png')} style={styles.nextButton} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 60, // Add padding to avoid overlapping with the button
  },
  skipContainer: {
    alignItems: 'flex-end',
  },
  skipbtn: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  selectionPageImg: {
    width: 280,
    height: 280,
  },
  selctImge: {
    alignItems: 'center',
    marginTop: 10,
  },
  headerTextSlectionPage: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 30,
    color: '#2A2A2A',
  },
  sectionBtns: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    padding: 7,
    margin: 3,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  selectedSectionBtn: {
    backgroundColor: '#75A82B', // Change color when selected
  },
  sectionBtnsTexts: {
    color: '#696969',
    fontSize: 15,
    fontWeight: 'bold',
  },
  selectedSectionBtnText: {
    color: '#000000', // Change text color when selected
  },
  sectionsStyles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  nextButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  nextButton: {
    width: 50,
    height: 50,
  },
});

export default PreferencesTagsSeletion;
