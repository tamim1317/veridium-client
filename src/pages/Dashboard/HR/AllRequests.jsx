import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AllRequests = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch all requests for this HR Manager
    const { data: requests = [], isLoading, refetch } = useQuery({
        queryKey: ['all-requests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/requests/hr');
            return res.data;
        }
    });

    const handleAction = async (requestId, action) => {
        try {
            const res = await axiosSecure.patch('/requests/process', { requestId, action });
            if (res.data.success) {
                Swal.fire({
                    title: 'Success!',
                    text: `Request has been ${action}d.`,
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
                refetch();
            }
        } catch (error) {
            Swal.fire('Error', error.response?.data?.message || 'Action failed', 'error');
        }
    };

    // Filter by name or email
    const filteredRequests = requests.filter(req => 
        req.assetName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.requesterEmail?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) return <div className="flex justify-center p-10"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Pending Requests</h2>
                    <p className="text-gray-500">Manage asset assignments and employee affiliations.</p>
                </div>
                
                <div className="form-control w-full md:w-80">
                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder="Search by name or email..." 
                            className="input input-bordered w-full" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            

            <div className="bg-white shadow-xl rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead className="bg-slate-50 text-gray-600">
                            <tr>
                                <th>Asset Name</th>
                                <th>Requester</th>
                                <th>Request Date</th>
                                <th>Note</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRequests.map((req) => (
                                <tr key={req._id} className="hover">
                                    <td className="font-semibold text-gray-800">{req.assetName}</td>
                                    <td>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{req.requesterName}</span>
                                            <span className="text-xs text-gray-400">{req.requesterEmail}</span>
                                        </div>
                                    </td>
                                    <td className="text-sm">{new Date(req.requestDate).toLocaleDateString()}</td>
                                    <td className="max-w-xs truncate text-xs italic text-gray-500">
                                        {req.note || "No note provided"}
                                    </td>
                                    <td>
                                        <span className={`badge badge-sm p-3 ${
                                            req.status === 'Pending' ? 'badge-warning' : 
                                            req.status === 'Approved' ? 'badge-success text-white' : 'badge-error text-white'
                                        }`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="flex justify-center gap-2">
                                        {req.status === 'Pending' ? (
                                            <>
                                                <button 
                                                    onClick={() => handleAction(req._id, 'approve')}
                                                    className="btn btn-xs btn-success text-white"
                                                >
                                                    Approve
                                                </button>
                                                <button 
                                                    onClick={() => handleAction(req._id, 'reject')}
                                                    className="btn btn-xs btn-outline btn-error"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        ) : (
                                            <span className="text-xs text-gray-400 italic">Processed</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllRequests;