import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Common/Navbar';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
    const { user } = useAuth();
    const location = useLocation();

    // This layout is only used when the user is logged in
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    {user ? `Welcome Back, ${user.name} (${user.role.toUpperCase()})` : 'Dashboard'}
                </h1>

                {/* Main Content Area */}
                <div className="bg-white p-6 shadow-xl rounded-lg">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
export default DashboardLayout;
