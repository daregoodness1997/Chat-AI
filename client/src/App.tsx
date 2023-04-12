import { useState, useEffect, SyntheticEvent, useRef } from 'react';

import { Answer, Button, Question, Textarea } from './components';
import ChatStripe from './components/chat-stripe';
import { Send } from './components/icon';
import toast, { Toaster } from 'react-hot-toast';

interface DataProps {
  id: string;
  question: string;
  answer?: string;
}
function App() {
  const [messages, setMessages] = useState<
    { uniqueId: string; isAi: boolean; value?: string; loading?: boolean }[]
  >([]);
  const [value, setValue] = useState<string>('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    // user's chatstripe
    const userId = generateUniqueId();
    const uniqueId = generateUniqueId();

    setMessages([
      ...messages,
      { uniqueId: userId, isAi: false, value: value },
      { uniqueId: uniqueId, isAi: true, loading: true },
    ]);

    if (chatContainerRef) {
      chatContainerRef.current?.scrollTo(
        0,
        chatContainerRef.current?.scrollHeight
      );
    }

    await fetch(import.meta.env.VITE_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: value,
      }),
    })
      .then(async response => {
        const data = await response.json();
        const parsedData = data;

        setMessages(prevMessages => {
          return prevMessages.map(message => {
            if (message.uniqueId === uniqueId) {
              return {
                ...message,
                value: parsedData.data.choices[0].text,
                loading: false,
              };
            }
            return message;
          });
        });
        formRef.current?.reset();
      })
      .catch(err => {
        toast.error('Something went wrong!' + err);
      });
  };

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  }
  return (
    <div>
      <Toaster />
      <div className='box'>
        <div
          id='chat_container'
          className='chat-container'
          ref={chatContainerRef}
        >
          {messages.map((message, idx) => (
            <ChatStripe {...message} key={idx} />
          ))}
        </div>

        <div className='form-box container'>
          <form ref={formRef} className='form' onSubmit={handleSubmit}>
            <Textarea
              placeholder='Send a message...'
              onChange={e => setValue(e.target.value)}
              required
              onKeyDown={handleKeyDown}
            />
            <Button type='submit'>
              <Send />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
