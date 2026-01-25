/**
 * Habito - Daily Habit & Task Tracker
 * Root App Component
 */

import React from 'react';
import { AppProvider } from '@/context';
import { RootNavigator } from '@/navigation';

function App() {
  return (
    <AppProvider>
      <RootNavigator />
    </AppProvider>
  );
}

export default App;
