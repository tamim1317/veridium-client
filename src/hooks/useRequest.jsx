import { useState, useEffect, useCallback } from 'react';
import useAxiosSecure from './useAxiosSecure'; 

const useRequests = (initialStatus = 'Pending') => {
    const axiosSecure = useAxiosSecure();
    
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState(initialStatus);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10; 

    const fetchRequests = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            const url = `/requests/company-requests?status=${statusFilter}&page=${currentPage}&limit=${limit}`;
            const response = await axiosSecure.get(url);

            setRequests(response.data.requests);
            setTotalPages(response.data.totalPages);
            
        } catch (err) {
            console.error("Failed to fetch requests:", err);
            setError(err.response?.data?.message || "Could not load requests.");
            setRequests([]);
        } finally {
            setLoading(false);
        }
    }, [axiosSecure, currentPage, statusFilter, limit]);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);


    const handleAction = async (requestId, action) => {
        try {
            const res = await axiosSecure.patch(`/requests/${requestId}`, { action });

            fetchRequests(); 
            return { success: true, message: res.data.message };
            
        } catch (err) {
            const message = err.response?.data?.message || `Failed to ${action} request.`;
            return { success: false, message: message };
        }
    };
    
    const handleApprove = (requestId) => handleAction(requestId, 'Approve');
    const handleReject = (requestId) => handleAction(requestId, 'Reject');

    return {
        requests,
        loading,
        error,
        currentPage,
        totalPages,
        statusFilter,
        fetchRequests,
        handlePageChange: setCurrentPage,
        setStatusFilter,
        handleApprove,
        handleReject,
    };
};

export default useRequests;