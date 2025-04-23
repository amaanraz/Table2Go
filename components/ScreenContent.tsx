import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer }      from '@react-navigation/native';
import { Ionicons }                 from '@expo/vector-icons';

import {Request}        from './Request';        // default-export
import ManualControl  from './ManualControl';  // default-export
import FoxgloveScreen from './FoxgloveScreen'; // default-export

const Tab = createBottomTabNavigator();

export default function ScreenContent() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
              Request: focused ? 'car-sport'       : 'car-sport-outline',
              Manual:  focused ? 'game-controller' : 'game-controller-outline',
              Map:     focused ? 'map'             : 'map-outline',
            };
            return <Ionicons name={icons[route.name]} size={size} color={color} />;
          },
          tabBarActiveTintColor:   '#007bff',
          tabBarInactiveTintColor: '#6c757d',
        })}
      >
        <Tab.Screen name="Request" component={Request} />
        <Tab.Screen name="Manual"  component={ManualControl} />
        <Tab.Screen name="Map"     component={FoxgloveScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
