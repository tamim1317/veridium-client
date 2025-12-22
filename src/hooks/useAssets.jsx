import { useState, useEffect, useCallback } from 'react';
import useAxiosSecure from './useAxiosSecure';

const useAssets = () => {
    const axiosSecure = useAxiosSecure();
    
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Pagination and Search State
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const limit = 10;

    const addAsset = async (assetData) => {
        try {
        const response = await axiosSecure.post('/assets', assetData);
        refetch(); // Refresh list after adding
        return { success: true, data: response.data };
       } catch (err) {
        return { 
            success: false, 
            error: err.response?.data?.message || 'Failed to add asset' 
          };
      }
  };

    const updateAsset = async (id, data) => {
        try {
            const response = await axiosSecure.patch(`/assets/${id}`, data);
            refetch(); 
            return { success: true, asset: response.data.asset };
        } catch (err) {
            console.error("Asset update failed:", err);
            return { success: false, error: err.response?.data?.message || 'Failed to update asset' };
        }
    };

    const fetchAssets = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Include pagination and search query parameters
            const url = `/assets/hr-inventory?page=${currentPage}&limit=${limit}&search=${searchTerm}`;
            const response = await axiosSecure.get(url);

            setAssets(response.data.assets);
            setTotalPages(response.data.totalPages);
            
        } catch (err) {
            console.error("Failed to fetch assets:", err);
            setError("Could not load assets. Please ensure the server is running.");
            setAssets([]);
        } finally {
            setLoading(false);
        }
    }, [axiosSecure, currentPage, searchTerm, limit]);

    useEffect(() => {
        fetchAssets();
    }, [fetchAssets]);

    // Handlers for pagination/search changes
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    
    const handleSearchChange = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const refetch = () => {
        fetchAssets(); 
    };

    return {
        assets,
        loading,
        error,
        currentPage,
        totalPages,
        limit,
        searchTerm,
        handlePageChange,
        handleSearchChange,
        refetch,
        updateAsset,
        addAsset,
    };
};

export default useAssets;