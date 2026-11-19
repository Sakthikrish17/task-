import axios from 'axios';
import { Task } from '../types/task';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>('/tasks.json');
  return response.data;
};