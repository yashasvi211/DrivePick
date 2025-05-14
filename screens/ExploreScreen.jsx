import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';




export default function ExploreScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [cars, setCars] = useState([]);

   useEffect(() => {
  fetch('http://192.168.29.144:5000/cars')  // Or use your local IP if testing on a real device
    .then(res => res.json())
    .then(data => setCars(data))
    .catch(err => console.error('Error fetching cars:', err));
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
