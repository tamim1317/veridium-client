import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MyTeam = () => {
    const axiosSecure = useAxiosSecure();

    const { data: team = [], isLoading } = useQuery({
        queryKey: ['my-team'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/team');
            return res.data;
        }
    });

    if (isLoading) return <div className="p-10 text-center"><span className="loading loading-spinner text-primary"></span></div>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">My Team Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map(member => (
                    <div key={member._id} className="card bg-base-100 shadow-xl border border-gray-100">
                        <figure className="px-10 pt-10">
                            <div className="avatar">
                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={member.profileImage || "https://via.placeholder.com/150"} alt={member.name} />
                                </div>
                            </div>
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{member.name}</h2>
                            <p className="text-gray-500 text-sm">{member.role === 'hr' ? 'Admin' : 'Member'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyTeam;