import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FaTrash, FaEdit, FaSearch, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const AssetList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  const { data: assets = [], isLoading, refetch } = useQuery({
    queryKey: ["assets", user?.email, search, filter, sort],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assets?email=${user?.email}&search=${search}&filter=${filter}&sort=${sort}`
      );
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Asset?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/assets/${id}`);
          if (res.data.deletedCount > 0) {
            toast.success("Asset deleted successfully!");
            refetch();
          }
        } catch (err) {
          toast.error("Failed to delete asset.");
        }
      }
    });
  };

  return (
    <div className="p-6 lg:p-10 bg-base-100 min-h-screen">
      {/* Header */}
      <div className="backdrop-blur-md bg-base-100/70 border border-base-200 rounded-2xl p-6 mb-10 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
            Manage Inventory
          </h2>
          <Link to="/hr/add-asset">
            <button className="btn btn-primary gap-2 shadow-lg hover:shadow-xl transition-all">
              <FaPlus /> Add New Asset
            </button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-base-content/50" />
          <input
            type="text"
            placeholder="Search by name..."
            className="input input-bordered w-full pl-12 bg-base-200/50 focus:bg-base-100 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Type Filter */}
        <select
          className="select select-bordered w-full bg-base-200/50 focus:bg-base-100 transition-all"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>

        {/* Sort */}
        <select
          className="select select-bordered w-full bg-base-200/50 focus:bg-base-100 transition-all"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort by Quantity</option>
          <option value="quantity-asc">Low to High</option>
          <option value="quantity-desc">High to Low</option>
        </select>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      ) : assets.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-2xl font-semibold text-base-content/70">
            No assets found
          </h3>
          <p className="text-base-content/60 mt-2">
            Add your first asset to get started
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-base-200 shadow-lg">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-center">Image</th>
                <th>Product Name</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Available</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset._id} className="hover:bg-base-200 transition-colors">
                  <td className="text-center">
                    <div className="avatar">
                      <div className="w-14 h-14 rounded-xl">
                        <img
                          src={asset.productImage || "https://via.placeholder.com/56"}
                          alt={asset.productName}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="font-semibold">{asset.productName}</td>
                  <td>
                    <span
                      className={`badge ${
                        asset.productType === "Returnable"
                          ? "badge-success"
                          : "badge-warning"
                      } badge-lg`}
                    >
                      {asset.productType}
                    </span>
                  </td>
                  <td className="font-bold">{asset.productQuantity}</td>
                  <td className="font-bold text-primary">
                    {asset.availableQuantity || asset.productQuantity}
                  </td>
                  <td>
                    {asset.availableQuantity > 0 ? (
                      <span className="badge badge-success badge-outline">
                        In Stock
                      </span>
                    ) : (
                      <span className="badge badge-error badge-outline">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="text-center">
                    <div className="flex gap-3 justify-center">
                      <button className="btn btn-sm btn-circle btn-outline btn-info tooltip" data-tip="Edit">
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(asset._id)}
                        className="btn btn-sm btn-circle btn-outline btn-error tooltip"
                        data-tip="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssetList;