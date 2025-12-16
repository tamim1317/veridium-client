import { useState, useEffect, useCallback } from 'react';
import useAxiosSecure from './useAxiosSecure'; 

const useMyAssets = () => {
    const axiosSecure = useAxiosSecure();
    
    const [assignedAssets, setAssignedAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Filtering State
    const [returnableFilter, setReturnableFilter] = useState(''); // 'Returnable', 'Non-returnable', or '' (All)

    const fetchMyAssets = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Employee endpoint to get their currently assigned assets
            const url = `/employees/my-assets?type=${returnableFilter}`;
            const response = await axiosSecure.get(url);

            setAssignedAssets(response.data.assignedAssets);
            
        } catch (err) {
            console.error("Failed to fetch assigned assets:", err);
            setError(err.response?.data?.message || "Could not load your assigned assets.");
            setAssignedAssets([]);
        } finally {
            setLoading(false);
        }
    }, [axiosSecure, returnableFilter]);

    useEffect(() => {
        fetchMyAssets();
    }, [fetchMyAssets]);

    // --- Asset Return Logic ---
    const returnAsset = async (assignedAssetId, assetName) => {
        try {
            const res = await axiosSecure.patch(`/employees/return-asset/${assignedAssetId}`);
            
            fetchMyAssets(); // Refetch the list to show the item is gone
            return { success: true, message: res.data.message };
            
        } catch (err) {
            const message = err.response?.data?.message || `Failed to return ${assetName}.`;
            return { success: false, message: message };
        }
    };

    return {
        assignedAssets,
        loading,
        error,
        returnableFilter,
        setReturnableFilter,
        returnAsset,
        fetchMyAssets
    };
};

export default useMyAssets;