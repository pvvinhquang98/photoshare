import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminLogin from '../components/admin/AdminLogin';

const AdminLayout = () => {
    return (
        <div className="flex">
            <div className="flex-1 flex flex-col">
                <div className="flex-1 mt-16 p-4">
                    <Routes>
                        <Route path="/login" element={<AdminLogin />} />
                        <Route path="/dashboard" element={<AdminDashboard />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
