import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Label {
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

interface Event {
  id: string;
  timestamp: string;
  imageUrl: string;
  labels: string[];
}

// Simplified to 6 core labels
const labelIcons: Record<string, Label> = {
  'Person': { name: 'Person', icon: 'account' },
  'Package': { name: 'Package', icon: 'package-variant-closed' },
  'Vehicle': { name: 'Vehicle', icon: 'car' },
  'Animal': { name: 'Animal', icon: 'paw' },
  'Suspicious': { name: 'Suspicious', icon: 'alert' },
  'Night Time': { name: 'Night Time', icon: 'moon-waning-crescent' },
};

// Mock data using only the 6 core labels
const mockEvents: Event[] = [
  {
    id: '1',
    timestamp: '2024-03-10 14:30:00',
    imageUrl: 'https://picsum.photos/100',
    labels: ['Person', 'Package'],
  },
  {
    id: '2',
    timestamp: '2024-03-10 15:45:00',
    imageUrl: 'https://picsum.photos/101',
    labels: ['Animal'],
  },
  {
    id: '3',
    timestamp: '2024-03-11 16:20:00',
    imageUrl: 'https://picsum.photos/102',
    labels: ['Person', 'Suspicious', 'Night Time'],
  },
  {
    id: '4',
    timestamp: '2024-03-11 17:15:00',
    imageUrl: 'https://picsum.photos/103',
    labels: ['Vehicle'],
  },
];

export default function EventsScreen(): JSX.Element {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

  // Filter events based on applied filters (not selected filters)
  const filteredEvents = useMemo(() => {
    if (appliedFilters.length === 0) return mockEvents;
    return mockEvents.filter(event =>
      appliedFilters.some(filter => event.labels.includes(filter))
    );
  }, [appliedFilters]);

  const sortedEvents = [...filteredEvents].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  const toggleFilter = (label: string) => {
    setSelectedFilters(prev =>
      prev.includes(label)
        ? prev.filter(f => f !== label)
        : [...prev, label]
    );
  };

  const applyFilters = () => {
    setAppliedFilters(selectedFilters);
    setIsFilterVisible(false);
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setAppliedFilters([]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.push('/')}
      >
        <MaterialCommunityIcons name="arrow-left" size={30} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Vision History</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setIsFilterVisible(true)}
        >
          <MaterialCommunityIcons 
            name="filter-variant" 
            size={24} 
            color="#FFFFFF" 
          />
          {appliedFilters.length > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{appliedFilters.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {sortedEvents.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <Image
              source={{ uri: event.imageUrl }}
              style={styles.thumbnail}
            />
            <View style={styles.eventDetails}>
              <View style={styles.timestampContainer}>
                <MaterialCommunityIcons name="clock-outline" size={14} color="#FFFFFF" />
                <Text style={styles.timestamp}>{formatTimestamp(event.timestamp)}</Text>
              </View>
              <View style={styles.labelsContainer}>
                {event.labels.map((label, index) => (
                  <View key={index} style={styles.labelPill}>
                    <MaterialCommunityIcons 
                      name={labelIcons[label]?.icon || 'tag'} 
                      size={12} 
                      color="#FFFFFF" 
                    />
                    <Text style={styles.labelText}>{label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={isFilterVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter by Labels</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setIsFilterVisible(false)}
              >
                <MaterialCommunityIcons name="close" size={24} color="#4285F4" />
              </TouchableOpacity>
            </View>

            <View style={styles.filterOptionsContainer}>
              {Object.entries(labelIcons).map(([label, { icon }]) => (
                <TouchableOpacity
                  key={label}
                  style={[
                    styles.filterPill,
                    selectedFilters.includes(label) && styles.filterPillSelected
                  ]}
                  onPress={() => toggleFilter(label)}
                >
                  <MaterialCommunityIcons
                    name={icon}
                    size={16}
                    color={selectedFilters.includes(label) ? '#FFFFFF' : '#4285F4'}
                    style={styles.filterPillIcon}
                  />
                  <Text style={[
                    styles.filterPillText,
                    selectedFilters.includes(label) && styles.filterPillTextSelected
                  ]}>
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearFilters}
              >
                <Text style={styles.clearButtonText}>Clear All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={applyFilters}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4285F4',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  filterButton: {
    padding: 8,
  },
  filterBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#34A853',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  eventDetails: {
    flex: 1,
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timestamp: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 4,
    opacity: 0.8,
  },
  labelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  labelPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  labelText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 4,
  },
  filterOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 10,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  filterPillSelected: {
    backgroundColor: '#4285F4',
  },
  filterPillIcon: {
    marginRight: 6,
    opacity: 1,
  },
  filterPillText: {
    color: '#4285F4',
    fontSize: 14,
  },
  filterPillTextSelected: {
    color: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  closeButton: {
    padding: 4,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  clearButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#4285F4',
  },
  clearButtonText: {
    color: '#4285F4',
    fontSize: 16,
    fontWeight: '600',
  },
  applyButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});