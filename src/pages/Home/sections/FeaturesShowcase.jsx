import React from 'react';
import { FiSearch, FiRepeat, FiTruck, FiSettings, FiUsers } from 'react-icons/fi';

const features = [
    { icon: FiSearch, title: "Advanced Search", desc: "Find any asset instantly with powerful filtering." },
    { icon: FiRepeat, title: "Returnable Tracking", desc: "Automated tracking of return dates for recoverable assets." },
    { icon: FiTruck, title: "Request & Approval Flow", desc: "Seamless employee requests routed directly to HR for review." },
    { icon: FiSettings, title: "Custom Fields", desc: "Customize asset properties to fit unique corporate needs." },
    { icon: FiUsers, title: "Employee Quota", desc: "Enforce strict limits based on your company's subscription package." }
];

const FeaturesShowcase = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Core Features Designed for HR</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition">
                            <feature.icon className="text-4xl text-accent flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-xl font-semibold mb-1">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesShowcase;