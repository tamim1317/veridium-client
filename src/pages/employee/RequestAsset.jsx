// src/pages/employee/RequestAsset.jsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const RequestAsset = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [note, setNote] = useState("");

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["availableAssets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/assets/available");
      return res.data;
    },
  });

  const handleRequest = async () => {
    if (!selectedAsset) return;

    Swal.fire({
      title: "Confirm Request",
      html: `
        <p>Request <strong>${selectedAsset.productName}</strong>?</p>
        <textarea id="note" class="textarea textarea-bordered w-full mt-4" placeholder="Add note (optional)"></textarea>
      `,
      showCancelButton: true,
      confirmButtonText: "Submit Request",
      preConfirm: () => {
        const note = document.getElementById("note").value;
        return { note };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.post("/requests", {
            assetId: selectedAsset._id,
            assetName: selectedAsset.productName,
            assetType: selectedAsset.productType,
            note: result.value.note,
          });
          toast.success("Request sent successfully!");
          setSelectedAsset(null);
        } catch (err) {
          toast.error("Failed to send request.");
        }
      }
    });
  };

  if (isLoading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

  return (
    <div className="p-6 lg:p-10 bg-base-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8">Request an Asset</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <div key={asset._id} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
            <figure>
              <img src={asset.productImage} alt={asset.productName} className="w-full h-48 object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{asset.productName}</h3>
              <p className="text-sm text-base-content/70">{asset.companyName}</p>
              <div className="flex justify-between items-center mt-4">
                <span className={`badge ${asset.productType === "Returnable" ? "badge-success" : "badge-warning"} badge-lg`}>
                  {asset.productType}
                </span>
                <span className="badge badge-outline badge-lg">
                  {asset.availableQuantity} available
                </span>
              </div>
              <button
                onClick={() => setSelectedAsset(asset)}
                className="btn btn-primary mt-4"
                disabled={asset.availableQuantity === 0}
              >
                Request Asset
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedAsset && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Request {selectedAsset.productName}</h3>
            <p className="py-4">
              Type: <span className="badge badge-lg">{selectedAsset.productType}</span>
            </p>
            <textarea
              className="textarea textarea-bordered w-full mt-4"
              placeholder="Add a note (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setSelectedAsset(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleRequest}>Submit Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestAsset;