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
  const [response, setResponse] = useState<string>('');

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

  const typeTextFunc = () => {
    let index = 0;
    let textContent = '';
    let interval = setInterval(() => {
      if (value)
        if (index < value.length) {
          textContent += value.charAt(index);

          index++;
          setResponse(textContent);
        } else {
          clearInterval(interval);
        }
    }, 20);
  };

  useEffect(() => {
    typeTextFunc();
  }, [value]);

  const renderResponse = () => {
    if (value && !isAi) return value;
    if (value === '') return text;
    if (value && isAi) return response;
  };

  return (
    <div className={` ${isAi ? 'answer-card' : 'question-card '}`}>
      <div className='container flex'>
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
          {renderResponse()}
        </div>
      </div>
    </div>
  );
};

export default ChatStripe;
