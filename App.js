import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

// Importing screens
import HomeScreen from './screens/HomeScreen';
import AiScreen from './screens/AiScreeen';
import ProfileScreen from './screens/ProfileScreen';
import ExploreScreen from './screens/ExploreScreen';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

// Create a stack navigator for HomeScreen that can navigate to ExploreScreen
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeMain" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ExploreScreen" 
        component={ExploreScreen}
        options={{ title: 'Explore' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          barStyle={{ backgroundColor: '#ffffff' }}
          shifting={true}
        >
          <Tab.Screen
            name="Home"
            component={HomeStack} // Use the stack navigator instead of HomeScreen directly
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