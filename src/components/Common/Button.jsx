import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',       
  className = '',
  disabled = false,
  loading = false,
  ...props
}) => {
  const baseStyles = 'btn rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';
  const sizeStyles = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  }[size];

  const variantStyles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
    error: 'btn-error',
    success: 'btn-success',
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className} ${
        disabled || loading ? 'opacity-60 cursor-not-allowed' : ''
      }`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;