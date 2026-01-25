/**
 * Navigation Type Definitions
 */

import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Dashboard: undefined;
  Tasks: { date: string };
  AddTaskModal: { date: string };
  Charts: undefined;
};

export type DashboardScreenProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;
export type TasksScreenProps = NativeStackScreenProps<RootStackParamList, 'Tasks'>;
export type AddTaskModalScreenProps = NativeStackScreenProps<RootStackParamList, 'AddTaskModal'>;
export type ChartsScreenProps = NativeStackScreenProps<RootStackParamList, 'Charts'>;

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
