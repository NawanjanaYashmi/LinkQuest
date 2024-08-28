import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Backendtesting = () => {
  const [data, setData] = useState(null);

  const fetchAPI = async () => {
    try {
      const response = await axios.get('http://192.168.1.39:5000/employee');
      console.log(response.data);
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <View>
      <Text style={styles.Text}>Backendtesting</Text>
      {data && <Text>{JSON.stringify(data)}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  Text: { color: 'red' }
});

export default Backendtesting;