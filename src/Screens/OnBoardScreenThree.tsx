import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

const OnBoardScreenThree = () => {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    return (
        <View style={sty.container}>
          <TouchableOpacity style={sty.skipButton} onPress={()=>{navigation.navigate('NavigationBar');}}>
            <Text style={sty.skipText}>Skip</Text>
          </TouchableOpacity>
          
        


          <View style={sty.centerContent}>
            <Image
             source={require('../Images/BudgetQuestionImg.png')}
              style={sty.bigImage}
            />

            <Text style={sty.description1}>
            Plan Your Dream Trip With LinkQuest 
            </Text>

            <Text style={sty.description2}>
            Experience hassle-free travel with real-time updates, offline maps, and local recommendations. Stay informed, stay safe, and enjoy your adventure to the fullest with our app
            </Text>
          </View>
          
          <View style={sty.bottomRow}>
            <Image
              source={require('../Images/onboardnextunder3.png')}
              style={sty.smallImage}
            />
            <TouchableOpacity style={sty.circleButton} onPress={()=>{navigation.navigate('NavigationBar');}}>
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
        color: '#2A2A2A',
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


export default OnBoardScreenThree;