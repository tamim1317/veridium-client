// src/pages/employee/MyAssets.jsx
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import useMyAssets from "../../hooks/useMyAssets";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyAssets = () => {
  const { myAssets, isLoading, refetch } = useMyAssets();
  const axiosSecure = useAxiosSecure();
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "My Assigned Assets - Veridium",
  });

  const handleReturn = (assetId) => {
    Swal.fire({
      title: "Return Asset?",
      text: "Are you sure you want to return this asset?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Return",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/assigned-assets/${assetId}/return`);
          toast.success("Asset return request sent!");
          refetch();
        } catch (err) {
          toast.error("Failed to return asset.");
        }
      }
    });
  };

  if (isLoading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

  return (
    <div className="p-6 lg:p-10 bg-base-100 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold">My Assigned Assets</h2>
        <button onClick={handlePrint} className="btn btn-primary gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
          </svg>
          Print Assets
        </button>
      </div>

      <div ref={componentRef} className="bg-base-100 rounded-xl shadow-lg border border-base-200">
        <table className="table w-full">
          <thead>
            <tr className="bg-primary text-white">
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Company</th>
              <th>Assigned On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myAssets.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-20 text-base-content/70">
                  No assets assigned yet
                </td>
              </tr>
            ) : (
              myAssets.map((asset) => (
                <tr key={asset._id} className="hover:bg-base-200 transition-colors">
                  <td>
                    <img src={asset.assetImage || "https://via.placeholder.com/64"} alt={asset.assetName} className="w-16 h-16 object-cover rounded-lg" />
                  </td>
                  <td className="font-semibold">{asset.assetName}</td>
                  <td>
                    <span className={`badge ${asset.assetType === "Returnable" ? "badge-success" : "badge-warning"} badge-lg`}>
                      {asset.assetType}
                    </span>
                  </td>
                  <td>{asset.companyName}</td>
                  <td>{new Date(asset.assignmentDate).toLocaleDateString()}</td>
                  <td>
                    {asset.assetType === "Returnable" && (
                      <button onClick={() => handleReturn(asset._id)} className="btn btn-sm btn-outline btn-success">
                        Return
                      </button>
                    )}
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

export default MyAssets;