import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMenu, FiX, FiLogOut, FiUser, FiPackage, FiBriefcase, FiUsers, FiArrowUpCircle } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout, role } = useAuth() || {};
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  // Scroll effect for background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      setIsMobileOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Public links (when not logged in)
  const publicLinks = [
    { to: '/', label: 'Home' },
    { to: '/join-employee', label: 'Join as Employee' },
    { to: '/join-hr', label: 'Join as HR Manager' },
  ];

  // Employee links
  const employeeLinks = [
    { to: '/employee/my-assets', label: 'My Assets', icon: FiPackage },
    { to: '/employee/request-asset', label: 'Request Asset', icon: FiBriefcase },
    { to: '/employee/my-team', label: 'My Team', icon: FiUsers },
  ];

  // HR links
  const hrLinks = [
    { to: '/hr/dashboard', label: 'Asset List', icon: FiPackage },
    { to: '/hr/add-asset', label: 'Add Asset', icon: FiBriefcase },
    { to: '/hr/all-requests', label: 'All Requests', icon: FiUsers },
    { to: '/hr/my-employees', label: 'My Employees', icon: FiUsers },
    { to: '/hr/upgrade-package', label: 'Upgrade Package', icon: FiArrowUpCircle },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-base-100/90 backdrop-blur-lg shadow-md border-b border-base-200'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 transition-transform group-hover:scale-105">
              <span className="text-white font-black text-xl">V</span>
            </div>
            <span
              className={`text-2xl font-black tracking-tight transition-colors ${
                isScrolled ? 'text-base-content' : 'text-white'
              }`}
            >
              Veridium
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {!user ? (
              <>
                {publicLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`font-medium transition-colors ${
                      isScrolled
                        ? 'text-base-content hover:text-primary'
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/login"
                  className={`btn btn-primary btn-md rounded-lg ${
                    isScrolled ? 'btn-outline' : ''
                  }`}
                >
                  Login
                </Link>
              </>
            ) : (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar"
                  aria-label="User menu"
                >
                  <div className="w-10 rounded-full border-2 border-primary/30">
                    <img
                      src={user?.photoURL || 'https://ui-avatars.com/api/?name=User'}
                      alt="User avatar"
                      className="object-cover"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow-xl bg-base-100 rounded-xl w-72 border border-base-200"
                >
                  <li className="menu-title px-4 py-2 text-xs uppercase text-base-content/60">
                    {user.role === 'hr' ? 'HR Manager' : 'Employee'}
                  </li>

                  {(role === 'employee' ? employeeLinks : hrLinks).map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className="flex items-center gap-3 py-2">
                        {link.icon && <link.icon className="w-5 h-5" />}
                        {link.label}
                      </Link>
                    </li>
                  ))}

                  <li className="border-t border-base-200 my-1"></li>
                  <li>
                    <Link to="/profile" className="flex items-center gap-3 py-2">
                      <FiUser className="w-5 h-5" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 py-2 text-error"
                    >
                      <FiLogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden btn btn-ghost btn-circle"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileOpen ? (
              <FiX className={isScrolled ? 'text-base-content' : 'text-white'} size={24} />
            ) : (
              <FiMenu className={isScrolled ? 'text-base-content' : 'text-white'} size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-base-100/95 backdrop-blur-sm z-40 transition-all duration-300 ${
          isMobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-4 py-6 flex flex-col h-full">
          <div className="flex justify-end">
            <button
              onClick={() => setIsMobileOpen(false)}
              className="btn btn-ghost btn-circle"
              aria-label="Close menu"
            >
              <FiX size={28} />
            </button>
          </div>

          <div className="flex flex-col gap-6 mt-10">
            {!user ? (
              <>
                {publicLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileOpen(false)}
                    className="text-xl font-medium hover:text-primary transition"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/login"
                  onClick={() => setIsMobileOpen(false)}
                  className="btn btn-primary w-full"
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-3 text-xl font-medium"
                >
                  <FiUser /> Profile
                </Link>

                {(role === 'employee' ? employeeLinks : hrLinks).map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-3 text-xl font-medium"
                  >
                    {link.icon && <link.icon size={22} />}
                    {link.label}
                  </Link>
                ))}

                <button
                  onClick={handleLogout}
                  className="btn btn-error w-full mt-6"
                >
                  <FiLogOut /> Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;