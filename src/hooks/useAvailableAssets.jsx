import { useState, useEffect, useCallback } from 'react';
import useAxiosSecure from './useAxiosSecure'; 
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useAvailableAssets = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Filtering and Search State
    const [searchTerm, setSearchTerm] = useState('');
    const [assetTypeFilter, setAssetTypeFilter] = useState(''); // 'Returnable', 'Non-returnable', or ''

    const fetchAssets = useCallback(async () => {
        if (!user?.email) return;
        
        setLoading(true);
        setError(null);
        
        try {
            // Updated URL to include filtering logic
            const url = `/assets/available-inventory?search=${searchTerm}&type=${assetTypeFilter}&email=${user?.email}`;
            const response = await axiosSecure.get(url);

            // Assuming backend returns { success: true, assets: [...] }
            setAssets(response.data.assets || []);
            
        } catch (err) {
            console.error("Failed to fetch available assets:", err);
            setError(err.response?.data?.message || "Could not load available assets.");
        } finally {
            setLoading(false);
        }
    }, [axiosSecure, searchTerm, assetTypeFilter, user?.email]);

    useEffect(() => {
        fetchAssets();
    }, [fetchAssets]);

    /**
     * @param {Object} asset - The complete asset object
     * @param {String} note - User provided note for the HR
     */
    const submitRequest = async (asset, note = "") => {
        try {
            const requestData = {
                assetId: asset._id,
                assetName: asset.productName,
                assetType: asset.productType, // Essential for HR categorizing
                requestNote: note,
                requesterEmail: user?.email,
                requesterName: user?.displayName,
                requestDate: new Date().toISOString(),
                status: 'Pending' // Initial status
            };

            const res = await axiosSecure.post('/requests', requestData);
            
            if (res.data.success) {
                toast.success("Request submitted successfully!");
                fetchAssets(); // Refresh inventory immediately
                return { success: true };
            }
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to submit request.';
            toast.error(message);
            return { success: false, message };
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
        refetch: fetchAssets
    };
};

export default useAvailableAssets;