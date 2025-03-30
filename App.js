import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
//importing screen 
import HomeScreen from './screens/HomeScreen';
import AiScreen from './screens/AiScreeen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          barStyle={{ backgroundColor: '#ffffff' }} // Changed background color to white
          shifting={true} // Disabled shifting animation
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home-outline" color={color} size={24} />
              ),
            }}
          />
          <Tab.Screen
            name="Ask AI"
            component={AiScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="robot-outline" color={color} size={24} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account-outline" color={color} size={24} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
