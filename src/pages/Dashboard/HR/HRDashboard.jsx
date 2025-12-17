import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAssets from '../../../hooks/useAssets';
import useRequests from '../../../hooks/useRequest';

const HRDashboard = () => {
    const { assets } = useAssets();
    const { requests } = useRequests();

    // 1. Logic for Pie Chart: Returnable vs Non-returnable distribution
    const pieData = [
        { name: 'Returnable', value: assets.filter(a => a.productType === 'Returnable').length },
        { name: 'Non-returnable', value: assets.filter(a => a.productType === 'Non-returnable').length },
    ];

    const COLORS = ['#0D9488', '#F59E0B']; 
    // 2. Logic for Bar Chart: Top 5 most requested assets
    const requestCounts = requests.reduce((acc, req) => {
        acc[req.assetName] = (acc[req.assetName] || 0) + 1;
        return acc;
    }, {});

    const barData = Object.keys(requestCounts)
        .map(name => ({ name, count: requestCounts[name] }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    return (
        <div className="p-6 space-y-8 bg-base-100">
            <h2 className="text-3xl font-bold text-secondary">Veridium Insights</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Distribution Pie Chart */}
                <div className="card bg-white shadow-xl p-6 border border-base-200">
                    <h3 className="text-xl font-semibold mb-4">Asset Type Distribution</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Requests Bar Chart */}
                <div className="card bg-white shadow-xl p-6 border border-base-200">
                    <h3 className="text-xl font-semibold mb-4">Top 5 Requested Assets</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#0D9488" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HRDashboard;