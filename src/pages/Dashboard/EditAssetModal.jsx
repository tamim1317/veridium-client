import React, { useState, useEffect } from 'react';
import useAssets from '../../hooks/useAssets';

const assetTypes = ["Returnable", "Non-returnable"];

const EditAssetModal = ({ asset, onClose }) => {
    const { updateAsset } = useAssets(); 
    const [formData, setFormData] = useState(asset || {});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setFormData(asset || {});
    }, [asset]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' ? parseInt(value) : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const updateData = {
            productName: formData.productName,
            productImage: formData.productImage,
            productType: formData.productType,
            productQuantity: formData.productQuantity,
        };

        const result = await updateAsset(asset._id, updateData);

        if (result.success) {
            alert(`Asset: ${result.asset.productName} updated successfully!`);
            onClose();
        } else {
            setError(result.error);
        }
        setLoading(false);
    };
    
    // DaisyUI modal structure
    return (
        <dialog id="edit_asset_modal" className="modal modal-bottom sm:modal-middle" open={!!asset}>
            <div className="modal-box">
                <h3 className="font-bold text-lg text-primary">Edit Asset: {asset?.productName}</h3>
                <p className="py-4 text-sm">Update inventory details below.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Product Name */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Product Name</span></label>
                        <input type="text" name="productName" value={formData.productName || ''} onChange={handleChange} required className="input input-bordered w-full" />
                    </div>
                    
                    {/* Product Image URL */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Image URL</span></label>
                        <input type="url" name="productImage" value={formData.productImage || ''} onChange={handleChange} required className="input input-bordered w-full" />
                    </div>

                    {/* Product Type */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Product Type</span></label>
                        <select name="productType" value={formData.productType || assetTypes[0]} onChange={handleChange} required className="select select-bordered w-full">
                            {assetTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    
                    {/* Product Quantity */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Total Quantity</span></label>
                        <input type="number" name="productQuantity" value={formData.productQuantity || 1} onChange={handleChange} required min="1" className="input input-bordered w-full" />
                    </div>

                    {error && <p className="text-error text-sm mt-2">{error}</p>}

                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? <span className="loading loading-spinner"></span> : 'Save Changes'}
                        </button>
                        <button type="button" className="btn btn-ghost" onClick={onClose} disabled={loading}>Close</button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default EditAssetModal;