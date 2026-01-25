/**
 * Habito - Daily Habit & Task Tracker
 * Root App Component
 */

import React, { useEffect, useState } from 'react';
import { AppProvider } from './src/context';
import { RootNavigator } from './src/navigation';
import { initDatabase } from './src/services/database';
import { View, Text, ActivityIndicator } from 'react-native';

function App() {
  const [dbReady, setDbReady] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      console.log('[App] Initializing application...');
      await initDatabase();
      console.log('[App] Database initialized successfully');
      setDbReady(true);
    } catch (error) {
      console.error('[App] Failed to initialize application:', error);
      setDbError(
        error instanceof Error ? error.message : 'Unknown error occurred'
      );
    }
  };

  // Show loading screen while initializing
  if (!dbReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        {dbError ? (
          <>
            <Text style={{ fontSize: 18, color: 'red', marginBottom: 16 }}>
              Initialization Error
            </Text>
            <Text style={{ fontSize: 14, color: '#666', textAlign: 'center' }}>
              {dbError}
            </Text>
          </>
        ) : (
          <>
            <ActivityIndicator size="large" color="#667FEA" />
            <Text style={{ marginTop: 16, fontSize: 16, color: '#666' }}>
              Loading Habito...
            </Text>
          </>
        )}
      </View>
    );
  }

  return (
    <AppProvider>
      <RootNavigator />
    </AppProvider>
  );
}

export default App;
