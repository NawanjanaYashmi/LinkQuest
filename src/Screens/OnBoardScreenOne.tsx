import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const OnBoardScreenOne = () => {
    return (
        <View style={sty.container}>
          <TouchableOpacity style={sty.skipButton} >
            <Text style={sty.skipText}>Skip</Text>
          </TouchableOpacity>
          
        


          <View style={sty.centerContent}>
            <Image
             source={require('../Images/selectionPageImg.png')}
              style={sty.bigImage}
            />

            <Text style={sty.description1}>
            Explore The World With TourPlace
            </Text>

            <Text style={sty.description2}>
            Discover the wonders of the world with our comprehensive tour guide app. Explore popular tourist attractions, hidden gems, and cultural hotspots with detailed information and captivating images
            </Text>
          </View>
          
          <View style={sty.bottomRow}>
            <Image
              source={require('../Images/selectionPageImg1.png')}
              style={sty.smallImage}
            />
            <TouchableOpacity style={sty.circleButton}>
          <Image
            source={require('../Images/selectionImg2.png')}
            style={sty.circleImage}
          />
        </TouchableOpacity>
          </View>
        </View>
      );
}

const sty = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
      },
      skipButton: {
        position: 'absolute',
        top: 20,
        right: 30,
      },
      skipText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
      },
      centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      bigImage: {
        width: 300,
        height: 300,
        marginBottom: 20,
      },
      description1: {
        textAlign: 'center',
        fontSize: 23,
        fontWeight: 'bold',
        marginHorizontal: 20,
        color: '#2A2A2A',
        marginBottom: 30,
      },
      description2: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
        marginHorizontal: 20,
      },
      bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        
      },
      smallImage: {
        width: 60,
        height:8,
   
      },
      nextButton: {
        backgroundColor: '#75A82B',
        padding: 10,
        borderRadius: 10,
      },
      circleButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#75A82B',
      },
      circleImage: {
        width: 50,
        height: 50,
      },
});

export default OnBoardScreenOne;