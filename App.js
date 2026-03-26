import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { TodoProvider } from './src/context/TodoContext';
import HomeScreen from './src/screens/HomeScreen';

const AppContent = () => {
  const { isDarkMode } = useTheme();
  return (
    <>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} translucent />
      <HomeScreen />
    </>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <TodoProvider>
          <AppContent />
        </TodoProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
