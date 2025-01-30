import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function InstructionsScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.push('/')}
      >
        <MaterialCommunityIcons name="arrow-left" size={30} color="#FFFFFF" />
      </TouchableOpacity>

      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Getting Started</Text>
          
          <View style={styles.featureCard}>
            <MaterialCommunityIcons 
              name="cloud-upload" 
              size={40} 
              color="#FFFFFF" 
              style={styles.featureIcon}
            />
            <Text style={styles.featureTitle}>Upload Images</Text>
            <Text style={styles.featureDescription}>
              Capture photos or select from your gallery. Our AI instantly analyzes 
              your images to identify objects, text, and scenes in real-time.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <MaterialCommunityIcons 
              name="timeline-clock" 
              size={40} 
              color="#FFFFFF" 
              style={styles.featureIcon}
            />
            <Text style={styles.featureTitle}>Vision History</Text>
            <Text style={styles.featureDescription}>
              Access your complete vision history in the Events tab. Review past 
              images and their AI-generated descriptions, making it easy to track 
              and reference previous captures.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <MaterialCommunityIcons 
              name="brain" 
              size={40} 
              color="#FFFFFF" 
              style={styles.featureIcon}
            />
            <Text style={styles.featureTitle}>AI-Powered Analysis</Text>
            <Text style={styles.featureDescription}>
              Experience cutting-edge machine learning that provides detailed 
              descriptions of your surroundings. Perfect for identifying objects, 
              reading text, and understanding scenes.
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.startButton}
            onPress={() => router.push('/(tabs)/uploads')}
          >
            <MaterialCommunityIcons name="camera" size={24} color="#4285F4" />
            <Text style={styles.startButtonText}>Start Capturing</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4285F4',
  },
  scrollView: {
    flex: 1,
    marginTop: 100,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  featureIcon: {
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  featureDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    opacity: 0.9,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 20,
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  startButtonText: {
    color: '#4285F4',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
});