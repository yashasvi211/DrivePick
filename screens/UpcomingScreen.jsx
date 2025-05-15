import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const dummyUpcomingCars = [
   {
    id: 1,
    name: 'Maruti Suzuki Swift 2024',
    type: 'Hatchback',
    engine_power: '90 HP',
    fuel_type: 'Petrol',
    price_range: '₹6 - ₹9 Lakh',
    image_url: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/159099/swift-exterior-right-front-three-quarter-31.jpeg?isig=0&q=80',
  },
  {
    id: 2,
    name: 'Mahindra Thar 5-Door',
    type: 'SUV',
    engine_power: '150 HP',
    fuel_type: 'Diesel',
    price_range: '₹15 - ₹17 Lakh',
    image_url: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/Thar-ROXX/8438/1723692413550/front-left-side-47.jpg?tr=w-664',
  },
  {
    id: 3,
    name: 'Toyota Urban Cruiser Taisor',
    type: 'Compact SUV',
    engine_power: '100 HP',
    fuel_type: 'Petrol',
    price_range: '₹8 - ₹12 Lakh',
    image_url: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/132427/taisor-exterior-right-front-three-quarter-2.png?isig=0&q=80',
  },
    {
    id: 4,
    name: 'Tesla Model 3 Facelift',
    type: 'Sedan',
    engine_power: '300 HP',
    fuel_type: 'Electric',
    price_range: '₹50 - ₹60 Lakh',
    image_url: 'https://imgd.aeplcdn.com/227x128/n/cw/ec/37138/model-3-exterior-right-front-three-quarter.jpeg?isig=0&q=80',
  },
  {
    id: 5,
    name: 'Hyundai Creta EV',
    type: 'SUV',
    engine_power: '200 HP',
    fuel_type: 'Electric',
    price_range: '₹20 - ₹25 Lakh',
    image_url: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/167017/creta-ev-exterior-right-front-three-quarter-14.jpeg?isig=0&q=80',
  },
];

export default function UpcomingScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Replace with actual fetch when API is ready
    setCars(dummyUpcomingCars);
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
                <View style={styles.carInfo}>
                  <Text style={styles.carName}>{item.name}</Text>
                  <Text style={styles.carDetails}>Type: {item.type}</Text>
                  <Text style={styles.carDetails}>Power: {item.engine_power}</Text>
                  <Text style={styles.carDetails}>Fuel: {item.fuel_type}</Text>
                  <Text style={styles.carDetails}>Expected Price: {item.price_range}</Text>
                </View>
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
    marginBottom: 12,
    padding: 12,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 12,
  },
  carName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  carDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
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
