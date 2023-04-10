import React from 'react';
import { Bot } from '../icon';

interface Props {
  children: React.ReactNode;
}

const Answer: React.FC<Props> = ({ children }) => {
  return (
    <div className='answer-card'>
      
      <div className='icon ans'>
        <Bot />
      </div>
      {children}
    </div>
  );
};

export default Answer;
