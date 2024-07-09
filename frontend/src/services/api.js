// src/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Đặt URL API của bạn ở đây

// token cho axios
const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
// Đăng ký người dùng
export const registerUser = (userData) => {
    return axios.post(`${API_URL}/register/`, userData);
};
// Đăng nhập người dùng
export const loginUser = (credentials) => {
    return axios.post(`${API_URL}/token/`, credentials);
};
export const getPublicPhotos = () => {
    return axios.get(`${API_URL}/public-photos/`);
}