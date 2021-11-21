// Enables strict mode: Strict mode makes it easier to write "Secure" JavaScript
'use strict'

// React import
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Library imports (Alphabetical order)

// Absolute imports from the project (Alphabetical order)
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';

// Relative imports (Alphabetical order)

// Import * as

// Import ‘./<some file>.<some extension>


const Stack = createStackNavigator();

export default function App ({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            //headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            gestureEnabled: false,
            headerStyle: {
              backgroundColor: '#2B3647',
            },
            headerTintColor: '#ECF2F6',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
