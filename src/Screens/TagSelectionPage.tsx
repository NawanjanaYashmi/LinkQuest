import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {TouchableOpacity, View} from 'react-native';
import {Image, Text} from 'react-native-elements';

const TagSelectionPage = ({navigation}: any) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = [
    'Historical', 'Wildlife', 'Cultural', 'Biodiversity', 'Recreational', 
    'Farms', 'Nature', 'Educational', 'Architectural', 'Religious', 
    'Innovation', 'Parks', 'Elephant Gathering', 'Surfing', 
    'Zoological', 'Whale Watching', 'Adventure', 'Museums', 
    'Bird Watching', 'Beaches', 'Events', 'Scenic'
  ];

  const handleTagPress = (tag:any) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <ScrollView>
      <TouchableOpacity>
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

      <TouchableOpacity onPress={() => {
        navigation.navigate('DatesPickPage');
        console.log(selectedTags);
      }}>
        <Image source={require('../Images/selectionImg2.png')} style={styles.selectionPageImg1} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  skipbtn: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    right: 20,
    marginTop: 20,
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
    elevation: 10, 
    left: 20,
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
    marginTop: 20,
    marginBottom: 20,
  },
  selectionPageImg1: {
    width: 50,
    height: 50,
    marginTop: 5,
    left: 320,
    marginBottom: 20,
  }
});

export default TagSelectionPage;