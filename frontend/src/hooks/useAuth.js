import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axiosInstance.get('current-user/');
                if (response.data) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                setIsAuthenticated(false);
                window.location.href = '/admin/login';
            }
        };
        checkAuth();
    }, []);

    return isAuthenticated;
};

export default useAuth;
