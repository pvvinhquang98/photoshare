// src/pages/HomePage.js

import React, { useContext } from 'react';
import Sidebar from '../components/Sidebar';
import PublicPhotos from '../components/PublicPhotos';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div className="flex">
            <Sidebar />
           {isAuthenticated && <PublicPhotos />}
        </div>
    );
};

export default HomePage;
