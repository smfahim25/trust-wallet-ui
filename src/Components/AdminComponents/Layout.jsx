import React from 'react';
import { Route, Routes } from 'react-router';
import AdminDashboard from './AdminDashboard/AdminDashboard';

const Layout = () => {
    return (
        <div>
            <h2>Admin Layout is here</h2>
            <Routes>
                <Route path='/' element={<AdminDashboard/>}></Route>
            </Routes>
        </div>
    );
};

export default Layout;