import React, { useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 40) / 2;

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        {/* Google Drive-style Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            mode="outlined"
            placeholder="Search cars by brand, model..."
            style={styles.searchInput}
            outlineStyle={styles.searchOutline}
            left={<TextInput.Icon icon="magnify" style={styles.searchIcon} />}
            right={
              <TextInput.Icon 
                icon="microphone" 
                onPress={() => console.log('Mic pressed')} 
              />
            }
            theme={{
              roundness: 30,
              colors: {
                primary: theme.colors.primary, // Visible outline on focus
                background: '#ffffff',
                outline: 'transparent',        // Hides outline when unfocused
              }
            }}
            dense
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            caretHidden={!isFocused}  // Hide caret when not focused
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: '#ffffff',
    fontSize: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    width: '100%',
    borderRadius: 30,
  },
  searchOutline: {
    borderRadius: 30,
    borderWidth: 0,
  },
  searchIcon: {
    marginLeft: 8,
    marginTop: 8,
  },
});
