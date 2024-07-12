import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { AuthContext } from '../context/AuthContext';
import Login from './auth/Login'; // Import Login
import Register from './auth/Register'; // Import Register

const PublicPhotos = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [comment, setComment] = useState('');
    const [activeComment, setActiveComment] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    useEffect(() => {
        const fetchPublicPhotos = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/public-photos/');
                setPhotos(response.data);
            } catch (error) {
                console.error('Error fetching public photos:', error);
            }
        };

        fetchPublicPhotos();
    }, []);

    const defaultAvatar = 'https://via.placeholder.com/40';

    const handlePhotoClick = (photo) => {
        setSelectedPhoto(photo);
    };

    const handleCloseModal = () => {
        setSelectedPhoto(null);
        setShowLoginModal(false);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }

        console.log('Comment submitted:', comment);
        setComment('');
    };

    const handleActiveComment = (photoId) => {
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }

        if (activeComment === photoId) {
            setActiveComment(null);
        } else {
            setActiveComment(photoId);
        }
    };

    const handleLike = (photoId) => {
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }

        console.log('Liked photo:', photoId);
    };

    const handleShare = (photoId) => {
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }

        console.log('Shared photo:', photoId);
    };

    const switchToRegister = () => {
        setShowRegister(true);
    };

    const switchToLogin = () => {
        setShowRegister(false);
    };

    return (
        <div className="flex-1 ml-64 p-4 mt-16">
            {photos.map(photo => (
                <div key={photo.id} className="bg-white rounded-md shadow-md p-4 mb-4">
                    <div className="flex items-center space-x-4">
                        <img
                            src={photo.user?.profile?.avatar || defaultAvatar}
                            alt="avatar"
                            className="w-8 h-8 rounded-full"
                        />
                        <div className="text-gray-900 font-bold">
                            {photo.user?.profile?.name ? photo.user.profile.name : "testuser"}
                        </div>
                    </div>
                    <div className="text-gray-500 mt-2">{photo.caption}</div>
                    <div className="mt-4 cursor-pointer" onClick={() => handlePhotoClick(photo)}>
                        <img
                            src={photo.image}
                            alt="public_photo"
                            className="w-full h-auto object-cover rounded-md"
                        />
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                        <div className="flex space-x-2">
                            <button className="text-gray-600 hover:text-red-500" onClick={() => handleLike(photo.id)}>
                                <i className="fas fa-heart"></i> Thích
                            </button>
                            <button className="text-gray-600 hover:text-blue-500" onClick={() => handleActiveComment(photo.id)}>
                                <i className="fas fa-comment"></i> Bình luận
                            </button>
                            <button className="text-gray-600 hover:text-yellow-500" onClick={() => handleShare(photo.id)}>
                                <i className="fas fa-share"></i> Chia sẻ
                            </button>
                        </div>
                    </div>
                    {activeComment === photo.id && (
                        <div className="mt-4">
                            <textarea
                                value={comment}
                                onChange={handleCommentChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Thêm bình luận..."
                            />
                            <button
                                onClick={handleCommentSubmit}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Gửi
                            </button>
                        </div>
                    )}
                </div>
            ))}

            {selectedPhoto && (
                <Modal
                    isOpen={true}
                    onRequestClose={handleCloseModal}
                    contentLabel="Photo Modal"
                    className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                    shouldCloseOnOverlayClick={true}
                >
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-3xl sm:w-full" onClick={handleCloseModal}>
                        <div className="bg-white p-4" onClick={e => e.stopPropagation()}>
                            <img
                                src={selectedPhoto.image}
                                alt="public_photo"
                                className="w-full h-auto object-cover"
                            />
                            <div className="p-4">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={selectedPhoto.user?.profile?.avatar || defaultAvatar}
                                        alt="avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <div className="text-gray-900 font-bold">
                                        {selectedPhoto.user?.profile?.name ? selectedPhoto.user.profile.name : "testuser"}
                                    </div>
                                </div>
                                <div className="text-gray-500 mt-2">{selectedPhoto.caption}</div>
                                <div className="mt-4">
                                    <textarea
                                        value={comment}
                                        onChange={handleCommentChange}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                        placeholder="Thêm bình luận..."
                                    />
                                    <button
                                        onClick={handleCommentSubmit}
                                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        Gửi
                                    </button>
                                </div>
                                <div className="mt-4 flex justify-between items-center">
                                    <div className="flex space-x-2">
                                        <button className="text-gray-600 hover:text-red-500" onClick={() => handleLike(selectedPhoto.id)}>
                                            <i className="fas fa-heart"></i> Thích
                                        </button>
                                        <button className="text-gray-600 hover:text-yellow-500" onClick={() => handleShare(selectedPhoto.id)}>
                                            <i className="fas fa-share"></i> Chia sẻ
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
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
        </div>
    );
};

export default PublicPhotos;
