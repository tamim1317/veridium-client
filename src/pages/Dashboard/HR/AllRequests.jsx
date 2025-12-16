import React, { useState } from 'react';
import useRequests from '../../../hooks/useRequests'; // Adjust path

const statusOptions = ['Pending', 'Approved', 'Rejected'];

const AllRequests = () => {
    const { 
        requests, 
        loading, 
        error, 
        currentPage, 
        totalPages, 
        statusFilter,
        handlePageChange, 
        setStatusFilter,
        handleApprove,
        handleReject,
    } = useRequests();
    
    const [actionLoading, setActionLoading] = useState(null);

    const handleActionClick = async (requestId, actionType) => {
        setActionLoading(requestId);
        let result;

        if (actionType === 'Approve') {
            result = await handleApprove(requestId);
        } else if (actionType === 'Reject') {
            result = await handleReject(requestId);
        }
        
        if (result.success) {
            alert(`Request ${actionType}d successfully!`);
        } else {
            alert(`Error during action: ${result.message}`);
        }
        setActionLoading(null);
    };


    if (loading) {
        return <div className="text-center p-10"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    if (error) {
        return <div className="text-center text-error p-4 border rounded border-error bg-error/10">{error}</div>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Employee Asset Requests</h2>
            
            {/* Status Filter Tabs */}
            <div role="tablist" className="tabs tabs-boxed">
                {statusOptions.map(status => (
                    <a
                        key={status}
                        role="tab"
                        className={`tab ${statusFilter === status ? 'tab-active tab-lg font-bold' : ''}`}
                        onClick={() => setStatusFilter(status)}
                    >
                        {status}
                    </a>
                ))}
            </div>


            {/* Requests Table */}
            <div className="overflow-x-auto bg-base-100 rounded-lg shadow-lg">
                <table className="table w-full">
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th>Requested By</th>
                            <th>Asset Name</th>
                            <th>Quantity</th>
                            <th>Requested On</th>
                            <th>Request Status</th>
                            {statusFilter === 'Pending' && <th>Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length === 0 ? (
                            <tr>
                                <td colSpan={statusFilter === 'Pending' ? 6 : 5} className="text-center p-8 text-lg text-gray-500">
                                    No {statusFilter} requests found.
                                </td>
                            </tr>
                        ) : (
                            requests.map((request) => (
                                <tr key={request._id}>
                                    <td className="font-bold">{request.requester.name}</td>
                                    <td>{request.assetName}</td>
                                    <td>{request.quantityRequested}</td>
                                    <td>{new Date(request.requestDate).toLocaleDateString('en-US')}</td>
                                    <td>
                                        <span className={`badge ${
                                            request.status === 'Approved' ? 'badge-success' : 
                                            request.status === 'Rejected' ? 'badge-error' : 
                                            'badge-warning'
                                        }`}>
                                            {request.status}
                                        </span>
                                    </td>
                                    {request.status === 'Pending' && (
                                        <td className="space-x-2">
                                            <button 
                                                className="btn btn-sm btn-success text-white"
                                                onClick={() => handleActionClick(request._id, 'Approve')}
                                                disabled={actionLoading === request._id}
                                            >
                                                {actionLoading === request._id ? <span className="loading loading-spinner loading-xs"></span> : 'Approve'}
                                            </button>
                                            <button 
                                                className="btn btn-sm btn-error text-white" 
                                                onClick={() => handleActionClick(request._id, 'Reject')}
                                                disabled={actionLoading === request._id}
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                    <div className="join">
                        <button 
                            className="join-item btn" 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            «
                        </button>
                        <button className="join-item btn btn-active btn-primary">{currentPage}</button>
                        <button 
                            className="join-item btn" 
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            »
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllRequests;