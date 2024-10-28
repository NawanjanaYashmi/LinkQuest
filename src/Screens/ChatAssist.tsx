import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
  const [apiUrl, setApiUrl] = useState<string | null>(null); 

  // Load hotel data from AsyncStorag e
  useEffect(() => {
    const loadHotelData = async () => {
      try {
        const storedHotelData = await AsyncStorage.getItem('chat_data');
        const otherApi = await AsyncStorage.getItem('other_api');
        setApiUrl(otherApi); 
        console.log(otherApi)
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
      const response = await axios.post(`${apiUrl}/chat`, {
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

    <ImageBackground source={{ uri: 'https://example.com/your-background.jpg' }} style={styles.background}>
      {/* App Bar */}
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Chat Assistant</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        style={styles.messageList}
        contentContainerStyle={styles.messageListContent}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Icon name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
  },
  appBar: {
    height: 60,
    backgroundColor: '#', 
    justifyContent: 'center',
    paddingLeft:20,
    paddingTop: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { height: 2, width: 0 },
  },
  appBarTitle: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageListContent: {
    paddingBottom: 20,
  },
  messageContainer: {
    marginVertical: 8,
    padding: 15,
    borderRadius: 20,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#75A82B', 
    borderBottomRightRadius: 0,
    shadowColor: '#75A82B',
  },
  botMessage: {
    
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderBottomLeftRadius: 0,
    shadowColor: '#ccc',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent
    borderRadius: 25,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  input: {
    flex: 1,
    color:'#000',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#75A82B',
    borderRadius: 20,
    padding: 10,
  },

});

export default ChatScreen;
