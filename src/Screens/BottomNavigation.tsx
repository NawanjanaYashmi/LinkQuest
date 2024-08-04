import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Notification from './Notification';
import HomeScreen from './HomeScreen';
import PromotionScreen from './PromotionScreen';

const HomeRoute = () => <HomeScreen />;

const PromotionScreenRoute = () => <PromotionScreen />;

const RecentsRoute = () => <Text>Recents</Text>;

const NotificationsRoute = () =>  <Notification isNew={true} />;

const NavigationBar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'heart-outline'},
    { key: 'promotion', title: 'Promotion', focusedIcon: 'album' },
    { key: 'ar', title: 'AR', focusedIcon: 'history' },
    { key: 'notifications', title: 'Notification', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    promotion: PromotionScreenRoute,
    ar: RecentsRoute,
    notifications: NotificationsRoute,
  });
  
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: '#FEFEFE' }}
      activeColor="#75A82B"
      
    />
  );
};

export default NavigationBar;