// app/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ExpenseProvider } from '../src/context/ExpenseContext';
import "../global.css"
import 'expo-router/entry'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ExpenseProvider>
        <Tabs>
          <Tabs.Screen
            name="index"
            options={{ title: 'Home' }}
          />
          <Tabs.Screen
            name="add"
            options={{ title: 'Add' }}
          />
          <Tabs.Screen
            name="stats"
            options={{ title: 'Stats' }}
          />
        </Tabs>
      </ExpenseProvider>
    </SafeAreaProvider>
  );
}
