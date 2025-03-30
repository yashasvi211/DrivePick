import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import SearchBar from '../components/SearchBar';
import Carousel from '../components/Carousel';

// Carousel data
const carouselItems = [
  { id: '1', image: 'https://imgd.aeplcdn.com/1920x580/media/cw/no5qv9b_1808753.jpg' },
  { id: '2', image: 'https://imgd.aeplcdn.com/1920x580/media/cw/no5qv9b_1808753.jpg' },
  { id: '3', image: 'https://imgd.aeplcdn.com/1920x580/media/cw/no5qv9b_1808753.jpg' },
];

// Buttons Data (Reordered)
const boxItems = [
  { id: '1', title: 'Explore', icon: 'car' },
  { id: '2', title: 'Compare', icon: 'car-connected' },
  { id: '3', title: 'Upcoming', icon: 'clock' },
  { id: '4', title: 'Just Launched', icon: 'new-box' },
];

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const { width, height } = Dimensions.get('window');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1, padding: 16 }}>
        <SearchBar />
        <Carousel items={carouselItems} />

        {/* Four Cards Section */}
        <View style={styles.boxContainer}>
          {boxItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.box} 
              activeOpacity={0.7}
            >
              <Card style={[styles.card, styles.pressedCard]}>
                <View style={styles.cardContent}>
                  <MaterialCommunityIcons 
                    name={item.icon} 
                    size={32} 
                    color={theme.colors.primary}
                  />
                  <Text style={styles.boxText}>{item.title}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 60,
  },
  box: {
    width: '47%', // Two cards per row with even spacing
    marginBottom: 16, // More space between rows
  },
  card: {
    height: 120,
    borderRadius: 16,
    elevation: 3,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center',     // Center content horizontally
  },
  pressedCard: {
    overflow: 'hidden', // Ensures the button looks pressed fully
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 6,
    textAlign: 'center',
  },
});
