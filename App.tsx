/**
 * Habito - Daily Habit & Task Tracker
 * Root App Component
 */

import React from 'react';
import { AppProvider } from './src/context';
import { RootNavigator } from './src/navigation';

function App() {
  return (
    <AppProvider>
      <RootNavigator />
    </AppProvider>
  );
}

export default App;
