import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useAxiosSecure from '../../../hooks/useAxiosSecure'; 
import StripePaymentForm from '../../../components/Dashboard/StripePaymentForm'; 
import { useAuth } from '../../../context/AuthContext';

// Load Stripe with Public Key from environment variables
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const packages = [
    { name: "Basic", employeeLimit: 5, price: 5, features: ["Asset Tracking", "Employee Management", "Basic Support"], id: 'basic' },
    { name: "Standard", employeeLimit: 10, price: 8, features: ["All Basic features", "Advanced Analytics", "Priority Support"], id: 'standard' },
    { name: "Premium", employeeLimit: 20, price: 15, features: ["All Standard features", "Custom Branding", "24/7 Support"], id: 'premium' }
];

const UpgradePackage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const [selectedPackage, setSelectedPackage] = useState(packages.find(p => p.id === user?.subscription) || packages[0]);
    const [clientSecret, setClientSecret] = useState('');
    const [loadingIntent, setLoadingIntent] = useState(false);
    const [error, setError] = useState('');

    // --- 1. Fetch Client Secret from Server ---
    useEffect(() => {
        if (selectedPackage && selectedPackage.price > 0) {
            setLoadingIntent(true);
            setError('');
            axiosSecure.post('/payments/create-payment-intent', { amount: selectedPackage.price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => {
                    console.error("Failed to fetch client secret:", err);
                    setError('Could not initialize payment. Server error.');
                })
                .finally(() => {
                    setLoadingIntent(false);
                });
        }
    }, [selectedPackage, axiosSecure]);

    const handlePackageSelect = (pkg) => {
        setSelectedPackage(pkg);
        setClientSecret('');
    };
    
    // Determine card color based on selected package
    const getCardClass = (pkg) => {
        if (pkg.id === 'premium') return 'bg-warning text-warning-content';
        if (pkg.id === 'standard') return 'bg-info text-info-content';
        return 'bg-secondary text-secondary-content';
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-8 text-center text-primary">Upgrade Your Employee Package</h2>
            
            {/* Package Display Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {packages.map((pkg) => (
                    <div 
                        key={pkg.id}
                        className={`card shadow-xl cursor-pointer transition-all duration-300 ${getCardClass(pkg)}
                            ${selectedPackage.id === pkg.id ? 'border-4 border-accent ring-4 ring-accent/50' : 'border-2 border-transparent'}`}
                        onClick={() => handlePackageSelect(pkg)}
                    >
                        <div className="card-body items-center text-center">
                            <h3 className="card-title text-3xl font-extrabold">{pkg.name}</h3>
                            <p className="text-5xl font-bold my-4">${pkg.price}</p>
                            <p className="text-lg mb-4">{pkg.employeeLimit} Employee Slots</p>
                            <ul className="list-disc list-inside text-left space-y-1">
                                {pkg.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                            <div className="card-actions justify-center mt-6">
                                <button className="btn btn-sm btn-outline">
                                    {user?.subscription === pkg.id ? 'Current Plan' : 'Select'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Payment Section */}
            <div className="max-w-xl mx-auto border-t-2 pt-8">
                <h3 className="text-2xl font-semibold mb-6">Payment for {selectedPackage.name} Package</h3>

                {loadingIntent && <div className="text-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>}
                {error && <div role="alert" className="alert alert-error mb-4"><span>{error}</span></div>}

                {clientSecret && !loadingIntent && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <StripePaymentForm 
                            packageData={selectedPackage} 
                            clientSecret={clientSecret} 
                        />
                    </Elements>
                )}
            </div>
        </div>
    );
};

export default UpgradePackage;