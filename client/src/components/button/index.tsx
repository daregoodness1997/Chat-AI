import React, { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({ label, children, ...props }) => {
  return <button {...props}>{children}</button>;
};

export default Button;
