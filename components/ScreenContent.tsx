import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

const ManualControl = () => {
  const handleDirectionChange = (newDirection: string) => {
    console.log(`Direction changed to: ${newDirection}`);
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="flex-row items-center justify-center mb-4">
        <Text className="text-lg font-bold">Manual Control</Text>
      </View>
      <View className="flex-row items-center justify-center">
        <View className="flex-col items-center">
          <View className="mb-6 items-center justify-center">
            <TouchableOpacity onPress={() => handleDirectionChange('up')}>
              <Text className="p-4 bg-gray-200 rounded text-9xl">↑</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row">
            <TouchableOpacity onPress={() => handleDirectionChange('left')}>
              <Text className="p-4 bg-gray-200 rounded mr-6 text-9xl">←</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDirectionChange('right')}>
              <Text className="p-4 bg-gray-200 rounded ml-6 text-9xl">→</Text>
            </TouchableOpacity>
          </View>
          <View className="mt-6">
            <TouchableOpacity onPress={() => handleDirectionChange('down')}>
              <Text className="p-4 bg-gray-200 rounded text-9xl">↓</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const Request = () => {
  const handleButtonPress = () => {
    console.log('Single button pressed');
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="mb-4 items-center">
        <Text className="text-lg font-bold">Current Distance: 10m</Text>
        <Text className="text-lg font-bold">Estimated Time to Reach: 2 mins</Text>
      </View>
      <TouchableOpacity onPress={handleButtonPress}>
        <Text className="p-4 bg-gray-400 text-white rounded text-lg">Bring to me</Text>
      </TouchableOpacity>
    </View>
  );
};

const Tab = createBottomTabNavigator();

export const ScreenContent = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'chevron-down-outline';

            if (route.name === 'Manual Control') {
              iconName = focused ? 'game-controller' : 'game-controller-outline';
            } else if (route.name === 'Request') {
              iconName = focused ? 'car-sport' : 'car-sport-outline';
            }

            // Return the icon component
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007bff', // Active tab color
          tabBarInactiveTintColor: '#6c757d', // Inactive tab color
        })}>

        <Tab.Screen name="Request" component={Request} />
        <Tab.Screen name="Manual Control" component={ManualControl} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};