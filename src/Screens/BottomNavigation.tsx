import * as React from 'react';
import { BottomNavigation, Text, useTheme } from 'react-native-paper';
import Notification from './Notification';
import HomeScreen from './HomeScreen';
import PromotionScreen from './PromotionScreen';

const HomeRoute = () => <HomeScreen />;
const PromotionScreenRoute = () => <PromotionScreen />;
const RecentsRoute = () => <Text>Recents</Text>;
const NotificationsRoute = () => <Notification isNew={true} />;

const NavigationBar = () => {
  const theme = useTheme();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home' },
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
      inactiveColor="#aAaaAA"
      theme={{
        ...theme,
        colors: {
          ...theme.colors,
          primary: '#75A82B', // Active color
          background: '#FEFEFE', // Background color
          surface: '#FEFEFE', // Surface color
          secondaryContainer: '#E5F6DF', // Remove hue around active icon
        },
        roundness: 0, // Adjust if needed
      }}
      style={{
        height: 55,
      }}
    />
  );
};

export default NavigationBar;