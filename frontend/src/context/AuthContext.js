import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { loginUser, registerUser } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

   const register = async (userData) => {
        try {
            const response = await registerUser(userData);
            setUser(response.data.user);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Đăng ký thất bại', error);
            throw error;
        }
    };

    const login = async (credentials) => {
        try {
            const response = await loginUser(credentials);
            const token = response.data.access;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Fetch user profile after login
            const userProfileResponse = await axios.get('http://127.0.0.1:8000/api/auth/user/');
            setUser(userProfileResponse.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Đăng nhập thất bại', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        setIsAuthenticated(false);
        window.location.reload();
    };

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //         axios.get('http://127.0.0.1:8000/api/auth/user/')
    //             .then(response => {
    //                 setUser(response.data);
    //                 setIsAuthenticated(true);
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching user:', error);
    //                 setIsAuthenticated(false);
    //             });
    //     }
    // }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
