import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HomeScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <MaterialCommunityIcons 
          name="eye-outline" 
          size={80} 
          color="#FFFFFF" 
          style={styles.icon}
        />
        
        <Text style={styles.title}>
          Vision Sync
        </Text>

        <Text style={styles.mission}>
          Empowering the visually impaired with AI-enabled vision technology.
        </Text>

        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => router.push('/(tabs)/instructions')}
        >
          <MaterialCommunityIcons name="play" size={24} color="#FFFFFF" />
          <Text style={[styles.buttonText, styles.primaryButtonText]}>Start Vision Sync</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  mission: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 40,
    lineHeight: 26,
    opacity: 0.9,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 16,
    width: '100%',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#34A853',
  },
  buttonText: {
    color: '#4285F4',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '100%',
    marginVertical: 20,
  },
});