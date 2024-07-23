import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const SearchResultsPage = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [photos, setPhotos] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const endpoint = isAuthenticated
                    ? `http://127.0.0.1:8000/api/photos/?search=${query}`
                    : `http://127.0.0.1:8000/api/public-photos/?search=${query}`;
                const response = await axios.get(endpoint);
                setPhotos(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        if (query) {
            fetchSearchResults();
        }
    }, [query, isAuthenticated]);

    return (
        <div className="flex-1 ml-64 p-4 mt-16">
            {photos.length === 0 ? (
                <div className="text-gray-500">Không tìm thấy kết quả nào cho "{query}"</div>
            ) : (
                photos.map(photo => (
                    <div key={photo.id} className="bg-white rounded-md shadow-md p-4 mb-4">
                        <div className="text-gray-900 font-bold">{photo.user?.profile?.name || "testuser"}</div>
                        <div className="text-gray-500 mt-2">{photo.caption}</div>
                        <div className="mt-4">
                            <img
                                src={photo.image}
                                alt="public_photo"
                                className="w-full rounded-md"
                            />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default SearchResultsPage;
