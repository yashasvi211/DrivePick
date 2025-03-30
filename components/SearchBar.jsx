import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';

export default function SearchBar() {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.searchContainer}>
      <TextInput
        mode="outlined"
        placeholder="Search cars by brand, model..."
        style={styles.searchInput}
        outlineStyle={styles.searchOutline}
        left={<TextInput.Icon icon='magnify' style={styles.searchIcon} />}
        right={<TextInput.Icon icon='microphone' onPress={() => console.log('Mic pressed')} />}
        
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
