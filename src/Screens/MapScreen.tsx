import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // Use Google Maps
        style={styles.map}
        region={{
          latitude: 6.9271,  // Latitude for Colombo, Sri Lanka
          longitude: 79.8612, // Longitude for Colombo, Sri Lanka
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;