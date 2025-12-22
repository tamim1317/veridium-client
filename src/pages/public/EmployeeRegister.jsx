import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";

// Reusable Form Group Component (same as HR)
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

const EmployeeRegister = () => {
  const { createUser, googleLogin } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password", "");

  // Real-time password strength hint
  const checkPasswordStrength = (value) => {
    if (!value) return "";
    if (value.length < 6) return "Weak";
    if (value.length < 10) return "Medium";
    return "Strong";
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Create user in Firebase
      const result = await createUser(data.email, data.password);

      // Save user info to backend
      const userInfo = {
        uid: result.user.uid,
        name: data.name,
        email: data.email,
        role: "employee",
        status: "unaffiliated",
        registrationDate: new Date(),
      };

      const res = await axiosPublic.post("/users", userInfo);

      if (res.data.insertedId) {
        toast.success("Account created successfully!");
        navigate("/");
      }
    } catch (error) {
      const message =
        error.code === "auth/email-already-in-use"
          ? "This email is already registered. Please login."
          : error.message || "Registration failed. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Google login successful!");
      // Redirect handled by Firebase
    } catch (error) {
      toast.error("Google login failed. Please try again.");
      console.error("Google Login Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 p-6">
      <div className="card w-full max-w-4xl bg-base-100 shadow-2xl rounded-3xl overflow-hidden border border-base-200">
        <div className="flex flex-col md:flex-row">
          {/* Left: Branding */}
          <div className="md:w-1/2 bg-gradient-to-br from-secondary to-primary p-12 text-white flex flex-col justify-center items-center text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6">
              <span className="text-4xl font-black italic">V</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Veridium</h1>
            <p className="text-lg opacity-90 max-w-md">
              Join our community of employees and access company assets with ease.
            </p>
          </div>

          {/* Right: Form */}
          <div className="md:w-1/2 p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">Employee Registration</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name */}
              <FormGroup label="Full Name" icon={FaUser} error={errors.name}>
                <input
                  {...register("name", { required: "Full name is required" })}
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="John Doe"
                />
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
                  placeholder="you@example.com"
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
                  onChange={(e) => setPasswordStrength(checkPasswordStrength(e.target.value))}
                />
                {password && (
                  <span className={`text-sm mt-1 ${passwordStrength === "Strong" ? "text-success" : "text-warning"}`}>
                    Strength: {passwordStrength}
                  </span>
                )}
              </FormGroup>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-full text-lg mt-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Creating Account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="divider my-8">OR</div>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline w-full flex items-center justify-center gap-3"
            >
              <FaGoogle className="text-red-500 text-xl" />
              Continue with Google
            </button>

            {/* Login Link */}
            <p className="text-center mt-8 text-sm">
              Already have an account?{" "}
              <a href="/login" className="link link-primary font-medium">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegister;