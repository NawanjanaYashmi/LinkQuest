import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import axios from 'axios';

// Define the prop types for the component
interface TestMapProps {
  locations: string[]; // Array of location names
}

const TestMap: React.FC<TestMapProps> = ({ locations }) => {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }[]>([]);
  const [routeCoordinates, setRouteCoordinates] = useState<{ latitude: number; longitude: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const apiKey = 'AIzaSyAGzRuA9pDrg9rHA_QtUg5GhtvfBeDV9wU'; // Replace with your actual API key
        const geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

        const fetchLocation = async (location: string) => {
          const response = await axios.get(geocodeUrl, {
            params: {
              address: location,
              key: apiKey,
            },
          });
          const result = response.data.results[0];
          if (result) {
            const { lat, lng } = result.geometry.location;
            return { lat, lng };
          }
          throw new Error(`Location not found for ${location}`);
        };

        const coordinatesList = await Promise.all(
          locations.map(location => fetchLocation(location))
        );

        setCoordinates(coordinatesList);
        fetchRoute(coordinatesList);
      } catch (err) {
        setError('Error fetching location data');
        console.error('Error fetching location data:', err);
      }
    };

    const fetchRoute = async (coordinatesList: { lat: number; lng: number }[]) => {
      try {
        const apiKey = 'AIzaSyAGzRuA9pDrg9rHA_QtUg5GhtvfBeDV9wU'; // Replace with your actual API key
        const origin = `${coordinatesList[0].lat},${coordinatesList[0].lng}`;
        const destination = `${coordinatesList[coordinatesList.length - 1].lat},${coordinatesList[coordinatesList.length - 1].lng}`;
        const waypoints = coordinatesList.slice(1, -1).map(coord => `${coord.lat},${coord.lng}`).join('|');

        const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypoints}&key=${apiKey}`;
        const response = await axios.get(directionsUrl);
        const route = response.data.routes[0];

        if (route) {
          const path = route.legs[0].steps.map((step: any) => {
            return {
              latitude: step.end_location.lat,
              longitude: step.end_location.lng,
            };
          });
          setRouteCoordinates(path);
        } else {
          throw new Error('No route found');
        }
      } catch (err) {
        setError('Error fetching route data');
        console.error('Error fetching route data:', err);
      }
    };

    fetchCoordinates();
  }, [locations]);

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: coordinates.length > 0 ? coordinates[0].lat : 6.9271, // Default to Colombo if no data
            longitude: coordinates.length > 0 ? coordinates[0].lng : 79.8612,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {coordinates.map((coordinate, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: coordinate.lat, longitude: coordinate.lng }}
              title={`Location ${index + 1}`}
            />
          ))}

         
          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#8F1900" // Set the color of the polyline
              strokeWidth={4} // Set the width of the polyline
            />
          )}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default TestMap;


