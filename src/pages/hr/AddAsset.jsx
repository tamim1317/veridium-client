import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaUpload, FaPlus } from "react-icons/fa";

const AddAsset = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onSubmit = async (data) => {
    setUploading(true);
    try {
      // Handle image upload (ImgBB or your backend)
      const formData = new FormData();
      formData.append("image", data.productImage[0]);

      const imgRes = await axiosSecure.post("/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const assetData = {
        productName: data.productName,
        productType: data.productType,
        productQuantity: Number(data.productQuantity),
        productImage: imgRes.data.url || "",
        hrEmail: "current-hr-email@example.com", // Replace with auth
        dateAdded: new Date(),
      };

      const res = await axiosSecure.post("/assets", assetData);
      if (res.data.insertedId) {
        toast.success("Asset added successfully!");
        reset();
        setImagePreview(null);
        navigate("/hr/asset-list");
      }
    } catch (err) {
      toast.error("Failed to add asset.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 lg:p-10 bg-base-100 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Add New Asset</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Product Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Product Name</span>
            </label>
            <input
              {...register("productName", { required: "Product name is required" })}
              className="input input-bordered focus:input-primary"
              placeholder="e.g. Dell Laptop XPS 13"
            />
            {errors.productName && <span className="text-error text-sm mt-1">{errors.productName.message}</span>}
          </div>

          {/* Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Type</span>
            </label>
            <select
              {...register("productType", { required: "Type is required" })}
              className="select select-bordered focus:select-primary"
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
              <span className="label-text font-semibold">Quantity</span>
            </label>
            <input
              type="number"
              {...register("productQuantity", { 
                required: "Quantity is required",
                min: { value: 1, message: "Minimum 1" }
              })}
              className="input input-bordered focus:input-primary"
              placeholder="e.g. 10"
            />
            {errors.productQuantity && <span className="text-error text-sm mt-1">{errors.productQuantity.message}</span>}
          </div>

          {/* Image Upload */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Product Image</span>
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                {...register("productImage", { required: "Image is required" })}
                className="file-input file-input-bordered w-full max-w-xs"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) setImagePreview(URL.createObjectURL(file));
                }}
              />
            </div>
            {imagePreview && (
              <div className="mt-4">
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-xl shadow-md" />
              </div>
            )}
            {errors.productImage && <span className="text-error text-sm mt-1">{errors.productImage.message}</span>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={uploading}
          >
            {uploading ? (
              <>
                <span className="loading loading-spinner"></span>
                Adding Asset...
              </>
            ) : (
              "Add Asset"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAsset;