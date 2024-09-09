import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TagSelectionPage = ({ navigation }: any) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = [
    'Beach', 'Nature', 'Lakes', 'Recreational',
    'Temple', 'Religious', 'Adventure',
    'Scenic', 'History', 'Cultural', 'Wildlife'
  ];

  const handleTagPress = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleNextPage = async () => {
    const requestBody = {
      "Wildlife": 0,
      "Scenic": 1,
      "Historical": 1,
      "Recreational": 1,
      "Nature": 0,
      "Beach": 0,
      "Religious": 0,
      "Temple": 0,
      "Lakes": 0,
      "Cultural": 1,
      "Adventure": 0,
      "month": "May"
    };
  
    try {
      await AsyncStorage.setItem('selected_tags', JSON.stringify(selectedTags));
      console.log('Selected Tags:', selectedTags);
  
      const response = await fetch('http://10.0.2.2:5000/getplace', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Response from server:', data);
  
    
      if (data.top_3_places) {
        await AsyncStorage.setItem('location', JSON.stringify(data.top_3_places));
      }
  
      navigation.navigate('DatesPickPage');
    } catch (error) {
      console.error('Failed to save tags, send request, or save location:', error);
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
          Pick the categories that you like most
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

export default TagSelectionPage;