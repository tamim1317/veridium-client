// veridium-client/src/routes/Router.jsx (The necessary changes are in the import block)

import { createBrowserRouter } from 'react-router-dom';

// --- Layouts ---
import MainLayout from '../layouts/MainLayout.jsx';         // FIXED
import DashboardLayout from '../layouts/DashboardLayout.jsx'; // FIXED

// --- Public/Auth Pages ---
import Home from '../pages/Home/Home.jsx';                // FIXED
// NOTE: Login.jsx is imported successfully
import Login from '../pages/Authentication/Login.jsx';      // FINAL FIX: Authentication folder and .jsx
// NOTE: We need a combined register page or decide which one is the default
import HrRegister from '../pages/Authentication/HrRegister.jsx'; // FINAL FIX: Authentication folder and HrRegister.jsx
import EmployeeRegister from '../pages/Authentication/EmployeeRegister.jsx'; // FINAL FIX: Authentication folder and EmployeeRegister.jsx

// --- Shared Pages ---
import Profile from '../pages/Dashboard/Shared/Profile.jsx'; 
import ErrorPage from '../pages/ErrorPage.jsx';             // Assuming ErrorPage.jsx is your 404 file

// --- Guards ---
import ProtectedRoute from "./ProtectedRoute.jsx";
import RoleBasedRoute from "./RoleBasedRoute.jsx";

// ... (All other HR/Employee imports should also have .jsx) ...
import HRDashboard from '../pages/Dashboard/HR/HRDashboard.jsx'; 
// ... and so on for all components ...


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, path: '/', element: <Home /> },
            { path: 'login', element: <Login /> },
            
            // We now use two separate paths for registration based on your file structure:
            { 
                path: 'register/hr', 
                element: <HrRegister />,
            },
            { 
                path: 'register/employee', 
                element: <EmployeeRegister />,
            },
            
        ],
    },
    // ... (Dashboard routes remain the same) ...
]);

export default router;