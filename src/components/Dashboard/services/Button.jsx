import React from 'react';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) => {
  const variantClasses = {
    primary: 'button-primary',
    outline: 'button-outline',
    text: 'button-text',
    danger: 'button-danger',
  };

  const sizeClasses = {
    small: 'button-small',
    medium: 'button-medium',
    large: 'button-large',
  };

  return (
    <button
      type={type}
      className={`button ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;