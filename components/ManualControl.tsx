import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import ROSLIB from 'roslib';  // uncomment when you hook up rosbridge
// and create `ros` + `twistPub` at module level like we discussed

export default function ManualControl() {
  // 1) refs to hold our ROS connection + publisher
  const rosRef = useRef<ROSLIB.Ros>();
  const twistPubRef = useRef<ROSLIB.Topic>();

  useEffect(() => {
    // 2a) create the Ros connection
    //const ros = new ROSLIB.Ros();
    const ros = new ROSLIB.Ros({
      url: 'ws://192.168.1.211:9090'
    });
    rosRef.current = ros;

    // 2b) attach handlers so errors don’t crash
    ros.on('connection', () => console.log('🔗 ROS connected'));
    ros.on('error',      (err) => console.error('❌ ROS error:', err));
    ros.on('close',      ()    => console.log('⚠️ ROS connection closed'));

    // 2c) actually connect to rosbridge on your Pi (port 9090)
    //ros.connect('ws://192.168.1.211:9090');

    // 2d) create the publisher on /cmd_vel
    twistPubRef.current = new ROSLIB.Topic({
      ros,
      name: '/cmd_vel',
      messageType: 'geometry_msgs/Twist',
    });

    // cleanup on unmount
    return () => {
      try { ros.close(); } catch {}
    };
  }, []);

  // 3) build & publish a Twist when an arrow is pressed
  const handleDirectionChange = (dir: 'up'|'down'|'left'|'right') => {
    console.log('Direction changed to:', dir);
    if (!twistPubRef.current) {
      console.warn('⚠️ Publisher not ready');
      return;
    }

    const mapping = {
      up:    { x:  0.3, z:  0 },
      down:  { x: -0.3, z:  0 },
      left:  { x:   0,   z:  1 },
      right: { x:   0,   z: -1 },
    }[dir];

    const twist = new ROSLIB.Message({
      linear:  { x: mapping.x, y: 0, z: 0 },
      angular: { x: 0, y: 0, z: mapping.z },
    });

    // 4) publish it
    twistPubRef.current.publish(twist);
    console.log('📨 Published Twist:', twist);
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
              <Text className="p-4 bg-gray-200 rounded text-6xl">↑</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row">
            <TouchableOpacity onPress={() => handleDirectionChange('left')}>
              <Text className="p-4 bg-gray-200 rounded mr-24 text-6xl">←</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDirectionChange('right')}>
              <Text className="p-4 bg-gray-200 rounded ml-6 text-6xl">→</Text>
            </TouchableOpacity>
          </View>
          <View className="mt-6">
            <TouchableOpacity onPress={() => handleDirectionChange('down')}>
              <Text className="p-4 bg-gray-200 rounded text-6xl">↓</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
