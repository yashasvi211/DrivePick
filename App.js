import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Import screens
import HomeScreen from './screens/HomeScreen';
import AiScreen from './screens/AiScreeen';
import ProfileScreen from './screens/ProfileScreen';
import ExploreScreen from './screens/ExploreScreen';
import CarDetailScreen from './screens/CarDetailScreen';
import CompareScreen from './screens/CompareScreen';
import CarComparisonDetails from './screens/CarComparisonDetailsScreen';
      import NewsScreen from './screens/NewsScreen';
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

// Stack for Home and related screens
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
      <Stack.Screen
        name="CarDetailScreen"
        component={CarDetailScreen}
        options={{ title: 'Car Details' }}
      />
      <Stack.Screen
        name="CompareScreen"
        component={CompareScreen}
        options={{ title: 'Compare Cars' }}
      />
      <Stack.Screen
        name="CarComparisonDetails"
        component={CarComparisonDetails}
        options={{ title: 'Car Comparison Details' }}
      />
      <Stack.Screen
        name="UpcomingScreen"
        component={require('./screens/UpcomingScreen').default}
        options={{ title: 'Upcoming Cars' }}
      />


 
<Stack.Screen 
  name="NewsScreen" 
  component={NewsScreen} 
  options={{ title: 'Car News' }} 
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
            component={HomeStack}
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
