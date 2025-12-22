import React from "react";
import { FaBoxOpen, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const AssetCard = ({
  asset,
  onRequest,
  onReturn, 
  showActions = true, 
}) => {
  const {
    productName,
    productImage,
    productType,
    productQuantity,
    availableQuantity,
    companyName,
    status,
  } = asset;

  const isReturnable = productType === "Returnable";
  const isAvailable = availableQuantity > 0;

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 rounded-2xl overflow-hidden">
      {/* Image */}
      <figure className="relative">
        <img
          src={productImage || "https://via.placeholder.com/400x250"}
          alt={productName}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`badge badge-lg ${isReturnable ? "badge-success" : "badge-warning"}`}
          >
            {productType}
          </span>
        </div>
      </figure>

      {/* Body */}
      <div className="card-body p-6">
        <h3 className="card-title text-xl font-bold line-clamp-2">{productName}</h3>

        <div className="space-y-3 mt-4">
          {/* Company */}
          <div className="flex items-center gap-2 text-base-content/70">
            <FaBoxOpen className="text-primary" />
            <span>{companyName || "Company Asset"}</span>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-2 text-base-content/70">
            <FaClock className="text-primary" />
            <span>
              Total: <strong>{productQuantity}</strong> | Available: <strong>{availableQuantity || productQuantity}</strong>
            </span>
          </div>

          {/* Status */}
          {status && (
            <div className="flex items-center gap-2 text-base-content/70">
              {status === "assigned" ? (
                <FaCheckCircle className="text-success" />
              ) : (
                <FaTimesCircle className="text-error" />
              )}
              <span className="capitalize">{status}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        {showActions && (
          <div className="card-actions justify-end mt-6">
            {onRequest && isAvailable && (
              <button
                onClick={() => onRequest(asset)}
                className="btn btn-primary btn-sm gap-2"
              >
                Request Asset
              </button>
            )}

            {onReturn && isReturnable && (
              <button
                onClick={() => onReturn(asset)}
                className="btn btn-outline btn-sm btn-success gap-2"
              >
                Return
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetCard;