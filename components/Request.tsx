// // components/Request.tsx
// import React, { useRef, useEffect } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import ROSLIB from 'roslib';

// export default function Request() {
//   const rosRef    = useRef<ROSLIB.Ros>();
//   const navClient = useRef<ROSLIB.ActionClient>();

//   useEffect(() => {
//     // 1) Create Ros without URL
//     const ros = new ROSLIB.Ros();
//     rosRef.current = ros;

//     // 2) Attach handlers BEFORE connect
//     ros.on('connection', () => console.log('🔗 ROS connected'));
//     ros.on('error',      (err) => console.error('❌ ROS error:', err));
//     ros.on('close',      ()    => console.log('⚠️ ROS closed'));

//     // 3) Now actually connect
//     ros.connect('ws://192.168.1.211:9090');

//     // 4) Only after ros exists, create your ActionClient
//     navClient.current = new ROSLIB.ActionClient({
//       ros,
//       serverName: '/navigate_to_pose',
//       actionName: 'nav2_msgs/action/NavigateToPose',
//     });

//     // cleanup on unmount
//     return () => {
//       ros.close();
//     };
//   }, []);

//   const handleBringToMe = () => {
//     if (!navClient.current) {
//       console.warn('Nav2 client not ready yet');
//       return;
//     }

//     const goalMsg = {
//       pose: {
//         header: { frame_id: 'map', stamp: { secs: 0, nsecs: 0 } },
//         pose: {
//           position:    { x: 1, y: 0, z: 0 },
//           orientation: { x: 0, y: 0, z: 0, w: 1 },
//         },
//       },
//     };

//     const goal = new ROSLIB.Goal({
//       actionClient: navClient.current,
//       goalMessage:  goalMsg,
//     });

//     // safe send with error catch
//     goal.on('feedback', (f) => console.log('Nav feedback:', f));
//     goal.on('result',   (r) => console.log('Nav result:',   r));

//     try {
//       console.log('📨 Sending nav goal:', goalMsg);
//       goal.send();
//     } catch (e) {
//       console.error('🚨 Failed to send goal:', e);
//     }
//   };

//   return (
//     <View className="flex-1 items-center justify-center bg-white">
//       <Text className="text-lg font-bold mb-4">Bring the robot to me</Text>
//       <TouchableOpacity
//         onPress={handleBringToMe}
//         className="p-4 bg-blue-500 rounded"
//       >
//         <Text className="text-white text-lg">Bring to me</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
// components/Request.tsx
import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ROSLIB from 'roslib';

export const Request = () => {
  // 1) Set up Rosbridge connection & Nav2 ActionClient
  const rosRef   = useRef<ROSLIB.Ros>();
  const navClient= useRef<ROSLIB.ActionClient>();

  useEffect(() => {
    // is it 8765?
    rosRef.current = new ROSLIB.Ros({ url: 'ws://192.168.1.211:8765' });
    navClient.current = new ROSLIB.ActionClient({
      ros:        rosRef.current,
      serverName: '/navigate_to_pose',
      actionName: 'nav2_msgs/action/NavigateToPose',
    });
  }, []);

  // 2) When the button is pressed, send a NavigateToPose goal
  const handleBringToMe = () => {
    const goalMsg = {
      pose: {
        header: { frame_id: 'map', stamp: { secs: 0, nsecs: 0 } },
        pose: {
          position:    { x: 1.0, y: 0.0, z: 0 },
          orientation: { x: 0, y: 0, z: 0, w: 1 },
        },
      },
    };

    const goal = new ROSLIB.Goal({
      actionClient: navClient.current!,
      goalMessage:  goalMsg,
    });

    goal.on('feedback', (feedback) => console.log('Nav feedback:', feedback));
    goal.on('result',   (result)   => console.log('Nav result:', result));

    console.log('Sending NavigateToPose goal →', goalMsg);
    goal.send();
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-bold mb-4">Bring the robot to me</Text>
      <TouchableOpacity
        onPress={handleBringToMe}
        className="p-4 bg-blue-500 rounded"
      >
        <Text className="text-white text-lg">Bring to me</Text>
      </TouchableOpacity>
    </View>
  );
};
