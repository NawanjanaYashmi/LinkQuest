//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import { Header, Icon } from 'react-native-elements';

// create a component
const CatogoryList = () => {
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
                
            />

                <View style={styles.card}>
                    <Image source={require('../Images/unawatunabeach.jpg')} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.placeName}>Unawatuna Beach</Text>
                        <Text style={styles.cityName}>Unawatuna</Text>
                    </View>
                    <Icon name="chevron-right" type="material" color="#888" size={30} />
                </View>

                <View style={styles.card}>
                    <Image source={require('../Images/HikkaduwaBeach.jpg')} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.placeName}>Hikkaduwa Beach</Text>
                        <Text style={styles.cityName}>Hikkaduwa</Text>
                    </View>
                    <Icon name="chevron-right" type="material" color="#888" size={30} />
                </View>

                
                
            </View>
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    searchbar: { 
        marginTop: 35, 
        width: '90%', 
        height: 40, 
        backgroundColor: '#F5F5F5', 
        marginBottom:20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
        padding:5,
        marginVertical: 5,
        alignItems: 'center',
        width: '95%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
        marginTop:10,
    },
    image: {
        width: 105,
        height: 80,
        borderRadius: 8,
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
});

//make this component available to the app
export default CatogoryList;
