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
import PlaceInfo from '../Screens/PlaceInfo'  
import DatePicker from '../Screens/DatesPickPage'              
import CategoryPage from '../Screens/CategoryPage'
import UserProfile from '../Screens/UserProfile'
import OnBoardScreenOne from '../Screens/OnBoardScreenOne'
import OnBoardScreenTwo from '../Screens/OnBoardScreenTwo'
import OnBoardScreenThree from '../Screens/OnBoardScreenThree'
import HotelImageUpload from '../Screens/HotelImageUpload'
import Backendtesting from '../Screens/Backendtesting'
import ChatAssist from '../Screens/ChatAssist'
import GoogleCalendarScreen from '../Screens/GoogleCalendarScreen'
// import CalendarEventsScreen from '../Screens/CalendarEventsScreen'
import MapScreen from '../Screens/MapScreen'
import RouteMap from '../Screens/RouteMap'
import RoutePlanningData from '../Screens/RoutePlanningData'
import CalandarData from '../Screens/CalandarData'
import PromotionScreen from '../Screens/PromotionScreen'
import Feedback from '../Screens/Feedback'
import LinkQuestReviews from '../Screens/LinkQuestReviews'
import CreateReview from '../Screens/CreateReview'
import AllReviews from '../Screens/AllReviews'
import SentimentScoure from '../Screens/SentimentScoure'
import MatchPerferancepage from '../Screens/MatchPerferancepage'
import CatogoryList from '../Screens/CatogoryList'
import HotelList from '../Screens/HotelList'
import PreferencesTagsSeletion from '../Screens/PreferencesTagsSeletion'



// import CalandarDate from '../Screens/CalandarData'
const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer >
        <Stack.Navigator screenOptions={{headerShown:false}}>
       
            {/* <Stack.Screen name='CalandarDate' component={CalandarDate}/> */}
            {/* <Stack.Screen name='HotelImageUpload' component={HotelImageUpload}/>  */}
            {/* <Stack.Screen name='GoogleCalendarScreen' component={GoogleCalendarScreen}/> last working one*/} 
            {/* <Stack.Screen name='Cal endarEventsScreen' component={CalendarEventsScreen}/> */}
            
            <Stack.Screen name='LoadingScreen' component={LoadingScreen}/>
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="Feedback" component={Feedback} />
            <Stack.Screen name="CreateReview" component={CreateReview} />         
            <Stack.Screen name="LinkQuestReviews" component={LinkQuestReviews} />
            <Stack.Screen name="AllReviews" component={AllReviews} />
            <Stack.Screen name="SentimentScoure" component={SentimentScoure} />
            <Stack.Screen name="MatchPerferancepage" component={MatchPerferancepage}/>
            <Stack.Screen name='ChatAssist' component={ChatAssist}/>
            <Stack.Screen name='OnBoardScreenOne' component={OnBoardScreenOne}/>
            <Stack.Screen name='OnBoardScreenTwo' component={OnBoardScreenTwo}/>
            <Stack.Screen name='OnBoardScreenThree' component={OnBoardScreenThree}/>
            <Stack.Screen name='PromotionScreen' component={PromotionScreen}/>
            <Stack.Screen name='RoutePlanning' component={RoutePlanningData}/>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name='NavigationBar' component={NavigationBar}/> 
            <Stack.Screen name="CalandarData" component={CalandarData} />
            <Stack.Screen name="BudgetQuestionPage" component={BudgetQuestionPage} />
            <Stack.Screen name="TagSelectionPage" component={TagSelectionPage} />
            <Stack.Screen name="HotelDetails" component={HotelDetails} />
            <Stack.Screen name="MapScreen" component={MapScreen} />
            <Stack.Screen name="DatesPickPage" component={DatePicker} />
            <Stack.Screen name='PlaceInfo' component={PlaceInfo}/> 
            <Stack.Screen name='CategoryPage' component={CategoryPage}/>
           <Stack.Screen name='HotelList' component={HotelList}/>
            <Stack.Screen name='RouteMap' component={RouteMap}/>
            <Stack.Screen name='CatogoryList' component={CatogoryList}/>
            <Stack.Screen name='PreferencesTagsSeletion' component={PreferencesTagsSeletion}/>
            {/* <Stack.Screen name='ChatAssist' component={ChatAssist}/>there are some modifications to be done   */}
      
                      

            
    </Stack.Navigator>
    
    </NavigationContainer>
  )
}