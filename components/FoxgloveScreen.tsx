// components/FoxgloveScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function FoxgloveScreen() {
  const RPI = '192.168.1.211';  // ← your Pi’s IP
  const foxgloveURL =
    `https://studio.foxglove.dev/` +
    `?source=rosbridge&ws=ws://${RPI}:8765`;
  //const url = 'https://app.foxglove.dev/ohm-alone-1/view?ds=foxglove-websocket&ds.url=ws%3A%2F%2F192.168.1.211%3A8765&layoutId=lay_0dc1kTMufTABc2aT';
  //const foxgloveURL1 = 'http://192.168.1.211:8765/share/AbCDeFGhIjKl';

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ uri: foxgloveURL }}
        javaScriptEnabled
        domStorageEnabled
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview:   { flex: 1 },
});
