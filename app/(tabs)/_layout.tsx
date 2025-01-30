import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout(): JSX.Element {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#4285F4',
        tabBarInactiveTintColor: '#9E9E9E',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="instructions"
        options={{
          title: 'Instructions',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lightbulb-on" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="uploads"
        options={{
          title: 'Upload',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cloud-upload" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="timeline-clock" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
