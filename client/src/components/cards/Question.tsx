import React from 'react';

interface Props {
  label: string;
}

const Question: React.FC<Props> = ({ label }) => {
  return <div className='question-card'>{label}</div>;
};

export default Question;
