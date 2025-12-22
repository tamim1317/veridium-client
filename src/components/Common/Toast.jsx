import React from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  const types = {
    success: 'alert-success',
    error: 'alert-error',
    warning: 'alert-warning',
    info: 'alert-info',
  };

  return (
    <div className={`alert ${types[type]} shadow-2xl rounded-xl`}>
      <div className="flex items-center gap-3">
        <span>{message}</span>
      </div>
      <button className="btn btn-ghost btn-xs" onClick={onClose}>
        Dismiss
      </button>
    </div>
  );
};

export default Toast;