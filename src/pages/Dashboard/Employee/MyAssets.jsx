import React, { useState } from 'react';
import useMyAssets from '../../../hooks/useMyAssets';
import { Link } from 'react-router-dom';

const filterOptions = [
    { label: 'All Assets', value: '' },
    { label: 'Returnable', value: 'Returnable' },
    { label: 'Non-returnable', value: 'Non-returnable' },
];

const MyAssets = () => {
    const { 
        assignedAssets, 
        loading, 
        error, 
        returnableFilter, 
        setReturnableFilter, 
        returnAsset, 
        fetchMyAssets 
    } = useMyAssets();
    
    const [returnLoading, setReturnLoading] = useState(null);

    const handleReturn = async (asset) => {
        if (!window.confirm(`Are you sure you want to mark "${asset.assetName}" as returned?`)) {
            return;
        }

        setReturnLoading(asset._id);
        const result = await returnAsset(asset._id, asset.assetName);
        
        if (result.success) {
            alert(result.message);
        } else {
            alert(`Error returning asset: ${result.message}`);
        }
        setReturnLoading(null);
    };


    if (loading) {
        return <div className="text-center p-10"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    if (error) {
        return <div className="text-center text-error p-4 border rounded border-error bg-error/10">{error}</div>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">My Assigned Assets</h2>

            {/* Filter and Refresh */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="join w-full md:w-auto">
                    {filterOptions.map(option => (
                        <button
                            key={option.value}
                            className={`join-item btn ${returnableFilter === option.value ? 'btn-active btn-secondary' : 'btn-ghost'}`}
                            onClick={() => setReturnableFilter(option.value)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
                <button onClick={fetchMyAssets} className="btn btn-outline btn-primary w-full md:w-auto">Refresh List</button>
            </div>


            {/* Assigned Assets Table */}
            <div className="overflow-x-auto bg-base-100 rounded-lg shadow-lg">
                <table className="table w-full">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>Asset Name</th>
                            <th>Quantity</th>
                            <th>Type</th>
                            <th>Assigned Date</th>
                            <th>Return Date (if applicable)</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignedAssets.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center p-8 text-lg text-gray-500">
                                    You currently have no assigned assets. 
                                    <Link to="/dashboard/employee/request" className="link link-primary ml-1">Request one now.</Link>
                                </td>
                            </tr>
                        ) : (
                            assignedAssets.map((asset) => (
                                <tr key={asset._id}>
                                    <td className="font-bold">{asset.assetName}</td>
                                    <td>{asset.quantityAssigned}</td>
                                    <td>
                                        <span className={`badge ${asset.assetType === 'Returnable' ? 'badge-info' : 'badge-warning'}`}>
                                            {asset.assetType}
                                        </span>
                                    </td>
                                    <td>{new Date(asset.assignmentDate).toLocaleDateString()}</td>
                                    <td>
                                        {asset.returnDate ? (
                                            new Date(asset.returnDate).toLocaleDateString()
                                        ) : (
                                            <span className="text-error font-semibold">N/A</span>
                                        )}
                                    </td>
                                    <td className="space-x-2">
                                        {asset.assetType === 'Returnable' ? (
                                            <button 
                                                className="btn btn-sm btn-success text-white" 
                                                onClick={() => handleReturn(asset)}
                                                disabled={returnLoading === asset._id}
                                            >
                                                {returnLoading === asset._id ? <span className="loading loading-spinner loading-xs"></span> : 'Return'}
                                            </button>
                                        ) : (
                                            <span className="text-sm text-gray-500">Non-returnable</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAssets;