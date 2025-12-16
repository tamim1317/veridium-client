import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Profile = () => {
    const { user, loading: authLoading, fetchUser } = useAuth();
    const axiosSecure = useAxiosSecure();
    
    // State for the form data, initialized with user data
    const [formData, setFormData] = useState({});
    const [updateLoading, setUpdateLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Update form state when user object changes
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                photoURL: user.photoURL || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateLoading(true);
        setError('');
        setSuccess('');

        try {
            // Server endpoint to update user profile
            const res = await axiosSecure.patch('/users/profile', formData);
            
            await fetchUser(); 
            
            setSuccess('Profile updated successfully!');
            setError('');
        } catch (err) {
            console.error("Profile update failed:", err);
            setError(err.response?.data?.message || 'Failed to update profile.');
            setSuccess('');
        } finally {
            setUpdateLoading(false);
        }
    };

    if (authLoading || !user) {
        return <div className="text-center p-10"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    const isHR = user.role === 'hr';
    
    return (
        <div className="max-w-4xl mx-auto bg-white p-8 shadow-2xl rounded-xl">
            <h2 className="text-3xl font-bold mb-6 text-primary border-b pb-3">
                My Profile ({user.role.toUpperCase()})
            </h2>

            <div className="flex flex-col md:flex-row gap-10">
                
                {/* Profile Photo and Static Info */}
                <div className="md:w-1/3 flex flex-col items-center p-4 bg-base-100 rounded-lg shadow-md">
                    <div className="avatar mb-4">
                        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img 
                                src={user.photoURL || 'https://via.placeholder.com/150'} 
                                alt="Profile" 
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{user.name}</h3>
                    <p className="text-gray-500 mb-4">{user.email}</p>
                    
                    {isHR && (
                        <div className="stats shadow bg-warning text-warning-content w-full mt-4">
                            <div className="stat place-items-center">
                                <div className="stat-title">Package Limit</div>
                                <div className="stat-value text-3xl">{user.packageLimit}</div>
                                <div className="stat-desc">Current Employees: {user.currentEmployees}</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile Update Form */}
                <div className="md:w-2/3">
                    <h3 className="text-2xl font-semibold mb-4 text-secondary">Update Information</h3>
                    
                    {success && <div role="alert" className="alert alert-success mb-4"><span>{success}</span></div>}
                    {error && <div role="alert" className="alert alert-error mb-4"><span>{error}</span></div>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        {/* Name */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Full Name</span></label>
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name || ''} 
                                onChange={handleChange} 
                                required 
                                className="input input-bordered w-full"
                            />
                        </div>
                        
                        {/* Photo URL */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Profile Photo URL</span></label>
                            <input 
                                type="url" 
                                name="photoURL" 
                                value={formData.photoURL || ''} 
                                onChange={handleChange} 
                                className="input input-bordered w-full" 
                                placeholder="Paste new image URL here"
                            />
                        </div>
                        
                        <div className="form-control pt-4">
                            <button type="submit" className="btn btn-primary" disabled={updateLoading}>
                                {updateLoading ? <span className="loading loading-spinner"></span> : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;