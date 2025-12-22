import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Navbar from '../components/Common/Navbar';
import { useAuth } from '../context/AuthContext';
import useUserRole from '../hooks/useUserRole';

const DashboardLayout = () => {
    const { user } = useAuth();
    const { role, isRoleLoading } = useUserRole();

    if (isRoleLoading) return <div className="flex justify-center mt-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

    return (
        <div className="min-h-screen bg-base-200">
            {/* Reusing Navbar for the top header */}
            <Navbar />
            
            <div className="flex flex-col lg:flex-row container mx-auto gap-6 p-4 mt-6">
                {/* Sidebar Navigation */}
                <aside className="w-full lg:w-64 bg-white shadow-xl rounded-2xl p-6 h-fit">
                    <h2 className="text-xl font-bold mb-4 text-primary border-b pb-2">
                        {role === 'hr' ? 'HR Panel' : 'Employee Panel'}
                    </h2>
                    <ul className="menu p-0 gap-2">
                        {role === 'hr' ? (
                            <>
                                <li><NavLink to="/dashboard/asset-list">Asset List</NavLink></li>
                                <li><NavLink to="/dashboard/add-asset">Add Asset</NavLink></li>
                                <li><NavLink to="/dashboard/all-requests">All Requests</NavLink></li>
                                <li><NavLink to="/dashboard/my-employee-list">My Employees</NavLink></li>
                                <li><NavLink to="/dashboard/add-employee">Add Employee</NavLink></li>
                            </>
                        ) : (
                            <>
                                <li><NavLink to="/dashboard/my-assets">My Assets</NavLink></li>
                                <li><NavLink to="/dashboard/my-team">My Team</NavLink></li>
                                <li><NavLink to="/dashboard/request-asset">Request Asset</NavLink></li>
                            </>
                        )}
                        <div className="divider">Shared</div>
                        <li><NavLink to="/dashboard/profile">My Profile</NavLink></li>
                    </ul>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 bg-white p-6 shadow-xl rounded-2xl min-h-[70vh]">
                    <header className="mb-6 flex justify-between items-center border-b pb-4">
                        <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
                            {user?.displayName || 'User'}
                        </h1>
                        <span className="badge badge-primary p-3 font-bold">{role?.toUpperCase()}</span>
                    </header>
                    
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;