import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const dummyCars = [
  {
    id: 1,
    name: 'Maruti Suzuki Dzire',
    type: 'Sedan',
    image_url: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/170173/dzire-exterior-right-front-three-quarter-27.jpeg?isig=0&q=80',
    engine_power: '89 PS',
    fuel_type: 'Petrol',
    price_range: '₹6.5 - ₹9.4 Lakh',
    seating_capacity: 5,
    mileage: '22 kmpl',
    transmission: 'Manual / Automatic',
    boot_space: '378 L',
    variants: [
      {
        name: 'Dzire LXI',
        fuel_type: 'Petrol',
        transmission: 'Manual',
        price: '₹6.5 Lakh',
        features: 'Dual airbags, ABS, Manual AC',
      },
      {
        name: 'Dzire VXI AMT',
        fuel_type: 'Petrol',
        transmission: 'Automatic',
        price: '₹7.9 Lakh',
        features: 'Touchscreen, Reverse Camera, Auto AC',
      },
    ]
  },
  {
    id: 2,
    name: 'Hyundai Creta',
    type: 'SUV',
    image_url: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/creta-exterior-right-front-three-quarter-5.jpeg?isig=0&q=80',
    engine_power: '113 BHP',
    fuel_type: 'Petrol / Diesel',
    price_range: '₹11 - ₹20 Lakh',
    seating_capacity: 5,
    mileage: '17 - 21 kmpl',
    transmission: 'Manual / Automatic',
    boot_space: '433 L',
    variants: [
      {
        name: 'Creta E',
        fuel_type: 'Petrol',
        transmission: 'Manual',
        price: '₹11 Lakh',
        features: 'Basic safety features, Power windows',
      },
      {
        name: 'Creta SX (O) Turbo DCT',
        fuel_type: 'Petrol',
        transmission: 'Automatic',
        price: '₹19.2 Lakh',
        features: 'Panoramic sunroof, ADAS, Bose speakers',
      },
    ]
  },
];


export default function ExploreScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    setCars(dummyCars);
  }, []);

  const handleImagePress = (car) => {
    navigation.navigate('CarDetailScreen', { car });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1, padding: 16 }}>
        <FlatList
          data={cars}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card style={styles.carCard}>
              <View style={styles.row}>
                {/* Car Info */}
                <View style={styles.carInfo}>
                  <Text style={styles.carName}>{item.name}</Text>
                  <Text style={styles.carDetails}>Type: {item.type}</Text>
                  <Text style={styles.carDetails}>Power: {item.engine_power}</Text>
                  <Text style={styles.carDetails}>Fuel: {item.fuel_type}</Text>
                  <Text style={styles.carDetails}>Price: {item.price_range}</Text>
                </View>
                {/* Car Image */}
                <TouchableOpacity onPress={() => handleImagePress(item)}>
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image_url }} style={styles.carImage} />
                  </View>
                </TouchableOpacity>
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
  carCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 10,
  },
  carName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  carDetails: {
    fontSize: 14,
    color: '#666',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  carImage: {
    width: 100,
    height: 60,
    borderRadius: 8,
  },
});
