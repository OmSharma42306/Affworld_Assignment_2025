import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL);

// sending request to backend to get all the tasks
export const getTasks = async () => {
  const token = localStorage.getItem("token")
  console.log("Token",token)
  const response = await axios.get(`${API_URL}/tasks`,{
    headers:{
      Authorization : `Bearer ${token}`
    }
  });
  console.log("Token",token)
  console.log(response)
  return response.data;
};

// sending request to backend to create a task
export const createTask = async (name: string, description: string) => {
  const token = localStorage.getItem("token")
  const response = await axios.post(`${API_URL}/tasks`, { name, description },{
    headers:{
      Authorization: `Bearer ${token}`
    }
  });
  console.log(response.data.task)
  return response.data.task;
};

// sending request to backend to update the task
export const updateTaskStatus = async (taskId: string, status: string) => {
  const token = localStorage.getItem("token")
  const response = await axios.put(`${API_URL}/tasks/${taskId}`, { status },{
    headers:{
      Authorization:`Bearer ${token}`
    }
  });
  console.log(response.data);
  return response.data;
};

// sending request to backend to delete the task
export const deleteTask = async (taskId: string) => {
  const token = localStorage.getItem("token")
  const response = await axios.delete(`${API_URL}/tasks/${taskId}`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};