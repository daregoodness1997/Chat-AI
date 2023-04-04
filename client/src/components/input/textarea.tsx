import React, { TextareaHTMLAttributes } from 'react';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea: React.FC<Props> = ({ ...props }) => {
  return <textarea {...props} />;
};

export default Textarea;
