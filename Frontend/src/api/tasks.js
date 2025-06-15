import axios from 'axios';
import Config from '../Config';

const API_URL = Config.API_URL;

export const getTasks = async (after) => {
  const res = await axios.get(`${API_URL}/tasks`, {
    params: { after },
  });
  return res.data;
};

export const simulateTasks = () =>
    axios.post(`${API_URL}/simulate`);


export const DeleteAllTasks = () =>
    axios.delete(`${API_URL}/tasks`);