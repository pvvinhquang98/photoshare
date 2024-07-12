import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-md flex items-center justify-between px-4 py-2 z-10">
            <div className="text-2xl font-bold text-red-500">photoshare</div>
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="px-4 py-2 border rounded-md focus:outline-none"
                />
                {isAuthenticated ? (
                    <button
                        onClick={logout}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Đăng xuất
                    </button>
                ) : (
                    <button
                        onClick={() => window.location.href = '/login'}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Đăng nhập
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
