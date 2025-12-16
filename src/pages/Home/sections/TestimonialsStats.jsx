import React from 'react';

const stats = [
    { value: "100+", label: "Companies Trust Us" },
    { value: "99.9%", label: "Asset Tracking Accuracy" },
    { value: "50K+", label: "Assets Managed" }
];

const TestimonialsStats = () => {
    return (
        <section className="py-20 bg-base-300">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-12 text-gray-800">What Our Clients Say</h2>
                
                <blockquote className="max-w-3xl mx-auto p-8 bg-white shadow-2xl rounded-xl italic text-lg border-l-4 border-primary mb-12">
                    "Since implementing AssetVerse, our quarterly inventory reconciliation time has dropped by 80%. The system is intuitive, and the employee request feature is a game-changer."
                    <footer className="mt-4 font-semibold not-italic text-primary">
                        — Sarah L., Head of HR at TechCorp Solutions
                    </footer>
                </blockquote>

                {/* Stats */}
                <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat p-8">
                            <div className="stat-title">{stat.label}</div>
                            <div className="stat-value text-primary">{stat.value}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsStats;