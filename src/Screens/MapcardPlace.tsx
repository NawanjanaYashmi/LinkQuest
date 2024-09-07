import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Text, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import axios from 'axios';

interface MapCardPlaceProps {
  locations: string[];
}

interface Photo {
  photo_reference: string;
  width: number;
}

interface Restaurant {
  name: string;
  price_level: number | 'Unknown';
  lat: number;
  lng: number;
  place_id?: string;
  address?: string;
  phone_number?: string;
  opening_hours?: string[];
  rating?: number;
  user_ratings_total?: number;
  website?: string;
  photos?: Photo[];
}

const MapCardPlace: React.FC<MapCardPlaceProps> = ({ locations }) => {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const apiKey = 'AIzaSyAGzRuA9pDrg9rHA_QtUg5GhtvfBeDV9wU';
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
      } catch (err) {
        setError('Error fetching location data(coordinatesList)');
        console.error('Error fetching location data(coordinatesList)', err);
      }
    };

    fetchCoordinates();
  }, [locations]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const apiKey = 'AIzaSyAGzRuA9pDrg9rHA_QtUg5GhtvfBeDV9wU'; // Replace with your API key
        const placesUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

        for (const coordinate of coordinates) {
          const response = await axios.get(placesUrl, {
            params: {
              location: `${coordinate.lat},${coordinate.lng}`,
              radius: 500,
              type: 'restaurant',
              key: apiKey,
            },
          });

          const restaurantResults = response.data.results.map((place: any) => ({
            name: place.name,
            price_level: typeof place.price_level === 'number' ? place.price_level : 'Unknown',
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
            place_id: place.place_id,
          }));

          setRestaurants(prevRestaurants => [...prevRestaurants, ...restaurantResults]);

          for (const restaurant of restaurantResults) {
            await fetchRestaurantDetails(restaurant.place_id!, apiKey);
          }
        }
      } catch (err) {
        setError('Error fetching restaurant data');
        console.error('Error fetching restaurant data:', err);
      }
    };

    if (coordinates.length > 0) {
      fetchRestaurants();
    }
  }, [coordinates]);

  const fetchRestaurantDetails = async (placeId: string, apiKey: string) => {
    try {
      const detailsUrl = 'https://maps.googleapis.com/maps/api/place/details/json';
      const response = await axios.get(detailsUrl, {
        params: {
          place_id: placeId,
          key: apiKey,
        },
      });

      const result = response.data.result;

      if (result) {
        setRestaurants(prevRestaurants =>
          prevRestaurants.map(restaurant =>
            restaurant.place_id === placeId
              ? {
                  ...restaurant,
                  address: result.formatted_address,
                  phone_number: result.formatted_phone_number,
                  opening_hours: result.opening_hours?.weekday_text,
                  rating: result.rating,
                  user_ratings_total: result.user_ratings_total,
                  website: result.website,
                  photos: result.photos?.map((photo: any) => ({
                    photo_reference: photo.photo_reference,
                    width: photo.width,
                  })),
                }
              : restaurant
          )
        );
      }
    } catch (err) {
      console.error('Error fetching restaurant details:', err);
    }
  };

  const handleMarkerPress = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentPhotoIndex(0); // Reset photo index when selecting a new restaurant
  };

  const closeModal = () => {
    setSelectedRestaurant(null);
  };

  const handlePrevPhoto = () => {
    if (selectedRestaurant && selectedRestaurant.photos) {
      const photos = selectedRestaurant.photos;
      if (photos.length > 0) {
        setCurrentPhotoIndex(prevIndex =>
          prevIndex > 0 ? prevIndex - 1 : photos.length - 1
        );
      }
    }
  };
  
  const handleNextPhoto = () => {
    if (selectedRestaurant && selectedRestaurant.photos) {
      const photos = selectedRestaurant.photos;
      if (photos.length > 0) {
        setCurrentPhotoIndex(prevIndex =>
          prevIndex < photos.length - 1 ? prevIndex + 1 : 0
        );
      }
    }
  };

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
            latitude: coordinates.length > 0 ? coordinates[0].lat : 6.9271,
            longitude: coordinates.length > 0 ? coordinates[0].lng : 79.8612,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {coordinates.map((coordinate, index) => (
            <Marker
              key={`location-${index}`}
              coordinate={{ latitude: coordinate.lat, longitude: coordinate.lng }}
              pinColor="blue"
            />
          ))}

          {restaurants.map((restaurant, index) => (
            <Marker
              key={`restaurant-${index}`}
              coordinate={{ latitude: restaurant.lat, longitude: restaurant.lng }}
              onPress={() => handleMarkerPress(restaurant)}
            >
              <Callout>
                <View>
                  <Text>{restaurant.name}</Text>
                  <Text>Price Level: {typeof restaurant.price_level === 'number' ? restaurant.price_level : 'Not Available'}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>

      {selectedRestaurant && (
        <Modal
          visible={true}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView>
                <Text style={styles.modalTitle}>{selectedRestaurant.name}</Text>
                <Text>Address: {selectedRestaurant.address}</Text>
                {selectedRestaurant.phone_number && <Text>Phone: {selectedRestaurant.phone_number}</Text>}
                {selectedRestaurant.opening_hours && (
                  <View>
                    <Text>Opening Hours:</Text>
                    {selectedRestaurant.opening_hours.map((hours, index) => (
                      <Text key={index}>{hours}</Text>
                    ))}
                  </View>
                )}
                {selectedRestaurant.rating && (
                  <Text>Rating: {selectedRestaurant.rating} ({selectedRestaurant.user_ratings_total} reviews)</Text>
                )}
                {selectedRestaurant.website && (
                  <Text>Website: {selectedRestaurant.website}</Text>
                )}

                {selectedRestaurant.photos && selectedRestaurant.photos.length > 0 && (
                  <View style={styles.photoGallery}>
                    <TouchableOpacity onPress={handlePrevPhoto} style={styles.navigationButton}>
                      <Text style={styles.navigationButtonText}>Previous</Text>
                    </TouchableOpacity>

                    <Image
                      style={styles.photo}
                      source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${selectedRestaurant.photos[currentPhotoIndex].photo_reference}&key=AIzaSyAGzRuA9pDrg9rHA_QtUg5GhtvfBeDV9wU` }}
                    />

                    <TouchableOpacity onPress={handleNextPhoto} style={styles.navigationButton}>
                      <Text style={styles.navigationButtonText}>Next</Text>
                    </TouchableOpacity>
                  </View>
                )}

                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
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
        elevation: 4,
      },
    }),
  },
  map: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  photoGallery: {
    alignItems: 'center',
    marginVertical: 20,
  },
  photo: {
    width: 300,
    height: 200,
    marginVertical: 10,
  },
  navigationButton: {
    padding: 10,
    backgroundColor: '#75A82B',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  navigationButtonText: {
    color: 'white',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#75A82B',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default MapCardPlace;