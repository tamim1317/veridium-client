// src/pages/hr/UpgradePackage.jsx
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import CheckoutForm from "../../components/Dashboard/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const UpgradePackage = () => {
  const axiosSecure = useAxiosSecure();

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    },
  });

  const { data: currentPackage } = useQuery({
    queryKey: ["currentPackage"],
    queryFn: async () => {
      const res = await axiosSecure.get("/hr/package");
      return res.data;
    },
  });

  if (isLoading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

  return (
    <div className="p-6 lg:p-10 bg-base-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8">Upgrade Your Package</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div key={pkg._id} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="card-body">
              <h3 className="text-2xl font-bold text-primary">{pkg.name}</h3>
              <p className="text-4xl font-black my-4">${pkg.price}<span className="text-lg">/month</span></p>
              <ul className="list-disc list-inside space-y-2">
                {pkg.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="card-actions justify-end mt-6">
                <Elements stripe={stripePromise}>
                  <CheckoutForm packageId={pkg._id} amount={pkg.price * 100} />
                </Elements>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpgradePackage;