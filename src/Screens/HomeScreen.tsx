import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, Image, Animated } from 'react-native';
import { Text } from 'react-native-elements';
import { FAB } from 'react-native-paper';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { db } from '../../firebaseconfig';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

interface Hotel {
  Name: string;
  Img_url: string;
  Visits: number;
}

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fetching top 5 most visited places from Firestore
    const fetchHotels = async () => {
      try {
        const q = query(
          collection(db, 'Hotel'),
          orderBy('Visits', 'desc'),
          limit(5)
        );
        const querySnapshot = await getDocs(q);

        const hotelData: Hotel[] = querySnapshot.docs.map(doc => doc.data() as Hotel);
        setHotels(hotelData);
      } catch (error) {
        console.error("Error fetching hotels: ", error);
      }
    };

    fetchHotels();
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, [glowAnim]);

  const glowInterpolate = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 15]
  });

  const animatedStyle = {
    shadowRadius: glowInterpolate,
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={require('../Images/homeimg.png')}
            style={styles.homescreenImg}
          />
          {/* Menu Icon */}
          <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.navigate('UserProfile')}>
            <Image
              source={require('../Images/menuimg.png')}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
          {/* Profile Icon */}
          <TouchableOpacity style={styles.profileIcon} onPress={() => {}}>
            <Image
              source={require('../Images/profileimg.png')}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>

        {/* Categories Section */}
        <View style={styles.stylerowOne}>
          <Text style={{ color: '#2A2A2A', fontSize: 20, fontWeight: 'bold', left: 15 }}>
            Categories
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('CategoryPage')}>
            <Text style={{ color: '#75A82B', fontWeight: '700', right: 15 }}>
              See All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Categories Buttons */}
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <TouchableOpacity style={styles.sectionBtns}>
            <Image
              source={require('../Images/cato1.png')}
              style={{ width: 30, height: 30, marginTop: 3 }}
            />
            <Text style={{ marginTop: 5, color: '#696969', fontSize: 12, fontWeight: '700' }}>
              Adventure
            </Text>
          </TouchableOpacity>
          {/* Add more category buttons as needed */}
        </View>

        {/* Most Visited Places Section */}
        <View style={styles.stylerowOne}>
          <Text style={{ color: '#2A2A2A', fontSize: 20, fontWeight: 'bold', left: 15 }}>
            Most Visited
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={{ color: '#75A82B', fontWeight: '700', right: 12 }}>
              See All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Most Visited Places Horizontal ScrollView */}
        <ScrollView horizontal>
          <View style={{ flexDirection: 'row' }}>
            {hotels.map((hotel, index) => (
              <TouchableOpacity key={index} onPress={() => navigation.navigate('SigiriyaInfor')}>
                <Image source={{ uri: hotel.Img_url }} style={{ width: 200, height: 150, marginTop: 10, borderRadius: 10, margin: 15 }} />
                <Text style={styles.imgText}>{hotel.Name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Top Events Section */}
        <View style={styles.stylerowOne}>
          <Text style={{ color: '#2A2A2A', fontSize: 20, fontWeight: 'bold', left: 15 }}>
            Top Events
          </Text>
          <TouchableOpacity>
            <Text style={{ color: '#75A82B', fontWeight: '700', right: 12 }}>
              See All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Top Events Horizontal ScrollView */}
        <ScrollView horizontal>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity>
              <Image source={require('../Images/eventPic1.png')} style={{ width: 130, height: 130, marginTop: 10, borderRadius: 10, margin: 15 }} />
              <Text style={styles.imgText}>ElleTour</Text>
            </TouchableOpacity>
            {/* Add more event items as needed */}
          </View>
        </ScrollView>
      </ScrollView>

      {/* Floating Action Button */}
      <Animated.View style={[styles.fabContainer, animatedStyle]}>
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate('TagSelectionPage')}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  homescreenImg: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  imageContainer: {
    position: 'relative',
  },
  menuIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 35,
    height: 35,
  },
  profileIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 35,
    height: 35,
  },
  iconStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  stylerowOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  sectionBtns: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    width: 80,
    height: 75,
    borderWidth: 1,
    borderRadius: 10,
    padding: 7,
    margin: 6,
    alignItems: 'center',
    elevation: 10,
    left: 13,
  },
  imgText: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  fabContainer: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  fab: {
    backgroundColor: '#75A82B',
  },
});

export default HomeScreen;