import React from 'react';
import { FaUserPlus, FaRegListAlt, FaLaptop } from 'react-icons/fa';

const steps = [
    { icon: FaUserPlus, title: "Register & Setup", desc: "HR Manager registers and defines the company's asset tracking policies." },
    { icon: FaRegListAlt, title: "Inventory Management", desc: "HR adds assets to the inventory, setting quantity and return policies." },
    { icon: FaLaptop, title: "Request & Track", desc: "Employees request assets, HR approves, and the system tracks status automatically." }
];

const HowItWorks = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-12 text-gray-800">Simple 3-Step Process</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-3xl font-bold mb-4">
                                {index + 1}
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;