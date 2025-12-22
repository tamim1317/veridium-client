import React from "react";
import { motion } from "framer-motion";
import { FaBoxOpen, FaCalendarAlt, FaBuilding, FaUndo } from "react-icons/fa";

const MyAssetItem = ({ asset, onReturn }) => {
  const {
    assetName,
    assetImage,
    assetType,
    companyName,
    assignmentDate,
    returnable = true,
  } = asset;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-2xl overflow-hidden border border-base-200"
    >
      {/* Image */}
      <figure className="relative">
        <img
          src={assetImage || "https://via.placeholder.com/400x250"}
          alt={assetName}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`badge badge-lg ${assetType === "Returnable" ? "badge-success" : "badge-warning"}`}
          >
            {assetType}
          </span>
        </div>
      </figure>

      {/* Body */}
      <div className="card-body p-6">
        <h3 className="card-title text-xl font-bold line-clamp-2">{assetName}</h3>

        <div className="space-y-3 mt-4">
          {/* Company */}
          <div className="flex items-center gap-3 text-base-content/70">
            <FaBuilding className="text-primary text-xl" />
            <span className="font-medium">{companyName || "Company Asset"}</span>
          </div>

          {/* Assigned Date */}
          <div className="flex items-center gap-3 text-base-content/70">
            <FaCalendarAlt className="text-primary text-xl" />
            <span>
              Assigned: <strong>{new Date(assignmentDate).toLocaleDateString()}</strong>
            </span>
          </div>
        </div>

        {/* Actions */}
        {returnable && (
          <div className="card-actions justify-end mt-6">
            <button
              onClick={() => onReturn(asset)}
              className="btn btn-outline btn-sm btn-success gap-2 hover:bg-success hover:text-success-content transition-colors"
            >
              <FaUndo />
              Return Asset
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MyAssetItem;