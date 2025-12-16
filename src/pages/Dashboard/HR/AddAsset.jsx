import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const assetTypes = ["Returnable", "Non-returnable"];

const AddAsset = () => {
    const axiosSecure = useAxiosSecure();
    const [formData, setFormData] = useState({
        productName: '',
        productImage: '',
        productType: assetTypes[0],
        productQuantity: 1,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
        setSuccess('');

        try {
            const res = await axiosSecure.post('/assets', formData); 
            
            setSuccess(`Asset "${res.data.asset.productName}" added successfully!`);
            setError('');
            // Reset form fields after successful submission
            setFormData({
                productName: '',
                productImage: '',
                productType: assetTypes[0],
                productQuantity: 1,
            });

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to add asset. Check server logs.');
            setSuccess('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg">
            <h2 className="text-3xl font-bold text-primary mb-6 text-center">Add New Asset to Inventory</h2>
            
            {success && <div role="alert" className="alert alert-success mb-4"><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>{success}</span></div>}
            {error && <div role="alert" className="alert alert-error mb-4"><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>{error}</span></div>}

            <form onSubmit={handleSubmit}>
                
                {/* Product Name */}
                <div className="form-control mb-4">
                    <label className="label"><span className="label-text">Product Name</span></label>
                    <input type="text" name="productName" value={formData.productName} onChange={handleChange} required className="input input-bordered w-full" placeholder="e.g., MacBook Pro 14 inch" />
                </div>
                
                {/* Product Image URL */}
                <div className="form-control mb-4">
                    <label className="label"><span className="label-text">Product Image URL (ImgBB/Cloudinary)</span></label>
                    <input type="url" name="productImage" value={formData.productImage} onChange={handleChange} required className="input input-bordered w-full" placeholder="https://image-url.com/asset.jpg" />
                </div>

                {/* Product Type */}
                <div className="form-control mb-4">
                    <label className="label"><span className="label-text">Product Type</span></label>
                    <select name="productType" value={formData.productType} onChange={handleChange} required className="select select-bordered w-full">
                        {assetTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                
                {/* Product Quantity */}
                <div className="form-control mb-6">
                    <label className="label"><span className="label-text">Quantity (Initial Stock)</span></label>
                    <input type="number" name="productQuantity" value={formData.productQuantity} onChange={handleChange} required min="1" className="input input-bordered w-full" />
                </div>

                <div className="form-control">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? <span className="loading loading-spinner"></span> : 'Add Asset'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAsset;