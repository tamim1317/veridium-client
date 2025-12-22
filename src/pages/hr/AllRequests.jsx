import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests");
      return res.data;
    },
  });

  const handleAction = async (id, status) => {
    Swal.fire({
      title: `Confirm ${status}?`,
      icon: status === "approved" ? "question" : "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/requests/${id}`, { status });
          toast.success(`Request ${status}!`);
          refetch();
        } catch (err) {
          toast.error("Action failed.");
        }
      }
    });
  };

  return (
    <div className="p-6 lg:p-10 bg-base-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center">All Asset Requests</h2>

      <div className="overflow-x-auto rounded-2xl border border-base-200 shadow-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-primary text-white">
              <th>Employee</th>
              <th>Asset</th>
              <th>Type</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.requesterName}</td>
                <td>{req.assetName}</td>
                <td>{req.assetType}</td>
                <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                <td>
                  <span className={`badge ${
                    req.requestStatus === "pending" ? "badge-warning" :
                    req.requestStatus === "approved" ? "badge-success" : "badge-error"
                  }`}>
                    {req.requestStatus}
                  </span>
                </td>
                <td className="flex gap-2">
                  {req.requestStatus === "pending" && (
                    <>
                      <button
                        onClick={() => handleAction(req._id, "approved")}
                        className="btn btn-sm btn-success"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(req._id, "rejected")}
                        className="btn btn-sm btn-error"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequests;