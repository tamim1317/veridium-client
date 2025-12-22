import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  FaHome,
  FaBoxOpen,
  FaClipboardList,
  FaUsers,
  FaUser,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const Sidebar = () => {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`bg-base-100 border-r border-base-200 shadow-lg transition-all duration-300 h-screen sticky top-0 z-40 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleCollapse}
        className="absolute -right-3 top-8 btn btn-circle btn-sm btn-ghost bg-base-100 shadow-md z-50"
      >
        {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>

      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-base-200">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
          <span className="text-white font-black text-xl italic">V</span>
        </div>
        {!isCollapsed && (
          <span className="text-xl font-bold tracking-tight text-base-content">Veridium</span>
        )}
      </div>

      {/* Navigation */}
      <div className="p-4 space-y-2">
        {/* Home */}
        <Link
          to="/"
          className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
            isActive("/") ? "bg-primary text-white" : "hover:bg-base-200"
          }`}
        >
          <FaHome className="text-xl" />
          {!isCollapsed && <span className="font-medium">Home</span>}
        </Link>

        {/* Employee Links */}
        {role === "employee" && (
          <>
            <Link
              to="/my-assets"
              className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                isActive("/my-assets") ? "bg-primary text-white" : "hover:bg-base-200"
              }`}
            >
              <FaBoxOpen className="text-xl" />
              {!isCollapsed && <span className="font-medium">My Assets</span>}
            </Link>
            <Link
              to="/request-asset"
              className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                isActive("/request-asset") ? "bg-primary text-white" : "hover:bg-base-200"
              }`}
            >
              <FaClipboardList className="text-xl" />
              {!isCollapsed && <span className="font-medium">Request Asset</span>}
            </Link>
            <Link
              to="/my-team"
              className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                isActive("/my-team") ? "bg-primary text-white" : "hover:bg-base-200"
              }`}
            >
              <FaUsers className="text-xl" />
              {!isCollapsed && <span className="font-medium">My Team</span>}
            </Link>
          </>
        )}

        {/* HR Links */}
        {role === "hr" && (
          <>
            <Link
              to="/asset-list"
              className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                isActive("/asset-list") ? "bg-primary text-white" : "hover:bg-base-200"
              }`}
            >
              <FaBoxOpen className="text-xl" />
              {!isCollapsed && <span className="font-medium">Asset List</span>}
            </Link>
            <Link
              to="/add-asset"
              className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                isActive("/add-asset") ? "bg-primary text-white" : "hover:bg-base-200"
              }`}
            >
              <FaClipboardList className="text-xl" />
              {!isCollapsed && <span className="font-medium">Add Asset</span>}
            </Link>
            <Link
              to="/all-requests"
              className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                isActive("/all-requests") ? "bg-primary text-white" : "hover:bg-base-200"
              }`}
            >
              <FaUsers className="text-xl" />
              {!isCollapsed && <span className="font-medium">All Requests</span>}
            </Link>
            <Link
              to="/employees"
              className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                isActive("/employees") ? "bg-primary text-white" : "hover:bg-base-200"
              }`}
            >
              <FaUsers className="text-xl" />
              {!isCollapsed && <span className="font-medium">Employees</span>}
            </Link>
            <Link
              to="/upgrade"
              className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                isActive("/upgrade") ? "bg-primary text-white" : "hover:bg-base-200"
              }`}
            >
              <FaDollarSign className="text-xl" />
              {!isCollapsed && <span className="font-medium">Upgrade Package</span>}
            </Link>
          </>
        )}

        {/* Common Links */}
        <Link
          to="/profile"
          className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
            isActive("/profile") ? "bg-primary text-white" : "hover:bg-base-200"
          }`}
        >
          <FaUser className="text-xl" />
          {!isCollapsed && <span className="font-medium">Profile</span>}
        </Link>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-4 p-3 rounded-xl transition-colors hover:bg-error/10 text-error w-full"
        >
          <FaSignOutAlt className="text-xl" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;