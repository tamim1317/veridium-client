import { createBrowserRouter } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout'; 
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from '../components/Common/ProtectedRoute'; 

export const router = createBrowserRouter([
    //Public Routes
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <Error404 />,
        children: [
            { path: "/", element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "join-hr", element: <HrRegister /> },
            { path: "join-employee", element: <EmployeeRegister /> },
        ],
    },

    // Protected Dashboard Routes
    {
        path: "dashboard",
        element: <ProtectedRoute />,
        children: [
            {
                path: "", 
                element: <DashboardLayout />,
                children: [
                    // Shared Profile Page 
                    { path: "profile", element: <Profile /> },

                    // HR Manager Routes
                    {
                        path: "hr",
                        element: <ProtectedRoute allowedRoles={['hr']} />, 
                        children: [
                            { path: "", element: <AssetList /> }, 
                            { path: "add-asset", element: <AddAsset /> },
                            { path: "requests", element: <AllRequests /> },
                            { path: "employees", element: <MyEmployeeList /> },
                            { path: "upgrade", element: <UpgradePackage /> },
                        ],
                    },

                    // Employee Routes
                    {
                        path: "employee",
                        element: <ProtectedRoute allowedRoles={['employee']} />, 
                        children: [
                            { path: "", element: <MyAssets /> }, 
                            { path: "request", element: <RequestAsset /> },
                            { path: "team", element: <MyTeam /> },
                        ],
                    },
                ]
            }
        ],
    },
]);