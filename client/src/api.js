import api from './api/axios';

export const getTodos = async () => {
    const response = await api.get('/todos');
    return response.data;
};

export const createTodo = async (text) => {
    const response = await api.post('/todos', { text });
    return response.data;
};

export const updateTodo = async (id, updates) => {
    const response = await api.put(`/todos/${id}`, updates);
    return response.data;
};

export const deleteTodo = async (id) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
};
