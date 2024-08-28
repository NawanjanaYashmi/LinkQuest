import React, { useEffect, useState } from 'react';
import { Header, Icon, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { collection, getDocs, QuerySnapshot } from 'firebase/firestore';
import { db } from '../../firebaseconfig'; // Adjust the import path

interface Category {
  Name: string;
  url: string;
}

const CategoryPage = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot: QuerySnapshot = await getDocs(collection(db, 'Categories'));
        const fetchedCategories: Category[] = querySnapshot.docs.map(doc => {
          const data = doc.data() as Category;
          return {
            ...data,
            id: doc.id, // Optional: include the document ID if needed
          };
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
    <View style={{ flex: 1 }}>
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

      <View style={sty.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#75A82B" style={sty.loadingIndicator} />
        ) : (
          categories.map((category, index) => (
            <TouchableOpacity key={index} style={sty.CategoryPageSectionBtns}>
              <Image source={{ uri: category.url }} style={sty.categoryImage} />
              <Text style={sty.categoryName}>{category.Name}</Text>
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
    width: 90,
    height: 90,
    borderWidth: 1,
    borderRadius: 10,
    padding: 7,
    margin: 6,
    alignItems: 'center',
    elevation: 10,
    justifyContent: 'center',
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginBottom: 5,
  },
  categoryName: {
    color: '#75A82B',
    fontSize: 12,
    fontWeight: '700',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly', // Distribute buttons evenly
    marginTop: 30,
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