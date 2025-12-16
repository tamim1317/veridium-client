import { useState, useEffect, useCallback } from 'react';
import useAxiosSecure from './useAxiosSecure'; 

const useEmployeeTeam = () => {
    const axiosSecure = useAxiosSecure();
    
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTeam = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Endpoint to get employees affiliated with the same HR manager
            const response = await axiosSecure.get('/employees/my-team'); 

            // The API response should return an array of team members
            setTeam(response.data.teamMembers);
            
        } catch (err) {
            console.error("Failed to fetch team list:", err);
            setError(err.response?.data?.message || "Could not load team list.");
            setTeam([]);
        } finally {
            setLoading(false);
        }
    }, [axiosSecure]);

    useEffect(() => {
        fetchTeam();
    }, [fetchTeam]);

    return {
        team,
        loading,
        error,
        fetchTeam,
    };
};

export default useEmployeeTeam;