import React from 'react';
import { FaBoxes, FaShieldAlt, FaChartLine } from 'react-icons/fa';

const features = [
    { icon: FaBoxes, title: "Centralized Inventory", desc: "Keep track of every laptop, monitor, and license in one secure location." },
    { icon: FaShieldAlt, title: "Role-Based Security", desc: "HR Managers manage, Employees request. Strict access control enforced." },
    { icon: FaChartLine, title: "Efficiency & Reporting", desc: "Reduce loss, streamline procurement, and gain insights into asset lifecycle." }
];

const AboutSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-12 text-gray-800">Why Choose Veridium?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <div key={index} className="p-6 bg-base-100 shadow-xl rounded-lg transform hover:scale-105 transition duration-300">
                            <feature.icon className="text-6xl text-primary mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;