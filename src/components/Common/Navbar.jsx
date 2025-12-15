import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, isHR, user, logout } = useAuth();

    const publicLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/join-employee">Join as Employee</NavLink></li>
            <li><NavLink to="/join-hr">Join as HR Manager</NavLink></li>
        </>
    );

    // Links for the HR Manager
    const hrDropdownLinks = (
        <>
            <li><Link to="/dashboard/hr">Asset List (Dashboard)</Link></li>
            <li><Link to="/dashboard/hr/add-asset">Add Asset</Link></li>
            <li><Link to="/dashboard/hr/requests">All Requests</Link></li>
            <li><Link to="/dashboard/hr/employees">Employee List</Link></li>
            <li><Link to="/dashboard/hr/upgrade">Upgrade Package</Link></li>
            <div className="divider m-0"></div>
            <li><Link to="/dashboard/profile">Profile</Link></li>
            <li><a onClick={logout}>Logout</a></li>
        </>
    );

    // Links for the Employee
    const employeeDropdownLinks = (
        <>
            <li><Link to="/dashboard/employee">My Assets (Dashboard)</Link></li>
            <li><Link to="/dashboard/employee/request">Request Asset</Link></li>
            <li><Link to="/dashboard/employee/team">My Team</Link></li>
            <div className="divider m-0"></div>
            <li><Link to="/dashboard/profile">Profile</Link></li>
            <li><a onClick={logout}>Logout</a></li>
        </>
    );

    const userDropdown = (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border border-primary">
                    <span className="text-xl font-bold flex items-center justify-center h-full bg-base-300">
                        {user?.name ? user.name[0] : 'U'}
                    </span>
                </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1px] p-2 shadow bg-base-100 rounded-box w-52">
                {isHR ? hrDropdownLinks : employeeDropdownLinks}
            </ul>
        </div>
    );

    return (
        <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost text-xl font-extrabold text-primary">
                    Veridium
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {publicLinks}
                </ul>
            </div>
            <div className="navbar-end">
                {isAuthenticated ? (
                    userDropdown
                ) : (
                    <Link to="/login" className="btn btn-primary">Login</Link>
                )}
            </div>
            {/* Mobile/Tablet Menu Drawer */}
            <div className="lg:hidden navbar-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {isAuthenticated ? (isHR ? hrDropdownLinks : employeeDropdownLinks) : publicLinks}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;