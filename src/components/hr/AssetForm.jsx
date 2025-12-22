import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaUpload, FaBoxOpen, FaTags, FaLayerGroup, FaSpinner } from "react-icons/fa";

const AssetForm = ({ asset = null, onSuccess }) => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    defaultValues: asset || {},
  });
  const [imagePreview, setImagePreview] = useState(asset?.productImage || null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let imageUrl = asset?.productImage || "";

      // Upload new image if selected
      if (data.productImage?.[0]) {
        const formData = new FormData();
        formData.append("image", data.productImage[0]);

        const imgRes = await axiosSecure.post("/upload-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        imageUrl = imgRes.data.url;
      }

      const assetData = {
        productName: data.productName,
        productType: data.productType,
        productQuantity: Number(data.productQuantity),
        productImage: imageUrl,
        hrEmail: "current-hr@example.com",
        dateAdded: asset ? asset.dateAdded : new Date(),
      };

      if (asset) {
        // Update existing asset
        await axiosSecure.patch(`/assets/${asset._id}`, assetData);
        toast.success("Asset updated successfully!");
      } else {
        // Create new asset
        await axiosSecure.post("/assets", assetData);
        toast.success("Asset added successfully!");
      }

      reset();
      setImagePreview(null);
      onSuccess?.();
    } catch (err) {
      toast.error("Failed to save asset. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-2xl rounded-3xl border border-base-200 overflow-hidden">
      <div className="card-body p-8 lg:p-10">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">
          {asset ? "Edit Asset" : "Add New Asset"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Product Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold flex items-center gap-2">
                <FaBoxOpen className="text-primary" /> Product Name
              </span>
            </label>
            <input
              {...register("productName", { required: "Product name is required" })}
              className="input input-bordered focus:input-primary text-lg"
              placeholder="e.g. Dell XPS 13 Laptop"
            />
            {errors.productName && <span className="text-error text-sm mt-1">{errors.productName.message}</span>}
          </div>

          {/* Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold flex items-center gap-2">
                <FaTags className="text-primary" /> Asset Type
              </span>
            </label>
            <select
              {...register("productType", { required: "Type is required" })}
              className="select select-bordered focus:select-primary text-lg"
            >
              <option value="">Select Type</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
            {errors.productType && <span className="text-error text-sm mt-1">{errors.productType.message}</span>}
          </div>

          {/* Quantity */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold flex items-center gap-2">
                <FaLayerGroup className="text-primary" /> Quantity
              </span>
            </label>
            <input
              type="number"
              {...register("productQuantity", {
                required: "Quantity is required",
                min: { value: 1, message: "Minimum 1" },
              })}
              className="input input-bordered focus:input-primary text-lg"
              placeholder="e.g. 10"
            />
            {errors.productQuantity && <span className="text-error text-sm mt-1">{errors.productQuantity.message}</span>}
          </div>

          {/* Image Upload */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold flex items-center gap-2">
                <FaUpload className="text-primary" /> Product Image
              </span>
            </label>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <input
                type="file"
                {...register("productImage", { required: !asset ? "Image is required" : false })}
                className="file-input file-input-bordered w-full max-w-xs focus:file-input-primary"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) setImagePreview(URL.createObjectURL(file));
                }}
              />
              {(imagePreview || asset?.productImage) && (
                <div className="avatar">
                  <div className="w-32 h-32 rounded-xl shadow-md">
                    <img
                      src={imagePreview || asset.productImage}
                      alt="Preview"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
            {errors.productImage && <span className="text-error text-sm mt-1">{errors.productImage.message}</span>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-full text-lg mt-8"
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Saving...
              </>
            ) : asset ? (
              "Update Asset"
            ) : (
              "Add Asset"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssetForm;