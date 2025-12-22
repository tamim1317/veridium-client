import { useState, useEffect, useCallback } from 'react';
import useAxiosSecure from './useAxiosSecure'; 
import { useAuth } from '../context/AuthContext';

const useEmployeeTeam = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    
    const [team, setTeam] = useState([]);
    const [hrInfo, setHrInfo] = useState(null); // Added to store company/HR details
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTeam = useCallback(async () => {
        if (!user?.email) return;

        setLoading(true);
        setError(null);
        
        try {
            // Updated endpoint to get team members sharing the same HR
            const response = await axiosSecure.get('/employees/my-team'); 

            // Assuming backend sends { team: [...], hr: { name, companyLogo, companyName } }
            setTeam(response.data.team || []);
            setHrInfo(response.data.hr || null);
            
        } catch (err) {
            console.error("Failed to fetch team list:", err);
            setError(err.response?.data?.message || "You are not currently affiliated with any team.");
            setTeam([]);
        } finally {
            setLoading(false);
        }
    }, [axiosSecure, user?.email]);

    useEffect(() => {
        fetchTeam();
    }, [fetchTeam]);

    return {
        team,
        hrInfo,
        loading,
        error,
        fetchTeam,
    };
};

export default useEmployeeTeam;