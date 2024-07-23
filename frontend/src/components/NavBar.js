import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Login from './auth/Login';
import Register from './auth/Register';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useContext(AuthContext);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [profile, setProfile] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (isAuthenticated && user?.id) {
            const fetchProfile = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/profiles/${user.id}/`);
                    setProfile(response.data);
                } catch (error) {
                    console.error('Error fetching profile:', error);
                }
            };

            fetchProfile();
        }
    }, [isAuthenticated, user]);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?query=${searchQuery}`);
    };

    const handleLoginClick = () => {
        setShowLoginModal(true);
    };

    const handleCloseModal = () => {
        setShowLoginModal(false);
        setShowRegister(false);
    };

    const switchToRegister = () => {
        setShowRegister(true);
    };

    const switchToLogin = () => {
        setShowRegister(false);
    };

    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-2">
            <div ></div>
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm..."
                    className="px-4 py-2 border rounded-md focus:outline-none"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Tìm kiếm
                </button>
            </form>
            {!isAuthenticated ? (
                <button className="text-blue-500" onClick={handleLoginClick}>Đăng nhập</button>
            ) : (
                <div
                    className="relative flex items-center space-x-4 cursor-pointer"
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                >
                    <img
                        src={profile?.avatar || 'https://via.placeholder.com/40'}
                        alt="avatar"
                        className="w-8 h-8 rounded-full"
                    />
                    <div className="text-gray-900 font-bold">
                        Xin chào, {profile?.name ? profile.name : user.username}
                    </div>
                    {showDropdown && (
                        <div className="fixed right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                            <button
                                onClick={() => navigate('/profile')}
                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                            >
                                Trang cá nhân
                            </button>
                            <button
                                onClick={logout}
                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            )}
            {showLoginModal && (
                <Modal
                    isOpen={true}
                    onRequestClose={handleCloseModal}
                    contentLabel="Login Modal"
                    className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                    shouldCloseOnOverlayClick={true}
                >
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-md sm:w-full" onClick={handleCloseModal}>
                        <div className="bg-white p-4" onClick={e => e.stopPropagation()}>
                            {showRegister ? (
                                <Register onClose={handleCloseModal} onSwitchToLogin={switchToLogin} />
                            ) : (
                                <Login onClose={handleCloseModal} onSwitchToRegister={switchToRegister} />
                            )}
                        </div>
                    </div>
                </Modal>
            )}
        </nav>
    );
};

export default Navbar;
