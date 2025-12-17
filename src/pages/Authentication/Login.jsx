import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
    const { login, googleLogin } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const result = await login(data.email, data.password);
            toast.success('Welcome back to Veridium!');
            // Dynamic redirection based on role
            if (result?.user?.role === 'hr') navigate('/dashboard/hr-home');
            else navigate('/dashboard/employee-home');
        } catch (error) {
            toast.error(error.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await googleLogin();
            toast.success('Logged in with Google!');
            navigate('/');
        } catch (error) {
            toast.error('Google Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="flex flex-col md:flex-row shadow-2xl rounded-3xl overflow-hidden max-w-5xl w-full m-4 bg-white">
                
                {/* Left Side: Branding/Visual */}
                <div className="md:w-1/2 bg-primary p-12 text-white flex flex-col justify-center items-center text-center space-y-6">
                    <h1 className="text-5xl font-bold">Veridium</h1>
                    <p className="text-lg opacity-90 font-light">
                        The ultimate intelligent asset management platform. Track, assign, and manage company property with ease.
                    </p>
                    <div className="hidden md:block">
                         <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-md">Real-time Tracking</div>
                            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-md">HR Analytics</div>
                            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-md">Secure Returns</div>
                            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-md">PDF Reporting</div>
                         </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="md:w-1/2 p-8 md:p-12">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-800">Login</h2>
                        <p className="text-gray-500">Enter your details to access your account</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Email Input */}
                        <div className="form-control">
                            <label className="label text-sm font-semibold text-gray-600">Email Address</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <FaEnvelope />
                                </span>
                                <input 
                                    type="email" 
                                    {...register("email", { required: "Email is required" })}
                                    className={`input input-bordered w-full pl-10 focus:ring-primary ${errors.email ? 'input-error' : ''}`} 
                                    placeholder="name@company.com" 
                                />
                            </div>
                            {errors.email && <span className="text-error text-xs mt-1">{errors.email.message}</span>}
                        </div>

                        {/* Password Input */}
                        <div className="form-control">
                            <label className="label text-sm font-semibold text-gray-600">Password</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <FaLock />
                                </span>
                                <input 
                                    type="password" 
                                    {...register("password", { required: "Password is required" })}
                                    className={`input input-bordered w-full pl-10 focus:ring-primary ${errors.password ? 'input-error' : ''}`} 
                                    placeholder="••••••••" 
                                />
                            </div>
                            {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="btn btn-primary w-full text-white mt-4"
                        >
                            {loading ? <span className="loading loading-spinner"></span> : 'Sign In'}
                        </button>
                    </form>

                    <div className="divider my-8">OR</div>

                    <button 
                        onClick={handleGoogleLogin}
                        className="btn btn-outline btn-neutral w-full flex items-center justify-center gap-2"
                    >
                        <FaGoogle className="text-red-500" /> Continue with Google
                    </button>

                    <p className="text-center mt-8 text-sm text-gray-600">
                        Don't have an account? <br />
                        <Link to="/register/employee" className="text-primary font-bold hover:underline">Join as Employee</Link> 
                        <span className="mx-2">|</span>
                        <Link to="/register/hr" className="text-secondary font-bold hover:underline">Register as HR</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;