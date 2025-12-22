import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { FaBuilding, FaEnvelope, FaLock, FaUser, FaUpload, FaDollarSign } from "react-icons/fa";

// Reusable Form Group Component
const FormGroup = ({ label, icon: Icon, error, children }) => (
  <div className="form-control w-full">
    <label className="label">
      <span className="label-text font-medium flex items-center gap-2">
        {Icon && <Icon className="text-primary" />}
        {label}
      </span>
    </label>
    {children}
    {error && <span className="text-error text-sm mt-1">{error.message}</span>}
  </div>
);

const HrRegister = () => {
  const { createUser, updateUserProfile } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const img_api_key = import.meta.env.VITE_IMGBB_API_KEY;
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_api_key}`;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // 1. Upload Company Logo
      const formData = new FormData();
      formData.append("image", data.companyLogo[0]);
      const imgRes = await axios.post(img_hosting_url, formData);

      if (!imgRes.data.success) throw new Error("Image upload failed");
      const logoUrl = imgRes.data.data.display_url;

      // 2. Create Firebase User
      const result = await createUser(data.email, data.password);
      await updateUserProfile(data.name, logoUrl);

      // 3. Save to Backend
      const hrInfo = {
        uid: result.user.uid,
        name: data.name,
        email: data.email,
        companyName: data.companyName,
        companyLogo: logoUrl,
        role: "hr",
        package: Number(data.package),
        status: "pending-payment",
        registrationDate: new Date(),
      };

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/users`, hrInfo);

      if (res.data.insertedId) {
        toast.success("HR Account created successfully!");
        reset();
        setImagePreview(null);
        navigate("/login");
      }
    } catch (error) {
      const message =
        error.code === "auth/email-already-in-use"
          ? "This email is already registered. Please login."
          : error.message || "Registration failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 p-6">
      <div className="card w-full max-w-4xl bg-base-100 shadow-2xl rounded-3xl overflow-hidden border border-base-200">
        <div className="flex flex-col md:flex-row">
          {/* Left: Branding */}
          <div className="md:w-1/2 bg-gradient-to-br from-primary to-secondary p-12 text-white flex flex-col justify-center items-center text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6">
              <span className="text-4xl font-black italic">V</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Veridium</h1>
            <p className="text-lg opacity-90 max-w-md">
              Empower your HR team with intelligent asset management and seamless onboarding.
            </p>
          </div>

          {/* Right: Form */}
          <div className="md:w-1/2 p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">HR Registration</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name */}
              <FormGroup label="Full Name" icon={FaUser} error={errors.name}>
                <input
                  {...register("name", { required: "Full name is required" })}
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="John Doe"
                />
              </FormGroup>

              {/* Company Name */}
              <FormGroup label="Company Name" icon={FaBuilding} error={errors.companyName}>
                <input
                  {...register("companyName", { required: "Company name is required" })}
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="Acme Corporation"
                />
              </FormGroup>

              {/* Company Logo */}
              <FormGroup label="Company Logo" icon={FaUpload} error={errors.companyLogo}>
                <input
                  type="file"
                  {...register("companyLogo", { required: "Company logo is required" })}
                  className="file-input file-input-bordered w-full focus:file-input-primary"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setImagePreview(URL.createObjectURL(file));
                  }}
                />
                {imagePreview && (
                  <div className="mt-4 flex justify-center">
                    <img
                      src={imagePreview}
                      alt="Company Logo Preview"
                      className="w-32 h-32 object-cover rounded-2xl shadow-md border border-base-300"
                    />
                  </div>
                )}
              </FormGroup>

              {/* Package */}
              <FormGroup label="Select Package" icon={FaDollarSign} error={errors.package}>
                <select
                  {...register("package", { required: "Please select a package" })}
                  className="select select-bordered w-full focus:select-primary"
                >
                  <option value="">Choose Package</option>
                  <option value="5">5 Members ($5/month)</option>
                  <option value="10">10 Members ($8/month)</option>
                  <option value="20">20 Members ($15/month)</option>
                </select>
              </FormGroup>

              {/* Email */}
              <FormGroup label="Email Address" icon={FaEnvelope} error={errors.email}>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="hr@company.com"
                />
              </FormGroup>

              {/* Password */}
              <FormGroup label="Password" icon={FaLock} error={errors.password}>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="••••••••"
                />
              </FormGroup>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-full text-lg mt-6"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Registering...
                  </>
                ) : (
                  "Register & Join"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrRegister;