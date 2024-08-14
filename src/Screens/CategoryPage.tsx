import React, { useEffect, useState } from 'react';
import { Header, Icon, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseconfig'; // Adjust the import path

const CategoryPage = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Categories'));
        const fetchedCategories: any[] = [];
        querySnapshot.forEach((doc) => {
          fetchedCategories.push({ id: doc.id, ...doc.data() });
        });
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <View>
      <Header
        leftComponent={
          <Icon
            name="west"
            type="MaterialIcons"
            color="#2A2A2A"
            onPress={() => navigation.goBack()}
          />
        }
        centerComponent={{
          text: 'Categories',
          style: { color: '#2A2A2A', fontSize: 20, fontWeight: 'bold' },
        }}
        backgroundColor="white"
      />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 30 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#75A82B" style={sty.loadingIndicator} />
        ) : (
          categories.map((category, index) => (
            <TouchableOpacity key={index} style={sty.CategoryPageSectionBtns}>
              <Text
                style={{
                  marginTop: 5,
                  color: '#75A82B',
                  fontSize: 12,
                  fontWeight: '700',
                }}>
                {category.Name}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  );
};

const sty = StyleSheet.create({
  CategoryPageSectionBtns: {
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
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default CategoryPage;