import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import PlaceholderCard from './PlaceholderCard';
import RecentActivity from './RecentActivity';

const MainContent = ({ onEdit, onDelete }) => {
    const [users, setUsers] = useState([]);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        axiosInstance.get('http://127.0.0.1:8000/api/admin/user-management/')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));

        axiosInstance.get('http://127.0.0.1:8000/api/admin/recent-activity/')
            .then(response => setActivities(response.data))
            .catch(error => console.error('Error fetching activities:', error));
    }, []);

    return (
        <main className="flex-1 p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {users.map(user => (
                    <PlaceholderCard key={user.id} title={user.username} description={user.email} />
                ))}
            </div>
            <RecentActivity activities={activities} onEdit={onEdit} onDelete={onDelete} />
        </main>
    );
};

export default MainContent;
