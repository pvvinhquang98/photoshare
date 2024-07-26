import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/admin/login/', {
                username,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            localStorage.setItem('adminToken', response.data.token);
            window.location.href = '/admin/dashboard';
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 bg-white rounded shadow dark:bg-gray-800">
                <h1 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-white">Admin Login</h1>
                {error && <p className="mb-4 text-red-600">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-400" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-3 py-2 text-gray-700 border rounded dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-400" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 text-gray-700 border rounded dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Login</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
