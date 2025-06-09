import React from 'react';
import { useTheme } from '../hooks';

type ButtonVariant = 'primary' | 'secondary' | 'warn' | 'error';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
  outlined?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  disabled = false,
  outlined = false,
  onClick,
  type = 'button',
}) => {
  const [theme] = useTheme();

  const buttonStyles: React.CSSProperties =
    theme === 'light'
      ? { background: 'white', color: 'black' }
      : { background: 'black', color: 'white' };

  return (
    <button
      type={type}
      className={`button button--${variant} ${
        outlined ? 'button--outlined' : ''
      }`}
      style={buttonStyles}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
