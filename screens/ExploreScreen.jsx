import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, Card } from 'react-native-paper';
import SearchBar from '../components/SearchBar';

// Car list data
const cars = [
  { id: '1', name: 'Maruti Suzuki Swift', cylinders: 4, image: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/144063/swift-exterior-right-front-three-quarter.jpeg' },
  { id: '2', name: 'Hyundai Creta', cylinders: 4, image: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/145183/creta-exterior-right-front-three-quarter-2.jpeg' },
  { id: '3', name: 'Tata Harrier', cylinders: 4, image: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/141161/harrier-exterior-right-front-three-quarter-5.jpeg' },
  { id: '4', name: 'Mahindra Thar', cylinders: 4, image: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/145453/thar-exterior-right-front-three-quarter.jpeg' },
];

export default function ExploreScreen() {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1, padding: 16 }}>
 
        <FlatList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.carCard}>
              <Image source={{ uri: item.image }} style={styles.carImage} />
              <View style={styles.carInfo}>
                <Text style={styles.carName}>{item.name}</Text>
                <Text style={styles.carCylinders}>Cylinders: {item.cylinders}</Text>
              </View>
            </Card>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  carCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    elevation: 3,
  },
  carImage: {
    width: 100,
    height: 60,
    borderRadius: 8,
  },
  carInfo: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  carName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  carCylinders: {
    fontSize: 14,
    color: '#666',
  },
});
