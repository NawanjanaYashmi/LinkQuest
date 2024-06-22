import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {TouchableOpacity, View} from 'react-native';
import {Image, Text} from 'react-native-elements';
import {Button} from 'react-native-paper';

const TagSelectionPage = ({navigation}: any) => {
  return (
    <ScrollView>
      <TouchableOpacity>
        <Text style={sty.skipbtn}>Skip</Text>
      </TouchableOpacity>

      <View style={sty.selctImge}>
        <Image
          source={require('../Images/selectionPageImg.png')}
          style={sty.selectionPageImg}
        />
      </View>

      <Text style={sty.headerTextSlectionPage}>
        Pick the categories that you like most
      </Text>

        <View>
            <View style={sty.sectionsStyles}>
                {/* First Row */}
                <TouchableOpacity
                    style={sty.sectionBtns}
                    onPress={() => console.log('Button pressed')}>
                    <Text style={sty.sectionBtnsTexts}>Historical</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={sty.sectionBtns}
                    onPress={() => console.log('Button pressed')}>
                    <Text style={sty.sectionBtnsTexts}>Wildlife</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={sty.sectionBtns}
                    onPress={() => console.log('Button pressed')}>
                    <Text style={sty.sectionBtnsTexts}>Cultural</Text>
                </TouchableOpacity>

                
                <TouchableOpacity
                    style={sty.sectionBtns}
                    onPress={() => console.log('Button pressed')}>
                    <Text style={sty.sectionBtnsTexts}>Biodiversity</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={sty.sectionBtns}
                    onPress={() => console.log('Button pressed')}>
                    <Text style={sty.sectionBtnsTexts}>Recreational</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={sty.sectionBtns}
                    onPress={() => console.log('Button pressed')}>
                    <Text style={sty.sectionBtnsTexts}>Farms</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={sty.sectionBtns}
                    onPress={() => console.log('Button pressed')}>
                    <Text style={sty.sectionBtnsTexts}>Nature</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={sty.sectionBtns}
                    onPress={() => console.log('Button pressed')}>
                    <Text style={sty.sectionBtnsTexts}>Educational</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={sty.sectionBtns}
                    onPress={() => console.log('Button pressed')}>
                    <Text style={sty.sectionBtnsTexts}>Architectural</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={sty.sectionBtns}
                    onPress={() => console.log('Button pressed')}>
                    <Text style={sty.sectionBtnsTexts}>Religious</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={sty.sectionBtns}
                    onPress={() => console.log('Button pressed')}>
                    <Text style={sty.sectionBtnsTexts}>Innovation</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={sty.sectionBtns}
                    onPress={() => console.log('Button pressed')}>
                    <Text style={sty.sectionBtnsTexts}>Parks</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={sty.sectionBtns}
                    onPress={() => console.log('Button pressed')}>
                    <Text style={sty.sectionBtnsTexts}>Elephant Gathering</Text>
                </TouchableOpacity>

                

                <TouchableOpacity
                    style={sty.sectionBtns}
                    onPress={() => console.log('Button pressed')}>
                    <Text style={sty.sectionBtnsTexts}>Surfing</Text>
                </TouchableOpacity>

               

                
                

              

                <TouchableOpacity
                    style={sty.sectionBtns}
                    onPress={() => console.log('Button pressed')}>
                    <Text style={sty.sectionBtnsTexts}>Zoological</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={sty.sectionBtns}
                    onPress={() => console.log('Button pressed')}>
                    <Text style={sty.sectionBtnsTexts}>Whale Watching</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={sty.sectionBtns}
                    onPress={() => console.log('Button pressed')}>
                    <Text style={sty.sectionBtnsTexts}>Adventure</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={sty.sectionBtns}
                    onPress={() => console.log('Button pressed')}>
                    <Text style={sty.sectionBtnsTexts}>Museums</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={sty.sectionBtns}
                    onPress={() => console.log('Button pressed')}>
                    <Text style={sty.sectionBtnsTexts}>Bird Watching</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={sty.sectionBtns}
                    onPress={() => console.log('Button pressed')}>
                    <Text style={sty.sectionBtnsTexts}>Beaches</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={sty.sectionBtns}
                    onPress={() => console.log('Button pressed')}>
                    <Text style={sty.sectionBtnsTexts}>Events</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={sty.sectionBtns}
                    onPress={() => console.log('Button pressed')}>
                    <Text style={sty.sectionBtnsTexts}>Scenic</Text>
                </TouchableOpacity>

            
            
            </View>
        </View>

        <TouchableOpacity onPress={() => {
            navigation.navigate('DatesPickPage');
            console.log('Button pressed');}}>
            <Image source={require('../Images/selectionImg2.png')} style={sty.selectionPageImg1} />
        </TouchableOpacity>
    </ScrollView>
  );
};

const sty = StyleSheet.create({
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
  sectionBtnsTexts: {
    color: '#696969',
    fontSize: 15,
    fontWeight: 'bold',
    
  },
  sectionsStyles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginBottom: 20,

  },
  selectionPageImg1:{
    width: 50,
    height: 50,
    marginTop: 5,
    left: 320,
    marginBottom: 20,
  }
});

export default TagSelectionPage;