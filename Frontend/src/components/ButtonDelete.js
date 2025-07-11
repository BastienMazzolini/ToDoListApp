import { View, Button, StyleSheet } from 'react-native';
import { DeleteAllTasks } from '../api/tasks';

export default function ButtonDelete() {

    const handleDelete = async () => {
        await DeleteAllTasks();
    };
  return (
      <Button title="Delete all tasks" onPress={handleDelete} />
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    padding: 10,
  },
});