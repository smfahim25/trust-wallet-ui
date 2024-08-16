import React from 'react';
import { Route, Routes } from 'react-router';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import Sidebar from './Sidebar/Sidebar';
import AdminUsers from './AdminUsers/AdminUsers';
import Wallets from './Wallets/Wallets';
import Deposits from './Deposits/Deposits';
import Withdraws from './Withdraws/Withdraws';

const Layout = () => {
    return (
        <div className="text-start">
            <div className="">
                <div className="bg-white shadow rounded-lg grid grid-cols-5">
                    <Sidebar />
                    <div className="h-full ml-2 p-3 space-y-2 col-span-4  bg-gray-100 text-gray-900">
                        <Routes>
                            <Route path='/' element={<AdminDashboard/>}></Route>
                            <Route path='/users' element={<AdminUsers/>}></Route>
                            <Route path='/wallets' element={<Wallets/>}></Route>
                            <Route path='/deposits' element={<Deposits/>}></Route>
                            <Route path='/withdraws' element={<Withdraws/>}></Route>
                            
                        </Routes>
                    </div>
                </div>
            </div>
           
           
            
        </div>
    );
};

export default Layout;