import React, { useState } from 'react';
import useAvailableAssets from '../../../hooks/useAvailableAssets';
import { useAuth } from '../../../context/AuthContext';

const assetTypes = ['', 'Returnable', 'Non-returnable'];

const RequestAsset = () => {
    const { 
        assets, 
        loading, 
        error, 
        searchTerm, 
        assetTypeFilter, 
        setSearchTerm, 
        setAssetTypeFilter, 
        submitRequest 
    } = useAvailableAssets();
    
    const { user } = useAuth();
    const [requestLoading, setRequestLoading] = useState(null);

    const handleRequest = async (asset) => {
        // Simple prompt for quantity, enhanced with a modal later
        const quantityText = prompt(`Enter quantity for ${asset.productName} (Max available: ${asset.availableQuantity}):`, "1");
        
        if (quantityText === null) return; // Cancelled
        
        const quantity = parseInt(quantityText);

        if (isNaN(quantity) || quantity <= 0 || quantity > asset.availableQuantity) {
            alert("Invalid quantity. Please enter a valid number within the available stock.");
            return;
        }

        setRequestLoading(asset._id);
        const result = await submitRequest(asset._id, asset.productName, quantity);
        
        if (result.success) {
            alert(`Request for ${asset.productName} submitted successfully! Status: PENDING.`);
        } else {
            alert(`Request Failed: ${result.message}`);
        }
        setRequestLoading(null);
    };


    if (loading) {
        return <div className="text-center p-10"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    if (error) {
        return <div className="text-center text-error p-4 border rounded border-error bg-error/10">{error}</div>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Available Assets for Request</h2>
            
            {/* Filter and Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
                <label className="input input-group w-full md:w-1/2">
                    <span>Search</span>
                    <input 
                        type="text" 
                        placeholder="Search by Asset Name" 
                        className="input input-bordered w-full" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </label>
                
                <label className="input-group w-full md:w-1/4">
                    <span>Type</span>
                    <select 
                        className="select select-bordered w-full"
                        value={assetTypeFilter}
                        onChange={(e) => setAssetTypeFilter(e.target.value)}
                    >
                        <option value="">All Types</option>
                        <option value="Returnable">Returnable</option>
                        <option value="Non-returnable">Non-returnable</option>
                    </select>
                </label>
                
            </div>

            {/* Asset Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {assets.length === 0 ? (
                    <div className="col-span-full text-center p-10 text-xl text-gray-500 bg-gray-100 rounded-lg">
                        No available assets match your criteria.
                    </div>
                ) : (
                    assets.map((asset) => (
                        <div key={asset._id} className="card bg-base-100 shadow-xl border border-gray-200">
                            <figure className="h-48 overflow-hidden bg-gray-50">
                                <img 
                                    src={asset.productImage || 'https://via.placeholder.com/400'} 
                                    alt={asset.productName} 
                                    className="object-cover w-full h-full"
                                />
                            </figure>
                            <div className="card-body p-4">
                                <h3 className="card-title text-lg">{asset.productName}</h3>
                                <div className="flex justify-between text-sm font-medium">
                                    <span className={`badge ${asset.productType === 'Returnable' ? 'badge-info' : 'badge-warning'}`}>
                                        {asset.productType}
                                    </span>
                                    <span className="text-success">Available: {asset.availableQuantity}</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">Added by: {asset.hrEmail}</p>

                                <div className="card-actions justify-end mt-4">
                                    <button 
                                        className="btn btn-primary btn-sm w-full"
                                        onClick={() => handleRequest(asset)}
                                        disabled={requestLoading === asset._id || asset.availableQuantity === 0}
                                    >
                                        {requestLoading === asset._id ? <span className="loading loading-spinner loading-xs"></span> : 'Request Asset'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RequestAsset;