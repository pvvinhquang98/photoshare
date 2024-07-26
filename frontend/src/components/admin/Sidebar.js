import React from 'react';

const Sidebar = () => {
    return (
        <aside className="w-64 p-6 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h1 className="mb-8 text-4xl font-extrabold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <nav>
                <ul className="flex flex-col space-y-4">
                    <li><a href="/user-management" className="text-gray-900 dark:text-white hover:underline">User Management</a></li>
                    <li><a href="/statistics" className="text-gray-900 dark:text-white hover:underline">Statistics</a></li>
                    <li><a href="/settings" className="text-gray-900 dark:text-white hover:underline">Settings</a></li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
