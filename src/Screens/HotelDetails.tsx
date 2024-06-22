import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Image, Text, Header, Icon } from 'react-native-elements';
import { Card, Button } from 'react-native-paper';

const HotelDetails = ({ navigation }: any) => {
  const [currentMiniPhotoIndex, setCurrentMiniPhotoIndex] = useState(0); // State to track the current mini photo index
  const miniPhotos = [
    require('../Images/img1.jpg'),
    require('../Images/img2.jpg'),
    require('../Images/img3.jpg'),
    require('../Images/img4.jpg'),
  ]; // Array of mini photo URLs

  const handleNextMiniPhoto = () => {
    // Function to handle clicking on the next button for mini photos
    setCurrentMiniPhotoIndex(prevIndex => (prevIndex + 1) % miniPhotos.length);
  };

  const handlePreviousMiniPhoto = () => {
    // Function to handle clicking on the previous button for mini photos
    setCurrentMiniPhotoIndex(prevIndex =>
      prevIndex === 0 ? miniPhotos.length - 1 : prevIndex - 1,
    );
  };

  return (
    <ScrollView>
      <View>
        <Header
          leftComponent={
            <Icon
              name="west"
              type="material"
              color="#2A2A2A"
              onPress={() => navigation.goBack()}
            />
          }
          centerComponent={{
            text: '98 Acres Resort & Spa',
            style: { color: '#2A2A2A', fontSize: 20, fontWeight: 'bold' },
          }}
          backgroundColor="white"
        />
        <Image
          source={require('../Images/ellepic.jpg')}
          style={{ width: '100%', height: 250 }}
        />

        <View>
          {/* Mini photos section */}
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            {/* Previous button */}
            <TouchableOpacity onPress={handlePreviousMiniPhoto}>
              <Image
                source={require('../Images/preicon.png')}
                style={{ width: 15, height: 15 }}
              />
            </TouchableOpacity>

            {/* Render mini photos */}
            {miniPhotos.map((photoUrl, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setCurrentMiniPhotoIndex(index)}
                style={{ marginHorizontal: 3 }}
              >
                <Image
                  source={photoUrl}
                  style={{
                    width: 80,
                    height: 70,
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
            ))}

            {/* Next button */}
            <TouchableOpacity onPress={handleNextMiniPhoto}>
              <Image
                source={require('../Images/neicon.png')}
                style={{ width: 15, height: 15 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Card style={sty.descriptionBoxCard}>
          <View style={sty.descriptionBox}>
            <Text style={sty.descriptionHeadText}>98 Acres Resort & Spa</Text>
            <View style={sty.tt}>
              <Image
                source={require('../Images/loicon.png')}
                style={{ width: 20, height: 20, marginTop: 5 }}
              />
              <Text style={sty.descriptionLocationText}>Elle - Sri Lanka</Text>
              <View style={{ flexDirection: 'row', marginLeft: 40 }}>
                <Image
                  source={require('../Images/manystar.png')}
                  style={{ width: 15, height: 15, marginTop: 9 }}
                />
                <Image
                  source={require('../Images/manystar.png')}
                  style={{ width: 15, height: 15, marginTop: 9 }}
                />
                <Image
                  source={require('../Images/manystar.png')}
                  style={{ width: 15, height: 15, marginTop: 9 }}
                />
                <Image
                  source={require('../Images/manystar.png')}
                  style={{ width: 15, height: 15, marginTop: 9 }}
                />
              </View>
            </View>
            <Text style={sty.descriptionInforText}>
              Experience the beauty and serenity of Sri Lanka’s scenic hill
              country within the luxurious comforts of a boutique hotel par
              excellence. 98 Acres Resort and Spa is an elegant, chic hotel that
              stands on a scenic 98 acre tea estate, surrounded by a stunning
              landscape. 98 Acres Resort and Spa is an elegant, chic hotel that
              stands on a scenic 98 acre tea estate, surrounded by a stunning
              landscape.
            </Text>

            <Button
              style={{ marginTop: 30, backgroundColor: '#75A82B', width: 200, alignSelf: 'center' }}
              mode="contained"
              onPress={() => navigation.navigate('BookingScreen')}
            >
              <Text style={{ color: 'white' }}>Make a Reservation</Text>
            </Button>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

const sty = StyleSheet.create({
  descriptionBoxCard: {
    marginTop: 25,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginHorizontal: 10,
  },
  descriptionBox: {
    padding: 20,
  },
  descriptionHeadText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B6B6B',
  },
  descriptionLocationText: {
    fontSize: 15,
    color: '#6B6B6B',
    paddingTop: 5,
    left: 10,
    fontWeight: 'bold',
  },
  descriptionInforText: {
    fontSize: 15,
    color: '#6B6B6B',
    paddingTop: 10,
    textAlign: 'justify',
    fontWeight: '600',
  },
  tt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HotelDetails;