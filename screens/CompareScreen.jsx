import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const dummyCars = [
  {
    id: 1,
    name: 'Maruti Suzuki Dzire',
    image_url: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/170173/dzire-exterior-right-front-three-quarter-27.jpeg',
    type: 'Sedan',
    engine_power: '89 PS',
    fuel_type: 'Petrol',
    price_range: '₹6.5 - ₹9.4 Lakh',
    seating_capacity: 5,
    mileage: '22 kmpl',
    transmission: 'Manual / Automatic',
    boot_space: '378 L',
    variants: [
      {
        name: 'LXi',
        fuel_type: 'Petrol',
        transmission: 'Manual',
        price: '₹6.5 Lakh',
        features: 'Basic features, no infotainment system',
      },
      {
        name: 'VXi AMT',
        fuel_type: 'Petrol',
        transmission: 'AMT',
        price: '₹7.8 Lakh',
        features: 'Touchscreen, rear parking sensors',
      },
    ],
  },
  {
    id: 2,
    name: 'Hyundai Creta',
    image_url: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/creta-exterior-right-front-three-quarter-5.jpeg',
    type: 'SUV',
    engine_power: '113 BHP',
    fuel_type: 'Petrol / Diesel',
    price_range: '₹11 - ₹20 Lakh',
    seating_capacity: 5,
    mileage: '17 - 21 kmpl',
    transmission: 'Manual / Automatic',
    boot_space: '433 L',
    variants: [
      {
        name: 'E',
        fuel_type: 'Petrol',
        transmission: 'Manual',
        price: '₹11.0 Lakh',
        features: 'Basic features, no touchscreen',
      },
      {
        name: 'SX (O)',
        fuel_type: 'Petrol',
        transmission: 'Automatic',
        price: '₹18.5 Lakh',
        features: 'Touchscreen, panoramic sunroof, advanced safety features',
      },
    ],
  },
];

export default function CompareScreen() {
  const [selectedCars, setSelectedCars] = useState([]);
  const navigation = useNavigation();

  const handleCarSelect = (car) => {
    if (selectedCars.length < 2) {
      setSelectedCars([...selectedCars, car]);
    }
  };

  const handleCompare = () => {
    if (selectedCars.length === 2) {
      navigation.navigate('CarComparisonDetails', { selectedCars });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <Text style={styles.title}>Select Cars to Compare</Text>

        <FlatList
          data={dummyCars}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.carCard}>
              <TouchableOpacity onPress={() => handleCarSelect(item)}>
                <View style={styles.row}>
                  <Image source={{ uri: item.image_url }} style={styles.carImage} />
                  <View style={styles.carInfo}>
                    <Text style={styles.carName}>{item.name}</Text>
                    <Text style={styles.carDetails}>Type: {item.type}</Text>
                    <Text style={styles.carDetails}>Price: {item.price_range}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />

        {selectedCars.length === 2 && (
          <View style={styles.comparisonContainer}>
            <View style={styles.carColumn}>
              <Text style={styles.carName}>{selectedCars[0].name}</Text>
              <Image source={{ uri: selectedCars[0].image_url }} style={styles.carImage} />
              <Text style={styles.carDetails}>Type: {selectedCars[0].type}</Text>
              <Text style={styles.carDetails}>Price: {selectedCars[0].price_range}</Text>
            </View>

            <View style={styles.carColumn}>
              <Text style={styles.carName}>{selectedCars[1].name}</Text>
              <Image source={{ uri: selectedCars[1].image_url }} style={styles.carImage} />
              <Text style={styles.carDetails}>Type: {selectedCars[1].type}</Text>
              <Text style={styles.carDetails}>Price: {selectedCars[1].price_range}</Text>
            </View>
          </View>
        )}

        {selectedCars.length === 2 && (
          <TouchableOpacity style={styles.compareButton} onPress={handleCompare}>
            <Text style={styles.compareButtonText}>Compare Cars</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  carCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carImage: {
    width: 100,
    height: 60,
    borderRadius: 8,
  },
  carInfo: {
    flex: 1,
    paddingLeft: 10,
  },
  carName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  carDetails: {
    fontSize: 14,
    color: '#666',
  },
  compareButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  compareButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  comparisonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  carColumn: {
    flex: 1,
    alignItems: 'center',
  },
});
