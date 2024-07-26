import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/*" element={<UserLayout />} />
                <Route path="/admin/*" element={<AdminLayout />} />
            </Routes>
        </Router>
    );
};

export default App;
