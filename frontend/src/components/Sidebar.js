// src/components/Sidebar.js

import React from 'react';

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-white fixed top-0 left-0 flex flex-col">
            <div className="flex items-center justify-center h-16 bg-red-500 text-white font-bold text-2xl">
                photoshare
            </div>
            <div className="flex flex-col p-4 space-y-4">
                <button className="text-red-500 font-bold">Dành cho bạn</button>
                <button className="text-gray-700">Đang Follow</button>
                <button className="text-gray-700">Hồ sơ</button>
            </div>
            <div className="mt-auto p-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded">Đăng nhập</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded">Đăng ký </button>
            </div>
        </div>
    );
};

export default Sidebar;
