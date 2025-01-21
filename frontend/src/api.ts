import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL);
export const getTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`);
  console.log(response)
  return response.data;
};

export const createTask = async (name: string, description: string) => {
  const response = await axios.post(`${API_URL}/tasks`, { name, description });
  console.log(response.data.task)
  return response.data.task;
};

export const updateTaskStatus = async (taskId: string, status: string) => {
  const response = await axios.put(`${API_URL}/tasks/${taskId}`, { status });
  console.log(response.data);
  return response.data;
};

export const deleteTask = async (taskId: string) => {
  const response = await axios.delete(`${API_URL}/tasks/${taskId}`);
  return response.data;
};