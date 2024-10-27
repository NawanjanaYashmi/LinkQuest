import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import { Header, Icon } from 'react-native-elements';
import { RouteProp, useRoute } from '@react-navigation/native';
import { db } from '../../firebaseconfig'; // Ensure this imports your Firestore configuration
import { collection, getDocs, query, where } from 'firebase/firestore';

const CategoryList = () => {
    const route = useRoute<RouteProp<{ params: { location: string } }, 'params'>>();
    const location = route.params.location;
    const [categories, setCategories] = useState<any[]>([]); // Adjust the type according to your data structure
    const [searchTerm, setSearchTerm] = useState<string>(''); // State for search input

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const q = query(collection(db, 'CategoryList'), where('Category', '==', location));
                const querySnapshot = await getDocs(q);
                
                const fetchedCategories = querySnapshot.docs.map(doc => ({
                    id: doc.id, // Get document ID if needed
                    ...doc.data(),
                }));
                setCategories(fetchedCategories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, [location]); // Run the effect when the location changes

    // Function to handle search input
    const handleSearch = (text: string) => {
        setSearchTerm(text);
    };

    // Filter categories based on search term
    const filteredCategories = categories.filter(category => 
        category.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.City?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <ScrollView>
            <Header
                centerComponent={{
                    text: 'Category List',
                    style: { color: '#2A2A2A', fontSize: 20, fontWeight: 'bold', marginTop: 10 },
                }}
                backgroundColor="white"
            />
            <View style={styles.container}>
                <SearchBar
                    style={styles.searchbar}
                    placeholder="Search here"
                    onChangeText={handleSearch}
                    value={searchTerm}
                />

                {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                        <View style={styles.card} key={category.id}>
                            {category.Img_URL ? (
                                <Image source={{ uri: category.Img_URL }} style={styles.image} /> 
                            ) : (
                                <View style={styles.imagePlaceholder} /> // Placeholder if no image URL
                            )}
                            <View style={styles.textContainer}>
                                <Text style={styles.placeName}>{category.Name || "Unnamed Place"}</Text>
                                <Text style={styles.cityName}>{category.City || "Unknown City"}</Text>
                            </View>
                            <Icon name="chevron-right" type="material" color="#888" size={30} />
                        </View>
                    ))
                ) : (
                    <Text style={styles.noResultsText}>No results found</Text>
                )}
            </View>
        </ScrollView>
    );
};

// Define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    searchbar: {
        marginTop: 35,
        width: '90%',
        height: 40,
        backgroundColor: '#F5F5F5',
        marginBottom: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
        padding: 5,
        marginVertical: 5,
        alignItems: 'center',
        width: '95%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
        marginTop: 10,
    },
    image: {
        width: 105,
        height: 80,
        borderRadius: 8,
        marginRight: 10,
    },
    imagePlaceholder: {
        width: 105,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#e0e0e0', // Placeholder color
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    placeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    cityName: {
        fontSize: 14,
        color: '#666',
        marginTop: 3,
    },
    noResultsText: {
        fontSize: 16,
        color: '#888',
        marginTop: 20,
    },
});

// Make this component available to the app
export default CategoryList;