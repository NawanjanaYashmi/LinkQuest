import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../Screens/HomeScreen'
import NavigationBar from '../Screens/BottomNavigation'
import LoadingScreen from '../Screens/Loading'
import LoginScreen from '../Screens/LoginScreen'
import { ScreenStackHeaderLeftView } from 'react-native-screens'
import SignUpScreen from '../Screens/SignUpScreen'
import HotelDetails from '../Screens/HotelDetails'
import TagSelectionPage from '../Screens/TagSelectionPage'
import BudgetQuestionPage from '../Screens/BudgetQuestionPage'
import SigiriyaInfor from '../Screens/SigiriyaInfor'                


const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer >
        <Stack.Navigator screenOptions={{headerShown:false}}>
          
            
            {/* this is the first screen  */}
            
            <Stack.Screen name='LoadingScreen' component={LoadingScreen}/> 
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name='NavigationBar' component={NavigationBar}/> 
            <Stack.Screen name="BudgetQuestionPage" component={BudgetQuestionPage} />
            <Stack.Screen name="TagSelectionPage" component={TagSelectionPage} />
            <Stack.Screen name="HotelDetails" component={HotelDetails} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name='SigiriyaInfor' component={SigiriyaInfor}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
}