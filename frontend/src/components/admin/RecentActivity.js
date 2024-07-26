import React from 'react';

const RecentActivity = ({ activities, onEdit, onDelete }) => {
    return (
        <div className="mt-8">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
            <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                        <th scope="col" className="px-6 py-4">Username</th>
                        <th scope="col" className="px-6 py-4">Last Login</th>
                        <th scope="col" className="px-6 py-4">Date Joined</th>
                        <th scope="col" className="px-6 py-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {activities.map(activity => (
                        <tr className="border-b dark:border-neutral-500" key={activity.username}>
                            <td className="px-6 py-4">{activity.username}</td>
                            <td className="px-6 py-4">{activity.last_login}</td>
                            <td className="px-6 py-4">{activity.date_joined}</td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => onEdit(activity.username)}
                                    className="text-blue-500 hover:underline mr-4"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(activity.username)}
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecentActivity;
