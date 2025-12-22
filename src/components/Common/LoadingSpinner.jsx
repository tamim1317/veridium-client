import React from 'react';

const LoadingSpinner = ({ size = 'md' }) => {
  const sizes = {
    xs: 'loading-xs',
    sm: 'loading-sm',
    md: 'loading-md',
    lg: 'loading-lg',
  };

  return (
    <div className="flex justify-center items-center py-8">
      <span className={`loading loading-spinner ${sizes[size]} text-primary`}></span>
    </div>
  );
};

export default LoadingSpinner;