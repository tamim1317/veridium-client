import { useState, useEffect, useCallback } from 'react';
import useAxiosSecure from './useAxiosSecure'; 
import toast from 'react-hot-toast';

const useEmployees = () => {
    const axiosSecure = useAxiosSecure();
    
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [packageInfo, setPackageInfo] = useState({ currentCount: 0, limit: 0 });

    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await axiosSecure.get('/employees/affiliated'); 

            setEmployees(response.data.employees || []);
            setPackageInfo({
                currentCount: response.data.currentEmployees || 0,
                limit: response.data.packageLimit || 0,
            });
            
        } catch (err) {
            console.error("Failed to fetch employee list:", err);
            setError(err.response?.data?.message || "Could not load employee list.");
            setEmployees([]);
        } finally {
            setLoading(false);
        }
    }, [axiosSecure]);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);
    
    // --- ADD TO TEAM LOGIC (New for Audit) ---
    const addToTeam = async (employeeId) => {
        // Preventive check before hitting the server
        if (packageInfo.currentCount >= packageInfo.limit) {
            toast.error("Package limit reached! Please upgrade your plan.");
            return { success: false, limitReached: true };
        }

        try {
            const res = await axiosSecure.patch(`/employees/add-to-team`, { employeeId });
            toast.success("Employee added to your team!");
            fetchEmployees(); // Refresh counts and list
            return { success: true };
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add employee");
            return { success: false };
        }
    };

    // --- Remove Employee Logic ---
    const removeEmployee = async (employeeEmail) => {
        try {
            const res = await axiosSecure.patch(`/employees/remove`, { employeeEmail });
            toast.success("Employee removed from team.");
            fetchEmployees();
            return { success: true };
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to remove employee.");
            return { success: false };
        }
    };

    return {
        employees,
        loading,
        error,
        packageInfo,
        fetchEmployees,
        removeEmployee,
        addToTeam // Exported for the 'Add Employee' page
    };
};

export default useEmployees;