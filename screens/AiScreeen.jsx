import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AiScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Screen</Text>
      <Text>This is where AI features will be displayed.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
