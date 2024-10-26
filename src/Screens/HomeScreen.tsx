import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, Image, Animated, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import { FAB } from 'react-native-paper';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { db } from '../../firebaseconfig';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

interface Place {
  Name: string;
  Img_url: string;
  Visits: number;
}

interface Event {
  Name: string;
  Img_URL1: string;
}

interface Category {
  Name: string;
  url: string;
}

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [places, setPlaces] = useState<Place[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const q = query(
          collection(db, 'Place'),
          orderBy('Visits', 'desc'),
          limit(5)
        );
        const querySnapshot = await getDocs(q);
        const placeData: Place[] = querySnapshot.docs.map(doc => doc.data() as Place);
        setPlaces(placeData);
      } catch (error) {
        console.error("Error fetching places: ", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchEvents = async () => {
      try {
        const qu = query(
          collection(db, 'Events'),
          limit(4)
        
        );
        const querySnapshot = await getDocs(qu);
        const eventData: Event[] = querySnapshot.docs.map(doc => doc.data() as Event);
        setEvents(eventData);
      } catch (error) {
        console.error("Error fetching events: ", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const qc = query(
          collection(db, 'Categories'),
          limit(4)
        );
        const querySnapshot = await getDocs(qc);
        const categoryData: Category[] = querySnapshot.docs.map(doc => doc.data() as Category);
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
    fetchEvents();
    fetchCategories();
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#75A82B" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={require('../Images/homeimg.png')}
            style={styles.homescreenImg}
          />
          <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.navigate('UserProfile')}>
            <Image
              source={require('../Images/menuimg.png')}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
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
          {categories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.sectionBtns}>
              <Image
                source={{ uri: category.url }}
                style={{ width: 30, height: 30, marginTop: 3 }}
              />
              <Text style={{ marginTop: 5, color: '#696969', fontSize: 11, fontWeight: '700' }}>
                {category.Name}
              </Text>
            </TouchableOpacity>
          ))}
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

        <ScrollView horizontal>
          <View style={{ flexDirection: 'row' }}>
            {places.map((place, index) => (
              <TouchableOpacity key={index} onPress={() => navigation.navigate('SigiriyaInfor')}>
                <Image source={{ uri: place.Img_url }} style={{ width: 200, height: 150, marginTop: 10, borderRadius: 10, margin: 15 }} />
                <Text style={styles.imgText}>{place.Name}</Text>
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

        <ScrollView horizontal>
          <View style={{ flexDirection: 'row' }}>
            {events.map((event, index) => (
              <TouchableOpacity key={index}>
                <Image source={{ uri: event.Img_URL1}} style={{ width: 130, height: 130, marginTop: 10, borderRadius: 10, margin: 15 }} />
                <Text style={styles.imgText}>{event.Name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ScrollView>

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default HomeScreen;