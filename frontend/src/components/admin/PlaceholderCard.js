import React from 'react';

const PlaceholderCard = ({ title, description }) => {
    return (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">{description}</p>
            <button
                className="inline-flex items-center mt-4 text-blue-600 hover:underline"
                onClick={() => alert('Go to ' + title)}
            >
                Go to {title}
            </button>
        </div>
    );
};

export default PlaceholderCard;
