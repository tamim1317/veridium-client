import { useState, useEffect, useCallback } from 'react';
import useAxiosSecure from './useAxiosSecure'; 
import toast from 'react-hot-toast';

const useRequests = (initialStatus = 'Pending') => {
    const axiosSecure = useAxiosSecure();
    
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState(initialStatus);
    const [searchTerm, setSearchTerm] = useState(''); // Added Search for Audit compliance

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10; 

    const fetchRequests = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            // URL now includes search and status filters
            const url = `/requests/company-requests?status=${statusFilter}&search=${searchTerm}&page=${currentPage}&limit=${limit}`;
            const response = await axiosSecure.get(url);

            setRequests(response.data.requests || []);
            setTotalPages(response.data.totalPages || 1);
            
        } catch (err) {
            console.error("Failed to fetch requests:", err);
            setError(err.response?.data?.message || "Could not load requests.");
            setRequests([]);
        } finally {
            setLoading(false);
        }
    }, [axiosSecure, currentPage, statusFilter, searchTerm, limit]);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);


    const handleAction = async (requestId, action) => {
        try {
            // "action" will be 'approve' or 'reject'
            const res = await axiosSecure.patch(`/requests/process/${requestId}`, { action });

            if (res.data.success) {
                toast.success(`Request ${action}ed successfully!`);
                fetchRequests(); // Refresh the list
                return { success: true };
            }
        } catch (err) {
            const message = err.response?.data?.message || `Failed to ${action} request.`;
            toast.error(message);
            return { success: false, message: message };
        }
    };
    
    // Clean aliases for components to use
    const handleApprove = (requestId) => handleAction(requestId, 'approve');
    const handleReject = (requestId) => handleAction(requestId, 'reject');

    return {
        requests,
        loading,
        error,
        currentPage,
        totalPages,
        statusFilter,
        searchTerm,
        setSearchTerm,
        fetchRequests,
        handlePageChange: setCurrentPage,
        setStatusFilter,
        handleApprove,
        handleReject,
    };
};

export default useRequests;