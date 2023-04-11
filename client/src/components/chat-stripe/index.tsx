import React from 'react';
import { Bot, User } from '../icon';

interface ChatProps {
  isAi?: boolean;
  value?: string;
  uniqueId: string;
}

const ChatStripe: React.FC<ChatProps> = ({ isAi, value, uniqueId }) => {
  return (
    <div className={` ${isAi ? 'answer-card' : 'question-card '}`}>
      {isAi ? (
        <div className='icon ans'>
          <Bot />
        </div>
      ) : (
        <div className='icon question'>
          <User />
        </div>
      )}
      <div className='message' id={uniqueId}>
        {value}
      </div>
    </div>
  );
};

export default ChatStripe;
