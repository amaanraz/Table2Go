import React from 'react';
import { StatusBar } from 'expo-status-bar';
import ScreenContent from './components/ScreenContent';  // default-export
import './global.css';

export default function App() {
  return (
    <>
      <ScreenContent />
      <StatusBar style="auto" />
    </>
  );
}
