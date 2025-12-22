import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { FaGoogle, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";

const Login = () => {
  const { login, googleLogin, user, role, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Dynamic redirect after login
  useEffect(() => {
    if (user && !authLoading) {
      const from = location.state?.from?.pathname || "/";
      if (role === "hr") {
        navigate(from === "/" ? "/asset-list" : from, { replace: true });
      } else if (role === "employee") {
        navigate(from === "/" ? "/my-assets" : from, { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    }
  }, [user, role, authLoading, navigate, location.state]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);
      toast.success("Welcome back!");
      // Redirect handled by useEffect
    } catch (error) {
      toast.error(error.message || "Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await googleLogin();
      toast.success("Logged in with Google!");
      // Redirect handled by useEffect
    } catch (error) {
      toast.error(error.message || "Google login failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300">
      <div className="flex flex-col md:flex-row shadow-2xl rounded-3xl overflow-hidden max-w-5xl w-full m-4 bg-base-100 border border-base-200">
        
        {/* Left Side: Branding */}
        <div className="md:w-1/2 bg-gradient-to-br from-primary to-secondary p-12 text-white flex flex-col justify-center items-center text-center space-y-8">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-5xl font-black italic">V</span>
          </div>
          <h1 className="text-5xl font-black tracking-tight">Veridium</h1>
          <p className="text-xl opacity-90 font-light max-w-sm">
            Intelligent Asset Management for Modern Teams
          </p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-white/10 rounded-xl border border-white/20 text-center">
              <p className="font-bold">Fast</p>
              <p className="text-sm opacity-80">Setup in minutes</p>
            </div>
            <div className="p-4 bg-white/10 rounded-xl border border-white/20 text-center">
              <p className="font-bold">Secure</p>
              <p className="text-sm opacity-80">End-to-end encryption</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-base-content">Welcome Back</h2>
            <p className="text-base-content/70 mt-2">
              Sign in to manage your assets and requests
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <FaEnvelope className="text-primary" /> Email Address
                </span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="input input-bordered focus:input-primary"
                placeholder="you@example.com"
              />
              {errors.email && (
                <span className="text-error text-sm mt-1">{errors.email.message}</span>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <FaLock className="text-primary" /> Password
                </span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: "Password is required" })}
                  className="input input-bordered focus:input-primary w-full pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-primary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-error text-sm mt-1">{errors.password.message}</span>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center text-sm">
              <label className="cursor-pointer flex items-center gap-2">
                <input type="checkbox" className="checkbox checkbox-sm" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="link link-primary">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting || authLoading}
            >
              {isSubmitting || authLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Logging in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider my-8 text-base-content/50">OR</div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full flex items-center justify-center gap-3"
            disabled={googleLoading || authLoading}
          >
            {googleLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                <FaGoogle className="text-red-500 text-xl" />
                Continue with Google
              </>
            )}
          </button>

          {/* Register Links */}
          <div className="text-center mt-10 text-sm">
            Don't have an account?{" "}
            <div className="mt-2 flex justify-center gap-6">
              <Link to="/join-employee" className="link link-primary font-semibold">
                Join as Employee
              </Link>
              <Link to="/join-hr" className="link link-secondary font-semibold">
                Join as HR
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;