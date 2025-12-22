import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  className = '',
  hoverable = false,
  shadow = 'md',
}) => {
  const shadowClass = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  }[shadow];

  return (
    <div
      className={`card bg-base-100 border border-base-200 rounded-2xl overflow-hidden transition-all duration-300 ${
        hoverable ? 'hover:shadow-2xl hover:scale-[1.02]' : ''
      } ${shadowClass} ${className}`}
    >
      {(title || subtitle) && (
        <div className="card-title px-6 py-5 border-b border-base-200">
          {title && <h3 className="text-xl font-semibold text-base-content">{title}</h3>}
          {subtitle && <p className="text-sm text-base-content/70 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="card-body p-6">{children}</div>
    </div>
  );
};

export default Card;