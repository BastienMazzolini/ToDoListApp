import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TaskListScreen from './src/screens/TaskListScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <TaskListScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
