import { useState, useEffect, SyntheticEvent, useRef } from 'react';

import { Answer, Button, Question, Textarea } from './components';
import ChatStripe from './components/chat-stripe';
import { Send } from './components/icon';

interface DataProps {
  id: string;
  question: string;
  answer?: string;
}
function App() {
  const [messages, setMessages] = useState<
    { uniqueId: string; isAi: boolean; value?: string; loading?: boolean }[]
  >([]);
  const [response, setResponse] = useState<any>(null);
  const [value, setValue] = useState<string>('');
  const [text, setText] = useState<string>('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatContainerRef.current?.scrollTo(
      0,
      chatContainerRef.current?.scrollHeight
    );
  }, [messages]);

  const typeText = (element: any, text: string) => {
    let index = 0;

    let interval = setInterval(() => {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);
  };
  const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // user's chatstripe
    const userId = generateUniqueId();
    const uniqueId = generateUniqueId();

    setMessages([
      ...messages,
      { uniqueId: userId, isAi: false, value: value },
      { uniqueId: uniqueId, isAi: true, loading: true },
    ]);

    e.target.reset();
    // to focus scroll to the bottom
    const chatContainer: HTMLElement | null =
      document.querySelector('#chat_container');

    console.log(chatContainer, 'chat-div');

    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: value,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        messages
          .filter(element => element.uniqueId === uniqueId)
          .map(message => ({ ...message, value: data, loading: false }));

        setResponse(data);
        setValue('');
      } else {
        setResponse('Something went wrong');
      }
    } catch (err) {
      console.log(err);
    }
  };

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  }
  return (
    <div>
      <div className='box'>
        <div id='chat_container' ref={chatContainerRef}>
          {messages.map((message, idx) => (
            <ChatStripe {...message} key={idx} />
          ))}
        </div>
        <div className='form-box'>
          <form className='form' onSubmit={handleSubmit}>
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
