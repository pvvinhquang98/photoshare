import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import axiosInstance from '../../axiosInstance';

const AdminDashboard = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axiosInstance.get('http://127.0.0.1:8000/api/admin/recent-activity/');
                setActivities(response.data);
            } catch (error) {
                console.error('Failed to fetch recent activities', error);
            }
        };

        fetchActivities();
    }, []);

    const handleEdit = (username) => {
        console.log(`Edit user: ${username}`);
    };

    const handleDelete = async (username) => {
        console.log(`Delete user: ${username}`);
        try {
            await axiosInstance.delete(`http://127.0.0.1:8000/api/admin/users/${username}/`);
            setActivities(activities.filter(activity => activity.username !== username));
        } catch (error) {
            console.error('Failed to delete user', error);
        }
    };

    return (
        <div className="flex h-full bg-gray-100 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 p-6">
                <MainContent onEdit={handleEdit} onDelete={handleDelete} />
            </div>
        </div>
    );
};

export default AdminDashboard;
