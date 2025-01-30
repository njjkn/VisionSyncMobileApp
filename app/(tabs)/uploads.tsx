import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function UploadScreen(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets[0].uri) {
        // TODO: Upload image to your server
        console.log("Selected image:", result.assets[0].uri);
        
        Alert.alert(
          "Success",
          "Image selected successfully!",
          [
            {
              text: "View in Events",
              onPress: () => router.replace('/(tabs)/events'),
            },
            { text: "Select Another", style: "cancel" }
          ]
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed to select image");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.replace('/')}
      >
        <MaterialCommunityIcons name="arrow-left" size={30} color="#FFFFFF" />
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <MaterialCommunityIcons 
          name="cloud-upload" 
          size={60} 
          color="#FFFFFF" 
          style={styles.icon}
        />
        <Text style={styles.title}>Upload Images</Text>
        <Text style={styles.description}>
          Upload images to be processed by our AI and ML algorithms.
          Get instant feedback and analysis of your visual content.
        </Text>
        
        <TouchableOpacity 
          style={styles.uploadButton}
          onPress={pickImage}
          disabled={isLoading}
        >
          <MaterialCommunityIcons 
            name="image" 
            size={24} 
            color="#4285F4" 
          />
          <Text style={styles.buttonText}>Choose from Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4285F4',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 8,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
  },
  description: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 26,
    opacity: 0.9,
    marginBottom: 40,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 30,
    marginBottom: 16,
    width: '100%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#4285F4',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
});