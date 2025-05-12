import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ProfileScreen() {
  const profile = {
    name: 'Yashasvi Parashar',
    dob: 'January 1, 2000',
    email: 'yashasvi@example.com',
    phone: '+1234567890',
    address: '123 Main Street, City, Country',
    hobbies: 'Reading, Traveling, Coding',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profileContainer}>
        <Text style={styles.profileText}>Name: <Text style={styles.profileValue}>{profile.name}</Text></Text>
        <Text style={styles.profileText}>Date of Birth: <Text style={styles.profileValue}>{profile.dob}</Text></Text>
        <Text style={styles.profileText}>Email: <Text style={styles.profileValue}>{profile.email}</Text></Text>
        <Text style={styles.profileText}>Phone: <Text style={styles.profileValue}>{profile.phone}</Text></Text>
        <Text style={styles.profileText}>Address: <Text style={styles.profileValue}>{profile.address}</Text></Text>
     
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  profileContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  profileText: {
    fontSize: 16,
    marginVertical: 8,
    color: '#555',
  },
  profileValue: {
    fontWeight: 'bold',
    color: '#333',
  },
});
