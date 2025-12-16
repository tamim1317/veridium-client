import React from 'react';
import useEmployeeTeam from '../../../hooks/useEmployeeTeam';

const MyTeam = () => {
    const { 
        team, 
        loading, 
        error, 
        fetchTeam 
    } = useEmployeeTeam();
    
    if (loading) {
        return <div className="text-center p-10"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    if (error) {
        return <div className="text-center text-error p-4 border rounded border-error bg-error/10">{error}</div>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">My Affiliated Team Members</h2>
            
            <div className="overflow-x-auto bg-base-100 rounded-lg shadow-lg">
                <table className="table w-full">
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th>Member Name</th>
                            <th>Email</th>
                            <th>Affiliation Date</th>
                            <th>Assets Assigned</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center p-8 text-lg text-gray-500">
                                    No other team members found in your company.
                                </td>
                            </tr>
                        ) : (
                            team.map((member) => (
                                <tr key={member.employeeEmail}>
                                    <td className="font-bold">{member.employeeName}</td>
                                    <td>{member.employeeEmail}</td>
                                    <td>{new Date(member.affiliationDate).toLocaleDateString()}</td>
                                    <td>
                                        <span className="font-semibold text-primary">
                                            {member.assetsAssigned || 0}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <button onClick={fetchTeam} className="btn btn-outline btn-sm btn-primary mt-4">Refresh Team List</button>
        </div>
    );
};

export default MyTeam;