import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Điều này quan trọng để gửi cookie với yêu cầu
});

export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/token/', credentials);
        return response;
    } catch (error) {
        console.error('Login failed:', error);
        throw error; // Rethrow error so that it can be caught in the calling function
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/register/', userData);
        return response;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error; // Rethrow error so that it can be caught in the calling function
    }
};
