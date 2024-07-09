// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
