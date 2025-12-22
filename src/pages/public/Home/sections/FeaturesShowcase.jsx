import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiRepeat, FiTruck, FiSettings, FiUsers, FiBarChart2 } from 'react-icons/fi';

const features = [
    { 
        icon: FiSearch, 
        title: "Advanced Search", 
        desc: "Find any asset instantly with powerful intelligent filtering.",
        className: "md:col-span-2 md:row-span-1 bg-gradient-to-br from-slate-900 to-slate-800"
    },
    { 
        icon: FiRepeat, 
        title: "Returnable Tracking", 
        desc: "Automated tracking for recoverable assets.",
        className: "md:col-span-1 md:row-span-1 bg-primary/10 border-primary/20" 
    },
    { 
        icon: FiUsers, 
        title: "Employee Quota", 
        desc: "Enforce strict limits based on subscription.",
        className: "md:col-span-1 md:row-span-2 bg-secondary/10 border-secondary/20"
    },
    { 
        icon: FiTruck, 
        title: "Request Flow", 
        desc: "Seamless employee requests routed to HR.",
        className: "md:col-span-1 md:row-span-1 bg-slate-50 border-gray-200" 
    },
    { 
        icon: FiBarChart2, 
        title: "Real-time Analytics", 
        desc: "Gain deep insights into your inventory health.",
        className: "md:col-span-2 md:row-span-1 bg-slate-900 text-white" 
    }
];

const FeaturesShowcase = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-3">Enterprise Capabilities</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                        Everything you need to manage your inventory.
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            className={`p-8 rounded-[2rem] border flex flex-col justify-center transition-all ${feature.className}`}
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 
                                ${feature.className.includes('slate-900') ? 'bg-white/10 text-white' : 'bg-white shadow-sm text-primary'}`}>
                                <feature.icon size={24} />
                            </div>
                            <h4 className={`text-xl font-bold mb-2 ${feature.className.includes('slate-900') ? 'text-white' : 'text-slate-900'}`}>
                                {feature.title}
                            </h4>
                            <p className={`text-sm leading-relaxed ${feature.className.includes('slate-900') ? 'text-slate-400' : 'text-slate-500'}`}>
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesShowcase;