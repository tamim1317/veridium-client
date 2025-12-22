import React from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaCheck, FaTimes } from "react-icons/fa";

const RequestActionButtons = ({ request, onActionSuccess }) => {
  const axiosSecure = useAxiosSecure();

  const handleAction = (action) => {
    const title = action === "approved" ? "Approve Request?" : "Reject Request?";
    const icon = action === "approved" ? "success" : "warning";
    const confirmText = action === "approved" ? "Approve" : "Reject";

    Swal.fire({
      title,
      text: `This will ${action} the request for ${request.assetName}`,
      icon,
      showCancelButton: true,
      confirmButtonColor: action === "approved" ? "#3085d6" : "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: confirmText,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/requests/${request._id}`, { status: action });
          toast.success(`Request ${action} successfully!`);
          onActionSuccess?.();
        } catch (err) {
          toast.error(`Failed to ${action} request.`);
        }
      }
    });
  };

  return (
    <div className="flex gap-3">
      {/* Approve Button */}
      <button
        onClick={() => handleAction("approved")}
        className="btn btn-sm btn-success gap-2 hover:bg-success hover:text-success-content transition-colors tooltip"
        data-tip="Approve Request"
      >
        <FaCheck /> Approve
      </button>

      {/* Reject Button */}
      <button
        onClick={() => handleAction("rejected")}
        className="btn btn-sm btn-error gap-2 hover:bg-error hover:text-error-content transition-colors tooltip"
        data-tip="Reject Request"
      >
        <FaTimes /> Reject
      </button>
    </div>
  );
};

export default RequestActionButtons;