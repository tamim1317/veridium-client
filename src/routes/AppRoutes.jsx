import { createBrowserRouter, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/public/Home/Home";
import Login from "../pages/public/Login";
import EmployeeRegister from "../pages/public/EmployeeRegister";
import HrRegister from "../pages/public/HrRegister";
import PrivateRoute from "./PrivateRoute";
import RoleBasedRoute from "./RoleBasedRoute";

import MyAssets from "../pages/employee/MyAssets";
import AssetList from "../pages/hr/AssetList";
import AddAsset from "../pages/hr/AddAsset";
import AllRequests from "../pages/hr/AllRequests";

// Placeholder for missing pages (deploy-এর জন্য এগুলো রাখা দরকার)
const Profile = () => <div className="p-10 text-2xl">Profile Page (Shared)</div>;
const RequestAsset = () => <div className="p-10 text-2xl">Request Asset (Coming Soon)</div>;
const MyTeam = () => <div className="p-10 text-2xl">My Team (Coming Soon)</div>;
const Employees = () => <div className="p-10 text-2xl">Employees (Coming Soon)</div>;
const UpgradePackage = () => <div className="p-10 text-2xl">Upgrade Package (Coming Soon)</div>;
const Dashboard = () => <div className="p-10 text-2xl">HR Dashboard (Coming Soon)</div>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // Public Routes
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "join-employee", element: <EmployeeRegister /> },
      { path: "join-hr", element: <HrRegister /> },

      // Shared Protected Routes
      {
        path: "profile",
        element: <PrivateRoute />,
        children: [{ index: true, element: <Profile /> }],
      },

      // Employee Routes
      {
        path: "my-assets",
        element: <RoleBasedRoute allowedRoles="employee" />,
        children: [{ index: true, element: <MyAssets /> }],
      },
      {
        path: "request-asset",
        element: <RoleBasedRoute allowedRoles="employee" />,
        children: [{ index: true, element: <RequestAsset /> }],
      },
      {
        path: "my-team",
        element: <RoleBasedRoute allowedRoles="employee" />,
        children: [{ index: true, element: <MyTeam /> }],
      },

      // HR Routes (nested under /hr)
      {
        path: "hr",
        element: <RoleBasedRoute allowedRoles="hr" />,
        children: [
          { index: true, element: <Dashboard /> }, // /hr → HR Dashboard
          { path: "asset-list", element: <AssetList /> },
          { path: "add-asset", element: <AddAsset /> },
          { path: "all-requests", element: <AllRequests /> },
          { path: "employees", element: <Employees /> },
          { path: "upgrade", element: <UpgradePackage /> },
        ],
      },

      // 404 Catch-all (improved for production)
      {
        path: "*",
        element: (
          <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="text-center space-y-8">
              <h1 className="text-9xl font-black text-primary">404</h1>
              <p className="text-3xl font-semibold text-base-content">Page Not Found</p>
              <p className="text-lg text-base-content/70 max-w-md mx-auto">
                Oops! The page you're looking for doesn't exist or you don't have permission.
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/" className="btn btn-primary btn-lg">Go Home</Link>
                <button onClick={() => window.history.back()} className="btn btn-outline btn-lg">
                  Go Back
                </button>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
]);

export default router;