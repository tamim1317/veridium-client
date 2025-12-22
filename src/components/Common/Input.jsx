import React from 'react';

const Input = ({
  label,
  type = 'text',
  placeholder,
  className = '',
  error,
  ...props
}) => {
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text font-medium">{label}</span>
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered w-full rounded-lg focus:border-primary transition-all ${
          error ? 'input-error' : ''
        } ${className}`}
        {...props}
      />
      {error && <span className="text-error text-sm mt-1">{error}</span>}
    </div>
  );
};

export default Input;