import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const AddEmployee = () => {
    const axiosSecure = useAxiosSecure();

    // 1. Fetch employees who have hrId: null
    const { data: availableEmployees = [], refetch } = useQuery({
        queryKey: ['availableEmployees'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/available');
            return res.data;
        }
    });

    const handleAddToTeam = async (employeeId) => {
        try {
            const res = await axiosSecure.patch(`/users/add-to-team/${employeeId}`);
            if (res.data.success) {
                toast.success("Employee added to your team!");
                refetch();
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Check your package limit!");
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Add Employees to Your Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableEmployees.map(emp => (
                    <div key={emp._id} className="card bg-white shadow-md border p-5 flex flex-row items-center justify-between">
                        <div>
                            <p className="font-bold">{emp.name}</p>
                            <p className="text-sm text-gray-500">{emp.email}</p>
                        </div>
                        <button 
                            onClick={() => handleAddToTeam(emp._id)}
                            className="btn btn-primary btn-sm"
                        >
                            Add to Team
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddEmployee;