import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const { login, isAuthenticated } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(credentials);
            if (isAuthenticated) {
                navigate('/'); // Chuyển hướng đến trang chủ sau khi đăng nhập thành công
            }
        } catch (error) {
            setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block mb-2">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                {error && <p className="text-red-500 mt-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 mt-4"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
