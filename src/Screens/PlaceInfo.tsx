import React from 'react';
import { StyleSheet, View} from 'react-native';
import { Image, Text, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../../firebaseconfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
interface LocationData {
  Name: string;
  City: string;
  Details: string;
  Img_url: string;
  Visits: number; 
}

const PlaceInfo = ({ route }: any) => {
  const [locationData, setLocationData] = React.useState<LocationData | null>(null); // Initialize as null
  const { placeName } = route.params;
  console.log(placeName);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  
  React.useEffect(() => {
    const fetchPlace = async () => {
      try {
        // Create a query to get the specific place data based on placeName
        const q = query(collection(db, 'Place'), where('Name', '==', placeName));
        const querySnapshot = await getDocs(q);

        // Map the fetched data and set it to state
        if (!querySnapshot.empty) {
          const place = querySnapshot.docs[0].data() as LocationData;
          setLocationData(place);
        } else {
          console.warn("No data found for the specified place.");
        }
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlace();
  }, [placeName]);

  // If locationData is null, show a loading state or a placeholder
  if (!locationData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      {/* Use the dynamic image URL */}
      <Image source={{ uri: locationData.Img_url }} style={styles.homescreenImg} />

      <View style={{ margin: 20, alignItems: 'center' }}>
        <Text style={{ fontSize: 23, fontWeight: '700', color: '#200E32' }}>
          {locationData.Name} {/* Use dynamic place name here */}
        </Text>
        <View style={styles.locationContainer}>
          <Icon name="map-marker" size={20} color="#75A82B" style={styles.icon} />
          <Text style={styles.locationText}>{locationData.City}, Sri Lanka</Text>
        </View>
      </View>

      

      <View style={{ marginTop: 10, margin: 20 }}>
        <Text style={{ fontSize: 17, fontWeight: '700' }}>About</Text>
        <Text style={{ textAlign: 'justify', fontSize: 15, marginTop: 5 }}>
          {locationData.Details} {/* Use dynamic details here */}
        </Text>
      </View>
      <View style={{top:20,left:40,width:300,backgroundColor:'#75A82B', alignContent:'center', borderRadius:20}}>

      <Button
        title="Hotels in the Location"
        buttonStyle={styles.button1}
        containerStyle={styles.buttonContainer}
        titleStyle={styles.buttonTitle} // Add this line
        onPress={() => {
            navigation.navigate('HotelList');
        }}
    />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '60%', // Change this to the desired width
    alignSelf: 'center', // Center the button in the container
},
  buttonTitle: {
    textAlign: 'center',
},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homescreenImg: {
    width: '100%', // Use full width for responsiveness
    height: 300,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  icon: {
    marginRight: 15,
  },
  locationText: {
    fontSize: 16,
    color: '#200E32',
  },
  button1: { marginTop: 2, backgroundColor: '#75A82B', borderRadius: 20 },
});

export default PlaceInfo;