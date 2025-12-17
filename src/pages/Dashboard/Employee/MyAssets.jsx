import React, { useRef, useState } from 'react';
import useMyAssets from '../../../hooks/useMyAssets';
import { useReactToPrint } from 'react-to-print';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyAssets = () => {
    const { assignedAssets, loading, returnableFilter, setReturnableFilter, fetchMyAssets } = useMyAssets();
    const axiosSecure = useAxiosSecure();
    const componentRef = useRef();

    // PDF Print Logic
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Veridium_Asset_Report',
    });

    const handleReturn = async (asset) => {
        Swal.fire({
            title: "Return Asset?",
            text: `Are you sure you want to return ${asset.assetName}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0D9488",
            confirmButtonText: "Yes, return it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/requests/return/${asset._id}`);
                    if (res.data.success) {
                        Swal.fire("Returned!", res.data.message, "success");
                        fetchMyAssets(); // Refresh the list
                    }
                } catch (err) {
                    Swal.fire("Error", "Could not return asset", "error");
                }
            }
        });
    };

    if (loading) return <div className="text-center p-10"><span className="loading loading-bars text-primary"></span></div>;

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-3xl font-bold text-secondary">My Assets</h2>
                <button onClick={handlePrint} className="btn btn-primary">Download PDF Report</button>
            </div>

            {/* Filter Tabs */}
            <div className="tabs tabs-boxed w-fit">
                {['', 'Returnable', 'Non-returnable'].map(type => (
                    <button 
                        key={type}
                        className={`tab ${returnableFilter === type ? 'tab-active' : ''}`}
                        onClick={() => setReturnableFilter(type)}
                    >
                        {type || 'All'}
                    </button>
                ))}
            </div>

            {/* Table Area (This is what gets printed) */}
            <div ref={componentRef} className="overflow-x-auto bg-white shadow-xl rounded-xl border border-base-300">
                <table className="table w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th>Asset Name</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Assigned Date</th>
                            <th className="print:hidden">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignedAssets.map((asset) => (
                            <tr key={asset._id}>
                                <td className="font-bold">{asset.assetName}</td>
                                <td><span className="badge badge-ghost">{asset.assetType}</span></td>
                                <td>
                                    <div className={`badge ${asset.status === 'Approved' ? 'badge-success' : 'badge-warning'}`}>
                                        {asset.status}
                                    </div>
                                </td>
                                <td>{new Date(asset.approvalDate || asset.requestDate).toLocaleDateString()}</td>
                                <td className="print:hidden">
                                    {asset.status === 'Approved' && asset.assetType === 'Returnable' && (
                                        <button 
                                            onClick={() => handleReturn(asset)}
                                            className="btn btn-xs btn-outline btn-error"
                                        >
                                            Return
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAssets;