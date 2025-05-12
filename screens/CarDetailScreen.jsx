import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CarDetailScreen({ route }) {
  const { car } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Car Name */}
        <Text style={styles.title}>{car.name}</Text>

        {/* Car Image */}
        <Image source={{ uri: car.image_url }} style={styles.carImage} />

        {/* Car Specifications */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>
            <Text style={styles.label}>Type: </Text>{car.type}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.label}>Engine Power: </Text>{car.engine_power}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.label}>Fuel Type: </Text>{car.fuel_type}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.label}>Price Range: </Text>{car.price_range}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.label}>Mileage: </Text>{car.mileage || '22-25 km/l (approx)'}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.label}>Seating Capacity: </Text>{car.seating_capacity || '5'}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.label}>Transmission: </Text>{car.transmission || 'Manual / AMT / Auto'}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.label}>Boot Space: </Text>{car.boot_space || '~400 Litres'}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.label}>Safety: </Text>{car.safety || 'Airbags, ABS, EBD, etc.'}
          </Text>
        </View>

        {/* Variant Section */}
        {car.variants && car.variants.length > 0 && (
          <View style={styles.variantsContainer}>
            <Text style={styles.variantsTitle}>Available Variants</Text>
            {car.variants.map((variant, index) => (
              <View key={index} style={styles.variantBox}>
                <Text style={styles.variantName}>{variant.name}</Text>
                <Text style={styles.variantDetail}><Text style={styles.bold}>Fuel Type:</Text> {variant.fuel_type}</Text>
                <Text style={styles.variantDetail}><Text style={styles.bold}>Transmission:</Text> {variant.transmission}</Text>
                <Text style={styles.variantDetail}><Text style={styles.bold}>Price:</Text> {variant.price}</Text>
                <Text style={styles.variantDetail}><Text style={styles.bold}>Features:</Text> {variant.features}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  carImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailsContainer: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
  },
  variantsContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  variantsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  variantBox: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  variantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  variantDetail: {
    fontSize: 14,
    marginBottom: 4,
  },
  bold: {
    fontWeight: '600',
  },
});
