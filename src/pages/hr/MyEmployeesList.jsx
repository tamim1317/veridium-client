import React, { useState } from 'react';
import useEmployees from '../../../hooks/useEmployees';

const MyEmployeesList = () => {
    const { 
        employees, 
        loading, 
        error, 
        packageInfo, 
        removeEmployee 
    } = useEmployees();
    
    const [removeLoading, setRemoveLoading] = useState(null);

    const handleRemove = async (employee) => {
        if (!window.confirm(`Are you sure you want to remove ${employee.employeeName} from your team? This will mark all assigned assets as returned.`)) {
            return;
        }

        setRemoveLoading(employee.employeeEmail);
        const result = await removeEmployee(employee.employeeEmail, employee.employeeName);
        
        if (result.success) {
            alert(result.message);
        } else {
            alert(`Error: ${result.message}`);
        }
        setRemoveLoading(null);
    };


    if (loading) {
        return <div className="text-center p-10"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    if (error) {
        return <div className="text-center text-error p-4 border rounded border-error bg-error/10">{error}</div>;
    }

    const usagePercent = (packageInfo.currentEmployees / packageInfo.packageLimit) * 100;
    const isOverLimit = packageInfo.currentEmployees >= packageInfo.packageLimit;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Affiliated Employee List</h2>

            {/* Package Usage Tracker */}
            <div className={`card shadow-lg ${isOverLimit ? 'bg-error text-error-content' : 'bg-success text-success-content'}`}>
                <div className="card-body p-6">
                    <h3 className="card-title">Employee Package Usage</h3>
                    <p className="text-lg font-bold">
                        {packageInfo.currentEmployees} / {packageInfo.packageLimit} employees used.
                        {isOverLimit && <span className="ml-2 badge badge-lg badge-warning">LIMIT REACHED!</span>}
                    </p>
                    <progress 
                        className={`progress w-full ${isOverLimit ? 'progress-error' : 'progress-success'}`} 
                        value={packageInfo.currentEmployees} 
                        max={packageInfo.packageLimit}
                    ></progress>
                    {!isOverLimit && <p className="text-sm">You have {packageInfo.packageLimit - packageInfo.currentEmployees} slots remaining.</p>}
                </div>
            </div>

            {/* Employee Table */}
            <div className="overflow-x-auto bg-base-100 rounded-lg shadow-lg">
                <table className="table w-full">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Affiliation Date</th>
                            <th>Assets Count</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center p-8 text-lg text-gray-500">
                                    No employees affiliated yet. Approve a request to start!
                                </td>
                            </tr>
                        ) : (
                            employees.map((emp) => (
                                <tr key={emp.employeeEmail}>
                                    <td className="font-bold">{emp.employeeName}</td>
                                    <td>{emp.employeeEmail}</td>
                                    <td>{new Date(emp.affiliationDate).toLocaleDateString()}</td>
                                    <td>{emp.assetsAssigned || 0}</td> 
                                    <td className="space-x-2">
                                        <button 
                                            className="btn btn-sm btn-error text-white" 
                                            onClick={() => handleRemove(emp)}
                                            disabled={removeLoading === emp.employeeEmail}
                                        >
                                            {removeLoading === emp.employeeEmail ? <span className="loading loading-spinner loading-xs"></span> : 'Remove from Team'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyEmployeeList;