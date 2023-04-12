import React, { useEffect, useState } from 'react';
import { Bot, User } from '../icon';

interface ChatProps {
  isAi?: boolean;
  value?: string;
  uniqueId: string;
  loading?: boolean;
}

const ChatStripe: React.FC<ChatProps> = ({
  isAi,
  value,
  uniqueId,
  loading,
}) => {
  const [text, setText] = useState<string>('');

  const loadingIndicatorFunc = () => {
    let textContent = '';
    setInterval(() => {
      textContent += '.';
      if (textContent === '....') textContent = '';
      setText(textContent);
    }, 600);
  };
  useEffect(() => {
    // loading ...
    loadingIndicatorFunc();
  }, [loading]);
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
        {loading ? text : value}
      </div>
    </div>
  );
};

export default ChatStripe;
