import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Login = ({ onClose, onSwitchToRegister }) => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({ username, password });
        onClose();
    };

    return (
        <div className="flex justify-center items-center h-full">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Đăng nhập</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Tên đăng nhập</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Mật khẩu</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Đăng nhập
                </button>
                <p className="mt-4 text-center">
                    Chưa có tài khoản? <span onClick={onSwitchToRegister} className="text-blue-500 cursor-pointer">Đăng ký</span>
                </p>
            </form>
        </div>
    );
};

export default Login;
