import React from 'react';
import { User } from '../icon';

interface Props {
  label: string;
  ref: any;
}

const Question: React.FC<Props> = ({ label, ref }) => {
  return (
    <div className='question-card' ref={ref}>
      <div className='icon question'>
        <User />
      </div>

      {label}
    </div>
  );
};

export default Question;
