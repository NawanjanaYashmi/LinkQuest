import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';

interface IMessage {
  text: string;
  role: 'user' | 'model';
}

const ChatScreen = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage: IMessage = { text: inputText, role: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText('');

    try {
      const response = await axios.post('http://10.0.2.2:5000/chat', {
        user_input: inputText,
      });

      const botResponse: IMessage = { text: response.data.response, role: 'model' };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
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
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1e7dd',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
});

export default ChatScreen;