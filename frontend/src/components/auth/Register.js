// src/components/auth/Register.js

import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Register = ({ onClose, onSwitchToLogin }) => {
    const { register } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ username, email, password });
            alert('Đăng ký thành công');
            onClose();
        } catch (err) {
            setError('Đăng ký thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <div className="flex justify-center items-center h-full">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Đăng ký</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700">Tên đăng nhập</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Mật khẩu</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Đăng ký
                </button>
                <p className="mt-4 text-center">
                    Đã có tài khoản? <span onClick={onSwitchToLogin} className="text-blue-500 cursor-pointer">Đăng nhập</span>
                </p>
            </form>
        </div>
    );
};

export default Register;
