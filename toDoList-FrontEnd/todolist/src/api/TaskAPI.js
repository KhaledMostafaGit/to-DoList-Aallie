const API_URL = 'http://127.0.0.1:8000/api/tasks';
import axios from 'axios';

export const getTasks = async () => {
    try { 
        const res = await axios.get(API_URL);
        return res.data;
    } catch (error) {
        console.log("Error fetching tasks: ",error);
        throw error;
    }
};
export const createTask = async (task) => {
    try {
        const res = await axios.post(API_URL,task)
        console.log(res.data);
    return res.data;
    } catch (error) {
        console.log("Error creating task: ",error);
        throw error;
    }
    
};

export const updateTask = async (id, task) => {
    try {
        const res = await axios.put(`${API_URL}/${id}`,task);
        console.log(res.data);
    return res.data
    } catch (error) {
        console.log("Error updating task: ",error); 
        throw error;
    }
};

export const deleteTask = async (id) => {
    try {
        const res = await axios.delete(`${API_URL}/${id}`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log("Error deleting task: ",error);
        throw error;
        
    }
    
};