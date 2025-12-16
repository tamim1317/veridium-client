import React from 'react';
import { motion } from 'framer-motion';

const HeroBanner = () => {
    return (
        <div className="hero min-h-[70vh] bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-4xl">
                    <h1 className="text-6xl font-extrabold text-primary leading-tight animate-fade-in-down">
                        Master Your Corporate Assets with <span className="text-secondary">AssetVerse</span>
                    </h1>
                    <p className="py-6 text-xl text-gray-700 animate-fade-in-up delay-200">
                        The ultimate cloud platform for seamless tracking, management, and allocation of company resources. Get insights, enforce policies, and boost efficiency.
                    </p>
                    <div className="space-x-4 mt-4 animate-fade-in-up delay-400">
                        <a href="/join-hr" className="btn btn-primary btn-lg shadow-lg hover:shadow-xl">
                            Start as HR Manager
                        </a>
                        <a href="/join-employee" className="btn btn-outline btn-lg btn-secondary">
                            Join Your Team
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;