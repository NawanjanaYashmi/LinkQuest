import React, { useEffect, useState } from 'react';
import { Header, Icon, Text } from 'react-native-elements';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { collection, getDocs, QuerySnapshot } from 'firebase/firestore';
import { db } from '../../firebaseconfig'; // Adjust the import path

interface Category {
  Name: string;
  url: string;
}

const CategoryPage = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
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

      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#75A82B" style={styles.loadingIndicator} />
        ) : (
          categories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.categoryButton} onPress={()=>{
              navigation.navigate('CatogoryList',
                {
                  location:category.Name
                }
              );
            }}>
              <Image source={{ uri: category.url }} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{category.Name}</Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
    width: 90,
    height: 90,
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Soft shadow effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  categoryImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginBottom: 5,
  },
  categoryName: {
    color: '#696969',
    fontSize: 12,
    fontWeight: '700',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
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