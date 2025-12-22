import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const EditAssetModal = ({ asset, isOpen, onClose, onSuccess }) => {
  const { register, handleSubmit, reset } = useForm({ defaultValues: asset });
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.patch(`/assets/${asset._id}`, data);
      if (res.data.modifiedCount > 0) {
        toast.success("Asset updated successfully!");
        onSuccess();
        onClose();
      }
    } catch (err) {
      toast.error("Failed to update asset.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-base-100 rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl">
        <h3 className="text-2xl font-bold mb-6">Edit Asset</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input {...register("productName")} className="input input-bordered" />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Quantity</span>
            </label>
            <input type="number" {...register("productQuantity")} className="input input-bordered" />
          </div>

          <div className="flex gap-4 justify-end">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAssetModal;