import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const Success = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="alert alert-success d-flex align-items-center fade show">
      <FaCheckCircle className="flex-shrink-0 me-2" size={20} />
      <div className="flex-grow-1">
        {message}
      </div>
      {onClose && (
        <button 
          type="button" 
          className="btn-close" 
          onClick={onClose}
          aria-label="Close"
        />
      )}
    </div>
  );
};

export default Success;
