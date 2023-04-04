import React, { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button: React.FC<Props> = ({ label, ...props }) => {
  return <button {...props}>{label}</button>;
};

export default Button;
