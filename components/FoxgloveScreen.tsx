// components/FoxgloveScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function FoxgloveScreen() {
  const RPI = '192.168.1.211';  // ← your Pi’s IP
  const foxgloveURL =
    `https://studio.foxglove.dev/` +
    `?source=rosbridge&ws=ws://${RPI}:8765`;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ uri: foxgloveURL }}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview:   { flex: 1 },
});
