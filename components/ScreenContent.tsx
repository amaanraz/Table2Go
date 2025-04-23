// components/ScreenContent.tsx
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer }  from '@react-navigation/native';
import { Ionicons }             from '@expo/vector-icons';
import ROSLIB                   from 'roslib';
import FoxgloveScreen           from './FoxgloveScreen';


// ─── 1) CREATE ROS + PUBLISHER AT MODULE‐LEVEL ─────────────────────────
// const ros = new ROSLIB.Ros({ url: 'ws://192.168.1.211:9090' });

// ros.on('connection',   () => console.log('🔗 Connected to ROS'));
// ros.on('error',        (e) => console.log('❌ ROS error:', e));
// ros.on('close',        () => console.log('❌ ROS connection closed'));

// const twistPub = new ROSLIB.Topic({
//   ros,
//   name: '/cmd_vel',
//   messageType: 'geometry_msgs/Twist',
// });
// ────────────────────────────────────────────────────────────────────────

// 1) Re‑add your Request component
const Request = () => {
  const handleButtonPress = () => {
    console.log('Bring to me pressed');
  };
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-bold mb-2">Current Distance: 10m</Text>
      <Text className="text-lg font-bold mb-6">ETA: 2 mins</Text>
      <TouchableOpacity onPress={handleButtonPress}>
        <Text className="p-4 bg-blue-500 text-white rounded text-lg">
          Bring to me
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const ManualControl = () => {
  const handleDirectionChange = (dir: 'up'|'down'|'left'|'right') => {
    console.log(`Direction changed to: ${dir}`);

    const mapping = {
      up:    { x: 0.3,  z: 0 },
      down:  { x:-0.3,  z: 0 },
      left:  { x: 0,    z: 1.0 },
      right: { x: 0,    z:-1.0 },
    }[dir];

    const twist = new ROSLIB.Message({
      linear:  { x: mapping.x, y: 0, z: 0 },
      angular: { x: 0, y: 0, z: mapping.z },
    });

    //twistPub.publish(twist);        // ← now twistPub is defined!
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-bold mb-32">Manual Control</Text>
      <View className="flex-row">
        <TouchableOpacity onPress={() => handleDirectionChange('left')}>
          <Text className="p-4 bg-gray-200 rounded text-4xl">←</Text>
        </TouchableOpacity>
        <View className="mx-4 -mt-24">
          <TouchableOpacity onPress={() => handleDirectionChange('up')}>
            <Text className="p-4 bg-gray-200 rounded text-4xl">↑</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => handleDirectionChange('right')}>
          <Text className="p-4 bg-gray-200 rounded text-4xl">→</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-8">
        <TouchableOpacity onPress={() => handleDirectionChange('down')}>
          <Text className="p-4 bg-gray-200 rounded text-4xl">↓</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Tab = createBottomTabNavigator();

export const ScreenContent = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // 2) icon map now has three entries
        tabBarIcon: ({ focused, color, size }) => {
          const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
            Request: focused ? 'car-sport'         : 'car-sport-outline',
            Manual:  focused ? 'game-controller'   : 'game-controller-outline',
            Map:     focused ? 'map'               : 'map-outline',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor:   '#007bff',
        tabBarInactiveTintColor: '#6c757d',
      })}
    >
      {/* 3) Add Request as the first tab */}
      <Tab.Screen name="Request" component={Request} />
      <Tab.Screen name="Manual"  component={ManualControl} />
      <Tab.Screen name="Map"     component={FoxgloveScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);