import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import PublicPhotos from '../components/PublicPhotos';
import SearchResultsPage from '../pages/SearchResultsPage';
import Sidebar from '../components/Sidebar';
import Navbar from'../components/NavBar';

const UserLayout = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col ml-64">
                <Navbar />
                <div className="flex-1 mt-16 p-4">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/public-photos" element={<PublicPhotos />} />
                        <Route path="/search" element={<SearchResultsPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default UserLayout;
