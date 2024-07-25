import axios from 'axios';

export const loginUser = async (credentials) => {
    const response = await axios.post('http://127.0.0.1:8000/api/token/', credentials);
    return response;
};

export const registerUser = async (userData) => {
    const response = await axios.post('http://127.0.0.1:8000/api/register/', userData);
    return response;
};
