import React from 'react';

const packages = [
    { name: "Basic", limit: 5, price: 5, features: ["Asset Tracking", "Employee Management"], color: "bg-secondary" },
    { name: "Standard", limit: 10, price: 8, features: ["All Basic", "Advanced Analytics", "Priority Support"], color: "bg-info" },
    { name: "Premium", limit: 20, price: 15, features: ["All Standard", "Custom Branding", "24/7 Support"], color: "bg-warning" }
];

const PackagesSection = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-4 text-gray-800">Affordable Pricing Plans</h2>
                <p className="text-xl mb-12 text-gray-600">Start small and scale with your company's growth.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {packages.map((pkg, index) => (
                        <div key={index} className={`card shadow-2xl ${pkg.color} text-white transform hover:translate-y-[-5px] transition duration-300`}>
                            <div className="card-body items-center text-center">
                                <h3 className="card-title text-4xl font-extrabold mb-2">{pkg.name}</h3>
                                <p className="text-6xl font-bold my-4">${pkg.price}<span className="text-xl font-normal">/mo</span></p>
                                <p className="text-lg font-semibold mb-6">{pkg.limit} Employee Slots</p>
                                <ul className="list-disc list-inside text-left space-y-2 mb-8">
                                    {pkg.features.map((feature, i) => (
                                        <li key={i}>{feature}</li>
                                    ))}
                                </ul>
                                <a href="/join-hr" className="btn btn-accent btn-lg text-black font-bold">
                                    Get Started
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PackagesSection;