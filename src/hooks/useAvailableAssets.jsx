import { useState, useEffect, useCallback } from 'react';
import useAxiosSecure from './useAxiosSecure'; 

const useAvailableAssets = () => {
    const axiosSecure = useAxiosSecure();
    
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Filtering and Search State
    const [searchTerm, setSearchTerm] = useState('');
    const [assetTypeFilter, setAssetTypeFilter] = useState(''); // 'Returnable', 'Non-returnable', or ''

    const fetchAssets = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Employee endpoint to get available assets in their company
            const url = `/assets/available-inventory?search=${searchTerm}&type=${assetTypeFilter}`;
            const response = await axiosSecure.get(url);

            setAssets(response.data.availableAssets);
            
        } catch (err) {
            console.error("Failed to fetch available assets:", err);
            setError(err.response?.data?.message || "Could not load available assets.");
            setAssets([]);
        } finally {
            setLoading(false);
        }
    }, [axiosSecure, searchTerm, assetTypeFilter]);

    useEffect(() => {
        fetchAssets();
    }, [fetchAssets]);

    const submitRequest = async (assetId, assetName, quantity) => {
        try {
            const res = await axiosSecure.post('/requests', {
                assetId,
                assetName,
                quantityRequested: quantity,
            });
            
            // Refetch the list to update availability count (if applicable)
            fetchAssets(); 
            return { success: true, message: res.data.message };
            
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to submit request.';
            return { success: false, message: message };
        }
    };

    return {
        assets,
        loading,
        error,
        searchTerm,
        assetTypeFilter,
        setSearchTerm,
        setAssetTypeFilter,
        submitRequest,
        fetchAssets
    };
};

export default useAvailableAssets;