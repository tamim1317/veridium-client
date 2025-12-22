import { Link } from "react-router-dom";
import { FaBoxOpen, FaUsers, FaClipboardList } from "react-icons/fa";

const EmployeeDashboard = () => {
  return (
    <div className="p-6 lg:p-10 bg-base-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-10 text-center">Employee Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* My Assets */}
        <Link to="/employee/my-assets" className="card bg-primary text-primary-content shadow-xl hover:scale-105 transition-transform">
          <div className="card-body items-center text-center">
            <FaBoxOpen size={48} />
            <h3 className="text-2xl font-bold mt-4">My Assets</h3>
            <p className="mt-2">View all your assigned assets</p>
          </div>
        </Link>

        {/* Request Asset */}
        <Link to="/employee/request-asset" className="card bg-secondary text-secondary-content shadow-xl hover:scale-105 transition-transform">
          <div className="card-body items-center text-center">
            <FaClipboardList size={48} />
            <h3 className="text-2xl font-bold mt-4">Request Asset</h3>
            <p className="mt-2">Request new assets from your company</p>
          </div>
        </Link>

        {/* My Team */}
        <Link to="/employee/my-team" className="card bg-accent text-accent-content shadow-xl hover:scale-105 transition-transform">
          <div className="card-body items-center text-center">
            <FaUsers size={48} />
            <h3 className="text-2xl font-bold mt-4">My Team</h3>
            <p className="mt-2">See your colleagues & upcoming birthdays</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDashboard;