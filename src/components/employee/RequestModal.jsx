import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const RequestModal = ({ asset, isOpen, onClose, onSuccess }) => {
  const axiosSecure = useAxiosSecure();
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!note.trim()) {
      toast.error("Please add a note for your request.");
      return;
    }

    setSubmitting(true);
    try {
      await axiosSecure.post("/requests", {
        assetId: asset._id,
        assetName: asset.productName,
        assetType: asset.productType,
        note,
        companyName: asset.companyName,
      });

      toast.success("Request sent successfully!");
      onSuccess();
      onClose();
      setNote("");
    } catch (err) {
      toast.error("Failed to send request. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-base-100 rounded-3xl shadow-2xl p-8 max-w-lg w-full mx-4 border border-base-200 animate-fade-in-up">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-primary">Request Asset</h3>
          <button onClick={onClose} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Asset Info */}
        <div className="bg-base-200 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <img
              src={asset.productImage || "https://via.placeholder.com/80"}
              alt={asset.productName}
              className="w-20 h-20 object-cover rounded-xl"
            />
            <div>
              <h4 className="font-bold text-lg">{asset.productName}</h4>
              <p className="text-sm text-base-content/70">{asset.companyName}</p>
              <span className={`badge mt-2 ${asset.productType === "Returnable" ? "badge-success" : "badge-warning"}`}>
                {asset.productType}
              </span>
            </div>
          </div>
        </div>

        {/* Note Input */}
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text font-semibold">Add a Note (Required)</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-32 focus:textarea-primary"
            placeholder="Why do you need this asset? Any special requirements?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="btn btn-ghost">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-primary"
            disabled={submitting || !note.trim()}
          >
            {submitting ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Sending...
              </>
            ) : (
              "Submit Request"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;