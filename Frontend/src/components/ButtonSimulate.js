import { View, Button, StyleSheet } from 'react-native';
import { simulateTasks } from '../api/tasks';

export default function ButtonSimulate() {

    const handleSimulate = async () => {
        console.log('Simulate');
        await simulateTasks();
        
    };

    return (
        <Button title="Simulate" onPress={handleSimulate} />
    );
}

