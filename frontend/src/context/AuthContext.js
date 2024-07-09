// src/context/AuthContext.js

import React, { createContext, useState } from 'react';
import axios from 'axios';
import { loginUser, registerUser } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const register = async (userData) => {
        try {
            const response = await registerUser(userData);
            setUser(response.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Đăng ký thất bại', error);
            setIsAuthenticated(false);
        }
    };

    const login = async (credentials) => {
        try {
            const response = await loginUser(credentials);
            const token = response.data.access;
            localStorage.setItem('token', token); // Lưu token vào localStorage
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Thiết lập token cho các yêu cầu tiếp theo

            // Giả định user data được trả về trong response khi login thành công
            const userData = {
                username: credentials.username, // Thay đổi theo dữ liệu trả về thực tế
                // Add more fields if necessary
            };

            setUser(userData);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Đăng nhập thất bại', error);
            setIsAuthenticated(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
