import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import SearchBar from '../components/SearchBar'; // Import SearchBar component

export default function HomeScreen({ navigation }) {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <SearchBar /> 
      
      </ScrollView>
    </SafeAreaView>
  );
}
