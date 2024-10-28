import * as React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { Header, Image } from 'react-native-elements';
import { Card, Button } from 'react-native-paper';
import SearchBar from 'react-native-dynamic-search-bar';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';

interface Promotion {
  id: string;
  img_url?: string;
  Hotel_Name: string;
  Starting_Date: string;
  Ending_Date: string;
  Percentage: number;
  chat_data: string;
}

const PromotionScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [promotions, setPromotions] = React.useState<Promotion[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  React.useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Promotion'));
        const promoData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Promotion[];
        setPromotions(promoData);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    fetchPromotions();
  }, []);

  const handleViewMore = async (chatData: string) => {
    try {
      await AsyncStorage.setItem('chat_data', chatData);
      
      navigation.navigate('ChatAssist');
    } catch (error) {
      console.error("Error saving chat data:", error);
    }
  };

  const filteredPromotions = promotions.filter((promo) =>
    promo.Hotel_Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView>
      <Header
        centerComponent={{
          text: 'Promotions',
          style: { color: '#2A2A2A', fontSize: 20, fontWeight: 'bold', marginTop: 10 },
        }}
        backgroundColor="white"
      />

      <View style={styles.container}>
        <SearchBar
          style={styles.searchbar}
          placeholder="Search here"
          onPress={() => console.log('Search Pressed')}
          onChangeText={text => setSearchQuery(text)}
        />

        {filteredPromotions.map((promo) => (
          <Card style={styles.cardMain} key={promo.id}>
            <Card.Cover
              source={{ uri: promo.img_url || 'https://via.placeholder.com/150' }}
              
            />
            <Card.Content>
              <View style={styles.rowContainerTextOne}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../Images/loicon.png')} style={styles.icon} />
                  <Text style={styles.cardTextOneLeft}>{promo.Hotel_Name}</Text>
                </View>
                <View style={styles.rowContainerTextOne}>
                  <Image source={require('../Images/Star.png')} style={styles.iconSmall} />
                  <Text style={styles.cardTextOneRight}>4.4</Text>
                </View>
              </View>
              <Text style={styles.cardTextTwo}>
                {promo.Starting_Date} - {promo.Ending_Date}
              </Text>
              <View style={styles.rowContainerTextTwo}>
                <Text style={styles.cardDiscountText}>{promo.Percentage} %</Text>
                <Card.Actions>
                  <Button
                    style={styles.viewMoreBtn}
                    onPress={() => handleViewMore(promo.chat_data)} // Save chat_data to AsyncStorage
                  >
                    <Text style={styles.viewMoreText}>View More Details</Text>
                  </Button>
                </Card.Actions>
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', alignItems: 'center' },
  searchbar: { marginTop: 35, width: '90%', height: 40, backgroundColor: '#F5F5F5' },
  cardMain: { width: '90%', marginTop: 20, backgroundColor: '#F5F5F5' },
  rowContainerTextOne: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardTextOneLeft: { marginTop: 8, fontSize: 17, fontWeight: '500', color: '#2A2A2A' },
  cardTextOneRight: { marginTop: 8, fontSize: 15, fontWeight: '500', color: '#F7B502' },
  cardTextTwo: { fontSize: 14, fontWeight: '500', color: '#c5c5c5' ,marginStart:25,},
  cardDiscountText: { fontSize: 23, fontWeight: '800', color: '#2A2A2A', marginTop: 5 },
  rowContainerTextTwo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  viewMoreBtn: { backgroundColor: '#75A82B', borderRadius: 15, left: 10 },
  viewMoreText: { color: 'white', fontSize: 12, fontWeight: '500' },
  icon: { width: 18, height: 18, marginRight: 5 },
  iconSmall: { width: 15, height: 15, marginRight: 5 },
});

export default PromotionScreen;