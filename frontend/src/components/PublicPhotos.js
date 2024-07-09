
import React, { useState, useEffect } from 'react';
import { getPublicPhotos } from '../services/api';

const PublicPhotos = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPublicPhotos = async () => {
            try {
                const data = await getPublicPhotos();
                setPhotos(data);
            } catch (error) {
                console.error('Error fetching public photos:', error);
            }
        };

        fetchPublicPhotos();
    }, []);


    return (
        <div className="flex-1 ml-64 p-4">
            {photos.map(photo => (
                <div key={photo.id} className="bg-white rounded-md shadow-md p-4 mb-4">
                    <div className="flex items-center space-x-4">
                        <img
                            src=""//{photo.user.profile.avatar} // assuming there is a profile avatar
                            alt="avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <div className="text-gray-900 font-bold">{photo.user.username}</div>
                            <div className="text-gray-500">{photo.caption}</div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <img
                            src={photo.image}
                            alt="public_photo"
                            className="w-full rounded-md"
                        />
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                        <div className="flex space-x-2">
                            <button className="text-gray-600 hover:text-red-500">
                                <i className="fas fa-heart"></i> {photo.likes}
                            </button>
                            <button className="text-gray-600 hover:text-blue-500">
                                <i className="fas fa-comment"></i> {photo.comments}
                            </button>
                        </div>
                        <button className="text-gray-600 hover:text-yellow-500">
                            <i className="fas fa-share"></i> {photo.shares}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PublicPhotos;
