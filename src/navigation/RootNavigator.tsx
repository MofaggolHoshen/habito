/**
 * Root Navigation Navigator
 * Main stack navigation for the app
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './types';

import DashboardScreen from '@/screens/DashboardScreen';
import TasksScreen from '@/screens/TasksScreen';
import AddTaskModalScreen from '@/screens/AddTaskModalScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Dashboard - Entry point */}
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            animationTypeForReplace: 'pop',
          }}
        />

        {/* Tasks - View and edit tasks for a date */}
        <Stack.Screen
          name="Tasks"
          component={TasksScreen}
        />

        {/* Add Task Modal - Create new tasks */}
        <Stack.Screen
          name="AddTaskModal"
          component={AddTaskModalScreen}
          options={{
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
