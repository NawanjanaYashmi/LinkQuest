import React, { useState } from 'react';
import { Text, View, Button, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { storage } from '../../firebaseconfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const HotelImageUpload = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setImageUri(uri || null);
      }
    });
  };

  const uploadImage = async () => {
    if (imageUri) {
      setUploading(true);
      const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
      const storageRef = ref(storage, `hotels/${filename}`);

      try {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const snapshot = await uploadBytes(storageRef, blob);

        const url = await getDownloadURL(snapshot.ref);
        setDownloadUrl(url);

        Alert.alert('Upload Successful', 'Image has been uploaded to Firebase Storage.');
      } catch (error) {
        console.error('Error uploading image: ', error);
        Alert.alert('Upload Failed', 'There was an error uploading the image.');
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an Image" onPress={pickImage} />

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}

      {uploading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Upload Image" onPress={uploadImage} disabled={!imageUri} />
      )}

      {downloadUrl && (
        <View style={styles.urlContainer}>
          <Text>Image URL:</Text>
          <Text>{downloadUrl}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
    borderRadius: 10,
  },
  urlContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
});

export default HotelImageUpload;