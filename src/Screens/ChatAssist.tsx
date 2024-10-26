import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IMessage {
  text: string;
  role: 'user' | 'model';
}

const ChatScreen = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [convoHistory, setConvoHistory] = useState<{ parts: { text: string }[], role: string }[]>([]);
  const [hotelData, setHotelData] = useState<string>(''); // Store hotel data here

  // Load hotel data from AsyncStorage
  useEffect(() => {
    const loadHotelData = async () => {
      try {
        const storedHotelData = await AsyncStorage.getItem('chat_data');
        if (storedHotelData) {
          setHotelData(storedHotelData);
        }
      } catch (error) {
        console.error('Error loading hotel data:', error);
      }
    };

    loadHotelData();
  }, []);

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage: IMessage = { text: inputText, role: 'user' };

    // Update messages with user input
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Append user message to conversation history
    const updatedConvoHistory = [
      ...convoHistory,
      { parts: [{ text: inputText }], role: 'user' }
    ];
    setConvoHistory(updatedConvoHistory);
    setInputText('');

    try {
      const response = await axios.post('http://10.0.2.2:5000/chat', {
        user_input: inputText,
        convo_history: updatedConvoHistory,
        hotel_data: hotelData 
      });

      const botResponse: IMessage = { text: response.data.response, role: 'model' };

      // Update messages with bot response
      setMessages((prevMessages) => [...prevMessages, botResponse]);

      // Append bot response to conversation history
      setConvoHistory(response.data.convo_history);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderItem = ({ item }: { item: IMessage }) => (
    <View style={[styles.messageContainer, item.role === 'user' ? styles.userMessage : styles.botMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f0f0f0' },
  hotelDataText: { color: '#000', marginBottom: 10 },
  messageList: { flex: 1 },
  messageContainer: { marginVertical: 5, padding: 10, borderRadius: 10 },
  userMessage: { alignSelf: 'flex-end', backgroundColor: '#d1e7dd' },
  botMessage: { alignSelf: 'flex-start', backgroundColor: '#fff' },
  messageText: { fontSize: 16, color: '#000' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, borderTopWidth: 1, borderColor: '#ccc' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginRight: 10, color: '#000' },
});

export default ChatScreen;