import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Image, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../firebaseconfig'; // Import your Firebase configuration
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions

const Loading = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const checkUserEmail = async () => {
      try {
        // Fetch email from AsyncStorage
        const email = await AsyncStorage.getItem('userEmail'); 
        
        // Fetch the otherAPI document from Firestore and store it in AsyncStorage
        const apiDocRef = doc(db, 'API', 'otherAPI');
        const apiDoc = await getDoc(apiDocRef);

        if (apiDoc.exists()) {
          const apiData = apiDoc.data()?.api; // Get the 'api' field from the document
          if (apiData) {
            await AsyncStorage.setItem('other_api', apiData); 
          }
        } else {
          console.log("No such document!");
        }

        // Navigate based on email existence
        if (email) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'NavigationBar' as never }], 
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' as never }], 
          });
        }
      } catch (error) {
        console.error('Error fetching email or API data:', error);
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' as never }],
        });
      } finally {
        setLoading(false); // Set loading to false after operation
      }
    };

    const timer = setTimeout(() => {
      checkUserEmail(); // Check email and API data after 5 seconds
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [navigation]); // Run only once after component mounted

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../Images/Logo.png')} />
        <Image source={require('../Images/LQwording.png')} />
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#FFFFFF" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#75A82B',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 20, // Adjust to position closer to the bottom
    alignItems: 'center',
    width: '100%',
  },
});

export default Loading;