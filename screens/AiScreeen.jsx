import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const allPriorities = ["Comfort", "Safety", "Mileage", "Low Maintenance", "Performance"];

export default function AiScreen() {
  const [seatCapacity, setSeatCapacity] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [budget, setBudget] = useState('');
  const [priority1, setPriority1] = useState('');
  const [priority2, setPriority2] = useState('');
  const [priority3, setPriority3] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [recommendedCar, setRecommendedCar] = useState('');
  const [carImage, setCarImage] = useState('');

  const getFilteredPriorities = (exclude1, exclude2) => {
    return allPriorities.filter(p => p !== exclude1 && p !== exclude2);
  };

  const carImages = {
    "Maruti Suzuki Dzire": "https://imgd.aeplcdn.com/664x374/n/cw/ec/141903/dzire-exterior-right-front-three-quarter-4.jpeg",
    "Hyundai Creta": "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/creta-exterior-right-front-three-quarter-2.jpeg",
    "Tata Nexon": "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/nexon-exterior-right-front-three-quarter.jpeg",
    "Maruti Suzuki Swift": "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/swift-exterior-right-front-three-quarter.jpeg",
    "Honda City": "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/city-exterior-right-front-three-quarter.jpeg",
    "Kia Seltos": "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/seltos-exterior-right-front-three-quarter.jpeg",
    "Maruti Suzuki Ertiga": "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/ertiga-exterior-right-front-three-quarter.jpeg",
    "Toyota Innova": "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/innova-exterior-right-front-three-quarter.jpeg",
    "Hyundai Venue": "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/venue-exterior-right-front-three-quarter.jpeg",
    "Mahindra XUV300": "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/xuv300-exterior-right-front-three-quarter.jpeg",
    "Renault Triber": "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/triber-exterior-right-front-three-quarter.jpeg",
    "Maruti Suzuki Baleno": "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/baleno-exterior-right-front-three-quarter.jpeg",
    "Tata Altroz": "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/altroz-exterior-right-front-three-quarter.jpeg",
    "Honda Amaze": "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/amaze-exterior-right-front-three-quarter.jpeg",
    "Kia Sonet": "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/sonet-exterior-right-front-three-quarter.jpeg",
  };

  const handleSubmit = async () => {
    if (!seatCapacity || !bodyType || !budget || !priority1 || !priority2 || !priority3) {
      alert('Please fill all fields');
      return;
    }

    setShowLoading(true);
    setShowResult(false);

    try {
      const response = await fetch('http://172.20.10.3:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seat_capacity: seatCapacity,
          body_type: bodyType,
          budget,
          priority1,
          priority2,
          priority3,
        }),
      });

      const data = await response.json();
      if (data.error) {
        alert(data.error);
        setShowLoading(false);
        return;
      }

      setRecommendedCar(data.car_name);
      setCarImage(carImages[data.car_name] || 'https://via.placeholder.com/300x180');
      setShowLoading(false);
      setShowResult(true);
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Error fetching recommendation');
      setShowLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {showLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.waitText}>Finding the best car for you...</Text>
        </View>
      ) : showResult ? (
        <View style={styles.centered}>
          <Text style={styles.title}>{recommendedCar} is Best</Text>
          <Image source={{ uri: carImage }} style={styles.image} />
          <TouchableOpacity style={styles.button} onPress={() => setShowResult(false)}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.title}>Car Preference Selection</Text>

          <Text style={styles.label}>Seat Capacity</Text>
          <Picker
            selectedValue={seatCapacity}
            style={styles.picker}
            onValueChange={(itemValue) => setSeatCapacity(itemValue)}
          >
            <Picker.Item label="Select" value="" />
            <Picker.Item label="5-Seater" value="5" />
            <Picker.Item label="7-Seater" value="7" />
          </Picker>

          <Text style={styles.label}>Body Type</Text>
          <Picker
            selectedValue={bodyType}
            style={styles.picker}
            onValueChange={(itemValue) => setBodyType(itemValue)}
          >
            <Picker.Item label="Select" value="" />
            <Picker.Item label="SUV" value="SUV" />
            <Picker.Item label="Sedan" value="Sedan" />
            <Picker.Item label="Hatchback" value="Hatchback" />
            <Picker.Item label="MPV" value="MPV" />
          </Picker>

          <Text style={styles.label}>Budget</Text>
          <Picker
            selectedValue={budget}
            style={styles.picker}
            onValueChange={(itemValue) => setBudget(itemValue)}
          >
            <Picker.Item label="Select" value="" />
            <Picker.Item label="₹5-7L" value="5-7L" />
            <Picker.Item label="₹7-9L" value="7-9L" />
            <Picker.Item label="₹9-12L" value="9-12L" />
            <Picker.Item label="₹12L+" value="12L+" />
          </Picker>

          <Text style={styles.label}>Priority 1</Text>
          <Picker
            selectedValue={priority1}
            style={styles.picker}
            onValueChange={(itemValue) => {
              setPriority1(itemValue);
              if (itemValue === priority2) setPriority2('');
              if (itemValue === priority3) setPriority3('');
            }}
          >
            <Picker.Item label="Select" value="" />
            {getFilteredPriorities(priority2, priority3).map((item) => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>

          <Text style={styles.label}>Priority 2</Text>
          <Picker
            selectedValue={priority2}
            style={styles.picker}
            onValueChange={(itemValue) => {
              setPriority2(itemValue);
              if (itemValue === priority1) setPriority2('');
              if (itemValue === priority3) setPriority3('');
            }}
          >
            <Picker.Item label="Select" value="" />
            {getFilteredPriorities(priority1, priority3).map((item) => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>

          <Text style={styles.label}>Priority 3</Text>
          <Picker
            selectedValue={priority3}
            style={styles.picker}
            onValueChange={(itemValue) => {
              setPriority3(itemValue);
              if (itemValue === priority1 || itemValue === priority2) setPriority3('');
            }}
          >
            <Picker.Item label="Select" value="" />
            {getFilteredPriorities(priority1, priority2).map((item) => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit Preferences</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waitText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  image: {
    width: 300,
    height: 180,
    marginTop: 20,
    borderRadius: 10,
  },
});
