import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function CompareScreen() {
  const [cars, setCars] = useState([]);
  const [selectedCars, setSelectedCars] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://172.20.10.3:5000/cars') // Replace with your machine's IP
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error('Error fetching cars:', err));
  }, []);

  const handleCarSelect = (car) => {
    if (selectedCars.length < 2 && !selectedCars.includes(car)) {
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
          data={cars}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCarSelect(item)}>
              <View style={styles.carCard}>
                <View style={styles.row}>
                  <Image source={{ uri: item.image_url }} style={styles.carImage} />
                  <View style={styles.carInfo}>
                    <Text style={styles.carName}>{item.name}</Text>
                    <Text style={styles.carDetails}>Type: {item.type}</Text>
                    <Text style={styles.carDetails}>Price: {item.price_range}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        {selectedCars.length === 2 && (
          <>
            <View style={styles.comparisonContainer}>
              {selectedCars.map((car, index) => (
                <View key={index} style={styles.carColumn}>
                  <Text style={styles.carName}>{car.name}</Text>
                  <Image source={{ uri: car.image_url }} style={styles.carImage} />
                  <Text style={styles.carDetails}>Type: {car.type}</Text>
                  <Text style={styles.carDetails}>Price: {car.price_range}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.compareButton} onPress={handleCompare}>
              <Text style={styles.compareButtonText}>Compare Cars</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  carCard: { backgroundColor: '#f9f9f9', borderRadius: 8, marginBottom: 12, padding: 10, elevation: 3 },
  row: { flexDirection: 'row', alignItems: 'center' },
  carImage: { width: 100, height: 60, borderRadius: 8 },
  carInfo: { flex: 1, paddingLeft: 10 },
  carName: { fontSize: 16, fontWeight: 'bold' },
  carDetails: { fontSize: 14, color: '#666' },
  comparisonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  carColumn: { flex: 1, alignItems: 'center' },
  compareButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  compareButtonText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
});
