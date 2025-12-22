import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiShield, FiCheckCircle } from 'react-icons/fi';
import image from "../../../../assets/images/veridium.png"
const HeroBanner = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0a0f1d] py-20">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] opacity-50"></div>
                <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] opacity-40"></div>
                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    
                    {/* Left Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:w-1/2 text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-semibold mb-8 backdrop-blur-md">
                            <FiShield className="text-secondary" />
                            <span className="tracking-wide uppercase">Trusted by 500+ Global HR Teams</span>
                        </div>
                        
                        <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-6">
                            Smart Asset <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-400 to-secondary">
                                Intelligence
                            </span> <br />
                            for Modern Teams.
                        </h1>
                        
                        <p className="text-lg text-slate-400 mb-10 max-w-xl leading-relaxed">
                            Stop losing track of company hardware. AssetVerse provides a high-fidelity dashboard to monitor, allocate, and recover corporate assets with zero friction.
                        </p>
                        
                        <div className="flex flex-wrap gap-4">
                            <a href="/join-hr" className="group btn btn-primary btn-lg px-8 rounded-xl transition-all hover:scale-105 shadow-[0_0_25px_rgba(var(--p),0.3)]">
                                Start as HR Manager
                                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a href="/join-employee" className="btn btn-outline btn-lg px-8 rounded-xl text-white border-white/20 hover:bg-white/10 backdrop-blur-sm">
                                Join Your Team
                            </a>
                        </div>

                        <div className="mt-10 flex items-center gap-6 text-slate-500">
                            <div className="flex items-center gap-2">
                                <FiCheckCircle className="text-success" /> <span className="text-sm">No credit card required</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiCheckCircle className="text-success" /> <span className="text-sm">14-day free trial</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Visual Element (The "Dashboard Preview") */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="lg:w-1/2 relative hidden lg:block"
                        style={{ perspective: "1000px" }}
                    >
                        {/* Glassmorphic Card Mockup */}
                        <div className="relative bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-4 shadow-2xl backdrop-blur-xl">
                            <div className="rounded-2xl overflow-hidden shadow-inner border border-white/10 bg-[#0f172a]">
                                <img src={image} alt="" />
                            </div>
                            
                            {/* Floating Badge 1 */}
                            <motion.div 
                                animate={{ y: [0, -15, 0] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                                className="absolute -top-6 -right-6 bg-secondary p-4 rounded-2xl shadow-xl"
                            >
                                <div className="text-white font-bold text-xl">98%</div>
                                <div className="text-white/80 text-[10px] uppercase font-bold tracking-tighter">Efficiency Boost</div>
                            </motion.div>

                            {/* Floating Badge 2 */}
                            <motion.div 
                                animate={{ y: [0, 15, 0] }}
                                transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                                className="absolute -bottom-10 -left-10 bg-slate-800 border border-white/10 p-5 rounded-2xl shadow-2xl backdrop-blur-md"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                        <FiShield className="text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-white text-sm font-bold">Encrypted Data</div>
                                        <div className="text-slate-400 text-xs">Military-grade security</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default HeroBanner;