import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaCog, FaBell } from "react-icons/fa";

const DashboardNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully", { duration: 3000 });
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.", { duration: 4000 });
    }
  };

  return (
    <nav className="bg-base-100 border-b border-base-200 shadow-sm sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-black text-xl italic">V</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-base-content">Veridium</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {/* Notifications */}
            <button className="btn btn-ghost btn-circle relative">
              <FaBell className="text-xl text-base-content/70" />
              <span className="absolute -top-1 -right-1 badge badge-xs badge-error">3</span>
            </button>

            {/* User Avatar Dropdown */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={user?.photoURL || "https://ui-avatars.com/api/?name=User&background=random"}
                    alt="User avatar"
                  />
                </div>
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-3">
                <li className="menu-title px-4 py-2 text-xs uppercase text-base-content/60">
                  {user?.name || "User"}
                </li>
                <li>
                  <Link to="/profile" className="flex items-center gap-2">
                    <FaUser className="text-lg" /> Profile
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="flex items-center gap-2">
                    <FaCog className="text-lg" /> Settings
                  </Link>
                </li>
                <li className="border-t border-base-200 my-1"></li>
                <li>
                  <button onClick={handleLogout} className="text-error flex items-center gap-2">
                    <FaSignOutAlt className="text-lg" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden btn btn-ghost btn-circle"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-base-100 border-t border-base-200 shadow-lg">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            {/* Notifications */}
            <button className="btn btn-ghost justify-start gap-3">
              <FaBell className="text-xl" /> Notifications
            </button>

            {/* Profile */}
            <Link to="/profile" className="btn btn-ghost justify-start gap-3">
              <FaUser className="text-xl" /> Profile
            </Link>

            {/* Settings */}
            <Link to="/settings" className="btn btn-ghost justify-start gap-3">
              <FaCog className="text-xl" /> Settings
            </Link>

            {/* Logout */}
            <button onClick={handleLogout} className="btn btn-error btn-outline justify-start gap-3">
              <FaSignOutAlt className="text-xl" /> Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;