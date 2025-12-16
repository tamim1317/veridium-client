import React, { useState } from 'react';
import useAssets from '../../../hooks/useAssets';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AssetList = () => {
    const { 
        assets, 
        loading, 
        error, 
        currentPage, 
        totalPages, 
        searchTerm, 
        handlePageChange, 
        handleSearchChange, 
        refetch 
    } = useAssets();
    
    const axiosSecure = useAxiosSecure();
    const [deleteLoading, setDeleteLoading] = useState(null);

    // --- CRUD: Delete Function ---
    const handleDelete = async (assetId, assetName) => {
        if (!window.confirm(`Are you sure you want to delete the asset: ${assetName}? This action is permanent.`)) {
            return;
        }

        setDeleteLoading(assetId);
        try {
            // Secure DELETE request to server
            await axiosSecure.delete(`/assets/${assetId}`);
            alert(`Asset: ${assetName} deleted successfully.`);
            refetch();
        } catch (err) {
            console.error("Delete failed:", err);
            alert(`Failed to delete asset: ${err.response?.data?.message || 'Server Error'}`);
        } finally {
            setDeleteLoading(null);
        }
    };

    if (loading) {
        return <div className="text-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    if (error) {
        return <div className="text-center text-error p-4 border rounded">{error}</div>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">My Company Asset Inventory</h2>

            {/* Search Bar */}
            <div className="flex justify-between items-center mb-6">
                <label className="input input-bordered flex items-center gap-2 w-full max-w-sm">
                    <input 
                        type="text" 
                        className="grow" 
                        placeholder="Search by Asset Name" 
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.854a5.25 5.25 0 1 1 1.414-1.414l3.18 3.18a1 1 0 0 1-1.414 1.414l-3.18-3.18Zm-4.885-1.414a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" /></svg>
                </label>
                <button onClick={refetch} className="btn btn-outline btn-sm">Refresh List</button>
            </div>

            {/* Asset Table */}
            <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
                <table className="table w-full">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Total Qty</th>
                            <th>Available Qty</th>
                            <th>Date Added</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assets.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center p-8 text-lg text-gray-500">
                                    No assets found. {searchTerm && `Try searching again or `} 
                                    <Link to="/dashboard/hr/add-asset" className="link link-primary">Add a new asset.</Link>
                                </td>
                            </tr>
                        ) : (
                            assets.map((asset) => (
                                <tr key={asset._id}>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={asset.productImage} alt={asset.productName} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-bold">{asset.productName}</td>
                                    <td>
                                        <span className={`badge ${asset.productType === 'Returnable' ? 'badge-info' : 'badge-warning'}`}>
                                            {asset.productType}
                                        </span>
                                    </td>
                                    <td>{asset.productQuantity}</td>
                                    <td><span className="text-success font-semibold">{asset.availableQuantity}</span></td>
                                    <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>
                                    <td className="space-x-2">

                                        <button className="btn btn-sm btn-info text-white">Edit</button>
                                        <button 
                                            className="btn btn-sm btn-error text-white" 
                                            onClick={() => handleDelete(asset._id, asset.productName)}
                                            disabled={deleteLoading === asset._id}
                                        >
                                            {deleteLoading === asset._id ? <span className="loading loading-spinner"></span> : 'Delete'}
                                        </button>
                                    </td>
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
                            « Previous
                        </button>
                        {[...Array(totalPages).keys()].map(pageIndex => (
                            <button
                                key={pageIndex + 1}
                                className={`join-item btn ${currentPage === pageIndex + 1 ? 'btn-active btn-primary' : ''}`}
                                onClick={() => handlePageChange(pageIndex + 1)}
                            >
                                {pageIndex + 1}
                            </button>
                        ))}
                        <button 
                            className="join-item btn" 
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next »
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssetList;