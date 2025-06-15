import { View, Text, StyleSheet } from 'react-native';

const statusColors = {
    todo: 'grey',
    in_progress: 'lightblue',
    done: 'green',
};

export default function TaskItem({ task }) {
    return (
        <View style={[styles.container, {borderLeftColor: statusColors[task.status]}]}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.status}>{task.status}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding:12,
        borderLeftWidth: 5,
        marginVertical: 4,
        backgroundColor: '#FCFAFA',
        borderRadius:8,
    },
    title: {
        fontSize: 16,
    },
    status: {
        fontSize: 12,
        color: '#666',
    },
});