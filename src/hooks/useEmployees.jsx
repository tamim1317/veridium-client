import { useState, useEffect, useCallback } from 'react';
import useAxiosSecure from './useAxiosSecure'; 

const useEmployees = () => {
    const axiosSecure = useAxiosSecure();
    
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [packageInfo, setPackageInfo] = useState({ currentEmployees: 0, packageLimit: 0 });

    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await axiosSecure.get('/employees/affiliated'); 

            setEmployees(response.data.employees);
            setPackageInfo({
                currentEmployees: response.data.currentEmployees,
                packageLimit: response.data.packageLimit,
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
    
    // --- Remove Employee Logic ---
    const removeEmployee = async (employeeEmail, employeeName) => {
        try {
            const res = await axiosSecure.patch(`/employees/remove`, { employeeEmail });

            fetchEmployees();
            return { success: true, message: res.data.message };
            
        } catch (err) {
            console.error(`Failed to remove ${employeeName}:`, err);
            return { success: false, message: err.response?.data?.message || `Failed to remove ${employeeName}.` };
        }
    };
    // ----------------------------------------------------

    return {
        employees,
        loading,
        error,
        packageInfo,
        fetchEmployees,
        removeEmployee,
    };
};

export default useEmployees;