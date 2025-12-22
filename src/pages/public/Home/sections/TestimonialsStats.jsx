import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiCheckCircle } from 'react-icons/fi';

const reviews = [
    {
        name: "Sarah Jenkins",
        role: "HR Director @ TechFlow",
        text: "Veridium transformed our chaotic spreadsheet system into a streamlined masterpiece. Our recovery rate for returnable assets hit 99% within the first month.",
        image: "https://i.pravatar.cc/150?u=sarah",
        rating: 5
    },
    {
        name: "Marcus Thorne",
        role: "Operations Manager",
        text: "The employee request flow is seamless. It saved our IT department roughly 15 hours a week in manual coordination.",
        image: "https://i.pravatar.cc/150?u=marcus",
        rating: 5
    },
    {
        name: "Elena Rodriguez",
        role: "Senior HR Specialist",
        text: "Finally, a tool that understands the scale of a growing company. The package upgrades are fair and the analytics are gold.",
        image: "https://i.pravatar.cc/150?u=elena",
        rating: 5
    }
];

const TestimonialsStats = () => {
    return (
        <section className="py-24 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-3">Wall of Love</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Trusted by HR Teams Worldwide</h3>
                    <p className="text-slate-500 max-w-2xl mx-auto">Don't just take our word for it. Join thousands of managers who simplified their workflow.</p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {reviews.map((rev, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
                        >
                            <div>
                                <div className="flex gap-1 mb-4 text-warning">
                                    {[...Array(rev.rating)].map((_, i) => <FiStar key={i} fill="currentColor" />)}
                                </div>
                                <p className="text-slate-600 italic leading-relaxed mb-6">"{rev.text}"</p>
                            </div>
                            <div className="flex items-center gap-4 border-t pt-6">
                                <img src={rev.image} alt={rev.name} className="w-12 h-12 rounded-full border-2 border-primary/20" />
                                <div>
                                    <h4 className="font-bold text-slate-900 flex items-center gap-1 text-sm">
                                        {rev.name} <FiCheckCircle className="text-primary" size={14} />
                                    </h4>
                                    <p className="text-slate-500 text-xs">{rev.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Big Stats Counter */}
                <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10">
                        <div>
                            <div className="text-5xl font-black text-white mb-2">50k+</div>
                            <div className="text-slate-400 uppercase tracking-widest text-xs font-bold">Assets Tracked</div>
                        </div>
                        <div className="border-y md:border-y-0 md:border-x border-white/10 py-8 md:py-0">
                            <div className="text-5xl font-black text-primary mb-2">99.9%</div>
                            <div className="text-slate-400 uppercase tracking-widest text-xs font-bold">Uptime Reliability</div>
                        </div>
                        <div>
                            <div className="text-5xl font-black text-white mb-2">120+</div>
                            <div className="text-slate-400 uppercase tracking-widest text-xs font-bold">Global Enterprises</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsStats;