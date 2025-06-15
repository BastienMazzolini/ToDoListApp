import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, FlatList, View } from 'react-native';
import { StyleSheet } from 'react-native';

import { getTasks } from '../api/tasks';

import io from 'socket.io-client';

import Config from '../Config';
import ButtonDelete from '../components/ButtonDelete';  
import ButtonSimulate from '../components/ButtonSimulate';
import TaskItem from '../components/TaskItem';

export default function TaskListScreen() {
    const [tasks, setTasks] = useState([]);
    const lastDateRef = useRef(null);
    const socketRef = useRef(null);

    const fetchNewTasks = useCallback(async () => {
        try {
            const res = await getTasks(lastDateRef.current);
            console.log('Get Task', lastDateRef.current);
            if (res.length > 0) {
                setTasks(prev => [...prev, ...res]);
                lastDateRef.current = res[res.length - 1].createdAt;
            }
        } catch (err) {
            console.error('Get Task Error', err);
        }
    }, []);

    useEffect(() => {

        socketRef.current = io(Config.API_URL);
        socketRef.current.on('taskCreated', () => {
            fetchNewTasks();
        });

        const interval = setInterval(() => {
            socketRef.current.emit('checkNewTasks', lastDateRef.current);
        }, 5000);

        return () => {
            clearInterval(interval);
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [fetchNewTasks]);


    return (
        <View style={{ flex: 1}}>
             <View style={styles.TopContainer}>
                <View style={styles.TopButton}>
                    <ButtonSimulate />
                    <ButtonDelete />
                </View>
                
            </View>
            <View style={styles.MiddleContainer}>
                    <FlatList
                data={tasks}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => <TaskItem task={item} />}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    TopContainer: {
        paddingTop: 40,
        alignItems: 'center',
    },
    MiddleContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    TopButton: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        gap: 10,
        padding: 10,

    },
  });
