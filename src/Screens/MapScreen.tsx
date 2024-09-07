import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Region } from 'react-native-maps';
import axios from 'axios';
import { findShortestRoute } from '../Algorithm/antColonyOptimization';
import { Location } from '../Algorithm/types';

type Schedule = {
  [key: string]: string;
};

const MapScreen: React.FC = () => {
  const [routeCoords, setRouteCoords] = useState<{ latitude: number; longitude: number }[]>([]);
  const [travelTimes, setTravelTimes] = useState<number[]>([]);
  const [schedule, setSchedule] = useState<Schedule>({});
  const [startTime, setStartTime] = useState<number>(6);

  useEffect(() => {
    const fetchRoute = async () => {
      const locations: Location[] = [
        { title: 'Galle', description: 'A city on the southwest coast of Sri Lanka', coordinate: { latitude: 6.0324, longitude: 80.2170 } },
        { title: 'Colombo', description: 'The commercial capital of Sri Lanka', coordinate: { latitude: 6.9271, longitude: 79.8612 } },
        { title: 'Kandy', description: 'A city in central Sri Lanka', coordinate: { latitude: 7.2906, longitude: 80.6337 } }
      ];

      const waypoints = locations.map(loc => `${loc.coordinate.latitude},${loc.coordinate.longitude}`);
      const distances = await getDistanceMatrix(waypoints);
      const shortestRouteData = findShortestRoute(distances, locations);

      if (shortestRouteData) {
        const { origin, destination, waypoints } = shortestRouteData;
        const originStr = `${origin.latitude},${origin.longitude}`;
        const destinationStr = `${destination.latitude},${destination.longitude}`;
        const waypointsStr = waypoints.map(wp => `${wp.latitude},${wp.longitude}`);
        const response = await getDirections({ origin: originStr, destination: destinationStr, waypoints: waypointsStr });
        const points = response.routes[0].overview_polyline.points;
        const decodedCoords = decodePolyline(points);
        setRouteCoords(decodedCoords);

        // Extract travel times
        const durations = response.routes[0].legs.map((leg: any) => leg.duration.value); // in seconds
        setTravelTimes(durations.map((seconds: number) => Math.ceil(seconds / 60))); // Convert to minutes

        // Calculate and set the schedule
        setSchedule(calculateSchedule(locations, durations));
      }
    };

    fetchRoute();
  }, [startTime]);

  const getDistanceMatrix = async (waypoints: string[]) => {
    const apiKey = 'AIzaSyAGzRuA9pDrg9rHA_QtUg5GhtvfBeDV9wU'; // Replace with your Google Maps API key
    const origins = waypoints.join('|');
    const destinations = waypoints.join('|');
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${apiKey}`
    );
    return response.data;
  };

  const getDirections = async (route: { origin: string, destination: string, waypoints: string[] }) => {
    const apiKey = 'AIzaSyAGzRuA9pDrg9rHA_QtUg5GhtvfBeDV9wU'; // Replace with your Google Maps API key
    const waypointsStr = route.waypoints.join('|');
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${route.origin}&destination=${route.destination}&waypoints=${waypointsStr}&key=${apiKey}`
    );
    return response.data;
  };

  const decodePolyline = (encoded: string) => {
    let points: { latitude: number; longitude: number }[] = [];
    let index = 0, lat = 0, lng = 0;
    while (index < encoded.length) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = (result & 1) ? ~(result >> 1) : (result >> 1);
      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = (result & 1) ? ~(result >> 1) : (result >> 1);
      lng += dlng;
      points.push({
        latitude: lat / 1E5,
        longitude: lng / 1E5
      });
    }
    return points;
  };

  const calculateSchedule = (locations: Location[], durations: number[]) => {
    let currentTime = startTime * 60; // Convert hours to minutes
    const schedule: Schedule = {};

    locations.forEach((loc, index) => {
      const hours = Math.floor(currentTime / 60);
      const minutes = currentTime % 60;
      const period = hours >= 12 ? 'PM' : 'AM';
      const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
      schedule[loc.title] = formattedTime;
      if (index < durations.length) {
        currentTime += Math.ceil(durations[index] / 60); // Add travel time to the next location
      }
    });

    return schedule;
  };

  const region: Region = {
    latitude: 6.9271,
    longitude: 79.8612,
    latitudeDelta: 2,
    longitudeDelta: 2,
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
      >
        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeColor="#FF0000"
            strokeWidth={4}
          />
        )}
      </MapView>
      <View style={styles.bottomSheet}>
        <Text style={styles.scheduleHeader}>Schedule</Text>
        {Object.keys(schedule).map((location, index) => (
          <View key={index} style={styles.scheduleItem}>
            <Text style={styles.scheduleTime}>{schedule[location]}</Text>
            <Text style={styles.scheduleLocation}>{location}</Text>
          </View>
        ))}
       
        <Text style={styles.sliderLabel}>Start Time: {startTime}:00</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomSheet: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  scheduleHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  scheduleTime: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scheduleLocation: {
    color:'green',
    fontSize: 16,
  },
  slider: {
    width: '100%',
    height: 40,
    marginTop: 20,
  },
  sliderLabel: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default MapScreen;
