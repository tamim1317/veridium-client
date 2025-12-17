import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const HrRegister = () => {
    const { createUser } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            // 1. Firebase Signup
            const result = await createUser(data.email, data.password);
            
            // 2. Prepare User Object for MongoDB
            const userInfo = {
                uid: result.user.uid,
                name: data.name,
                email: data.email,
                companyName: data.companyName,
                companyLogo: data.companyLogo,
                role: 'hr',
                packageLimit: parseInt(data.package), // 5, 10, or 20
                currentEmployees: 0,
                registrationDate: new Date()
            };

            // 3. Save to MongoDB
            const res = await axiosPublic.post('/users', userInfo);
            if (res.data.insertedId) {
                toast.success('HR Account Created Successfully!');
                navigate('/dashboard/hr-home');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12">
                <h2 className="text-3xl font-bold text-center text-primary mb-8">Register as HR Manager</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div className="form-control">
                            <label className="label font-semibold">Full Name</label>
                            <input {...register("name", { required: true })} className="input input-bordered" placeholder="John Doe" />
                        </div>
                        {/* Company Name */}
                        <div className="form-control">
                            <label className="label font-semibold">Company Name</label>
                            <input {...register("companyName", { required: true })} className="input input-bordered" placeholder="Veridium Tech" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Email */}
                        <div className="form-control">
                            <label className="label font-semibold">Email</label>
                            <input type="email" {...register("email", { required: true })} className="input input-bordered" />
                        </div>
                        {/* Password */}
                        <div className="form-control">
                            <label className="label font-semibold">Password</label>
                            <input type="password" {...register("password", { required: true, minLength: 6 })} className="input input-bordered" />
                        </div>
                    </div>

                    {/* Package Selection - Mandatory Requirement */}
                    <div className="form-control">
                        <label className="label font-semibold text-secondary">Select Subscription Package</label>
                        <select {...register("package", { required: true })} className="select select-bordered w-full">
                            <option value="5">Basic (Up to 5 Employees) - $5</option>
                            <option value="10">Standard (Up to 10 Employees) - $8</option>
                            <option value="20">Premium (Up to 20 Employees) - $15</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary w-full mt-4 text-white">Complete Registration & Pay</button>
                </form>
            </div>
        </div>
    );
};

export default HrRegister;