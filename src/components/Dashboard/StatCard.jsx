import React from "react";
import { motion } from "framer-motion";

const StatCard = ({
  title,
  value,
  icon: Icon,
  color = "primary",
  trend = "up",
  trendValue = "+0%",
  loading = false,
}) => {
  const colors = {
    primary: "bg-primary text-primary-content",
    secondary: "bg-secondary text-secondary-content",
    accent: "bg-accent text-accent-content",
    info: "bg-info text-info-content",
    success: "bg-success text-success-content",
    warning: "bg-warning text-warning-content",
    error: "bg-error text-error-content",
  };

  const trendIcon = trend === "up" ? "↑" : trend === "down" ? "↓" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`card shadow-xl ${colors[color]} rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300`}
    >
      <div className="card-body p-6">
        {/* Title & Icon */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold opacity-90">{title}</h3>
          {Icon && <Icon className="text-3xl opacity-80" />}
        </div>

        {/* Value */}
        {loading ? (
          <div className="skeleton h-10 w-3/4 rounded-md"></div>
        ) : (
          <p className="text-4xl font-black mt-2">{value}</p>
        )}

        {/* Trend */}
        <div className="flex items-center gap-2 mt-2">
          <span
            className={`text-sm font-medium ${
              trend === "up"
                ? "text-success"
                : trend === "down"
                ? "text-error"
                : "text-base-content/70"
            }`}
          >
            {trendIcon} {trendValue}
          </span>
          <span className="text-sm opacity-70">vs last month</span>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;