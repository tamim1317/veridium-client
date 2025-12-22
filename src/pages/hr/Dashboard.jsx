// src/pages/hr/Dashboard.jsx
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

const Dashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["hrStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/hr/stats");
      return res.data;
    },
  });

  const pieData = [
    { name: "Returnable", value: stats.returnable || 0 },
    { name: "Non-returnable", value: stats.nonReturnable || 0 },
  ];

  const barData = stats.topAssets || [];

  return (
    <div className="p-6 lg:p-10 bg-base-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-10 text-center">HR Dashboard</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="card bg-base-200 shadow-xl p-6">
          <h3 className="text-xl font-bold mb-6">Asset Types Distribution</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              <Cell fill="#8884d8" />
              <Cell fill="#82ca9d" />
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Bar Chart */}
        <div className="card bg-base-200 shadow-xl p-6">
          <h3 className="text-xl font-bold mb-6">Top Requested Assets</h3>
          <BarChart width={500} height={300} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="requests" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;