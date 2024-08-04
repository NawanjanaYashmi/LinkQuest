import React, { useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { useNavigation } from '@react-navigation/native'; 

const Loading = () => {
  const navigation = useNavigation();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to the next screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignUpScreen' as never }],
      });
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); 
  }, []); // Run only once after component mounted

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../Images/Logo.png')} />
        <Image source={require('../Images/LQwording.png')} />
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
});

export default Loading;