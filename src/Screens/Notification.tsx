import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Animated } from 'react-native';
import { Image, Text, Header } from 'react-native-elements';
import { Card } from 'react-native-paper';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { db } from '../../firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

interface NotificationProps {
  isNew: boolean;
}

interface NotificationData {
  id: string;
  body: string;
  date: string;
  heading: string;
  time: string;
}

const Notification: React.FC<NotificationProps> = ({ isNew }) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Notification'));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as NotificationData[];
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleRemoveNotification = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<string | number>,
    id: string
  ) => {
    return (
      <View style={sty.deleteButtonContainer}>
        <Text style={sty.deleteButtonText} onPress={() => handleRemoveNotification(id)}>
          Delete
        </Text>
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={sty.container}>
      <ScrollView>
        <Header
          centerComponent={{
            text: 'Notification',
            style: { color: '#2A2A2A', fontSize: 20, fontWeight: 'bold', marginTop: 10 },
          }}
          backgroundColor="white"
        />

        <Text style={sty.todayText}>Today</Text>

        {notifications.map((notification) => (
          <Swipeable
            key={notification.id}
            renderRightActions={(progress) => renderRightActions(progress, notification.id)}
          >
            <View style={sty.IconAndCardViewContainer}>
              <View style={[sty.icon, { backgroundColor: isNew ? 'gray' : '#75A82B' }]} />
              <Card style={sty.customCardPackage}>
                <View style={sty.iconAndText}>
                  <Image
                    source={require('../Images/hotelicon.png')}
                    style={sty.iconImage}
                  />
                  <View style={sty.headerAndInfor}>
                    <Text style={sty.cardtitle} numberOfLines={1} ellipsizeMode="tail">
                      {notification.heading}
                    </Text>
                    <Text style={sty.carddescription} numberOfLines={3} ellipsizeMode="tail">
                      {notification.body}
                    </Text>
                    <View style={sty.dateAndTime}>
                      <Text style={sty.textAndTimeText}>{notification.time}</Text>
                      <Text style={sty.textAndTimeText}>{notification.date}</Text>
                    </View>
                  </View>
                </View>
              </Card>
            </View>
          </Swipeable>
        ))}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const { width } = Dimensions.get('window');

const sty = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  todayText: {
    fontSize: 16,
    color: 'gray',
    paddingTop: 10,
    paddingLeft: 40,
  },
  IconAndCardViewContainer: {
    paddingTop: 5,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  icon: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  customCardPackage: {
    width: width * 0.85,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  iconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  headerAndInfor: {
    flex: 1,
    paddingLeft: 20,
  },
  cardtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2A2A2A',
  },
  carddescription: {
    fontSize: 14,
    color: '#696969',
    textAlign: 'justify',
  },
  dateAndTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  textAndTimeText: {
    fontSize: 12,
    color: '#888888',
  },
  deleteButtonContainer: {
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Notification;