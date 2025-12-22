import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isUpdating, setIsUpdating] = useState(false);
    const { register, handleSubmit, reset, watch } = useForm();
    
    // Watch for image changes to show a preview (Optional but professional)
    const imageFile = watch("image");

    const img_api_key = import.meta.env.VITE_IMGBB_API_KEY;
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_api_key}`;

    const onSubmit = async (data) => {
        setIsUpdating(true);
        try {
            let photoURL = user?.photoURL;

            // 1. Upload to ImgBB if a new image is provided
            if (data.image && data.image[0]) {
                const formData = new FormData();
                formData.append('image', data.image[0]);
                const res = await axios.post(img_hosting_url, formData);
                if (res.data.success) {
                    photoURL = res.data.data.display_url;
                }
            }

            // 2. Update Firebase Authentication Profile
            await updateUserProfile(data.name, photoURL);
            
            // 3. Sync with MongoDB (CRITICAL STEP)
            const updatedInfo = {
                name: data.name,
                image: photoURL
            };
            
            const dbResponse = await axiosSecure.patch(`/users/update/${user?.email}`, updatedInfo);

            if (dbResponse.data.modifiedCount > 0 || dbResponse.data.success) {
                toast.success("Profile & Database updated successfully!");
            } else {
                toast.success("Profile updated!");
            }
            
            reset();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile");
            console.error(error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                {/* Header/Cover Area */}
                <div className="h-32 bg-gradient-to-r from-teal-500 to-emerald-600"></div>
                
                <div className="px-8 pb-8">
                    <div className="relative -mt-16 mb-6 flex items-end justify-between">
                        <div className="relative">
                            <img 
                                src={user?.photoURL || 'https://via.placeholder.com/150'} 
                                alt="Profile" 
                                className="w-32 h-32 rounded-full border-4 border-white object-cover bg-gray-200 shadow-md"
                            />
                            <div className="absolute bottom-2 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Info Section */}
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800">{user?.displayName || 'User Name'}</h2>
                                <p className="text-gray-500 font-medium">Employee / Team Member</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="badge badge-ghost font-mono">{user?.email}</span>
                            </div>
                            <div className="divider"></div>
                            <p className="text-gray-500 italic text-sm">
                                Tip: Use a professional photo to help your HR manager identify you quickly.
                            </p>
                        </div>

                        {/* Update Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <h3 className="font-bold text-lg text-gray-700">Edit Details</h3>
                            
                            <div className="form-control">
                                <label className="label font-semibold text-gray-600">Full Name</label>
                                <input 
                                    type="text"
                                    {...register("name")} 
                                    defaultValue={user?.displayName}
                                    className="input input-bordered focus:input-primary" 
                                    placeholder="Enter your full name"
                                    required 
                                />
                            </div>

                            <div className="form-control">
                                <label className="label font-semibold text-gray-600">Update Profile Picture</label>
                                <input 
                                    type="file" 
                                    {...register("image")}
                                    className="file-input file-input-bordered file-input-primary w-full" 
                                    accept="image/*"
                                />
                                {imageFile?.[0] && <p className="text-xs mt-2 text-success">New image selected: {imageFile[0].name}</p>}
                            </div>

                            <button 
                                type="submit"
                                className={`btn btn-primary w-full mt-4 text-white ${isUpdating ? 'loading' : ''}`}
                                disabled={isUpdating}
                            >
                                {isUpdating ? 'Synchronizing...' : 'Save Changes'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;