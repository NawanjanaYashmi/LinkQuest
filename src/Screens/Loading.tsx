import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Image, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Loading = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true); // Add state for loading

  useEffect(() => {
    const checkUserEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail'); // Fetch email from AsyncStorage
        if (email) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'NavigationBar' as never }], // Navigate to HomeScreen if email exists
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' as never }], // Navigate to LoginScreen if email does not exist
          });
        }
      } catch (error) {
        console.error('Error fetching email from AsyncStorage', error);
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' as never }], // Navigate to LoginScreen in case of error
        });
      } finally {
        setLoading(false); // Set loading to false after operation
      }
    };

    const timer = setTimeout(() => {
      checkUserEmail(); // Check email after 5 seconds
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