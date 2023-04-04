import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Answer: React.FC<Props> = ({ children }) => {
  return <div className='answer-card'>{children}</div>;
};

export default Answer;
