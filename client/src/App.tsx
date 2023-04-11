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
  const [messages, setMessages] = useState<any[]>([]);
  const [response, setResponse] = useState<any>(null);
  const [value, setValue] = useState<string>('');
  let loadInterval;
  const loader = (element: any) => {
    element.textContent = '';

    loadInterval = setInterval(() => {
      // Update the text content of the loading indicator
      element.textContent += '.';

      // If the loading indicator has reached three dots, reset it
      if (element.textContent === '....') {
        element.textContent = '';
      }
    }, 300);
  };

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

  console.log(messages);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // user's chatstripe
    const userId = generateUniqueId();
    const uniqueId = generateUniqueId();

    setMessages([
      ...messages,
      { uniqueId: userId, isAi: false, value: value },
      { uniqueId: uniqueId, isAi: true },
    ]);

    e.target.reset();
    // to focus scroll to the bottom
    const chatContainer = document.querySelector('#chat_container');

    chatContainer.scrollTop = chatContainer.scrollHeight;

    // specific message div
    const messageDiv = document.getElementById(uniqueId);

    // messageDiv.innerHTML = "..."
    loader(messageDiv);

    clearInterval(loadInterval);
    // @ts-ignore
    messageDiv.innerHTML = ' ';

    if (response.ok) {
      const data = await response.json();
      const parsedData = data.bot.trim(); // trims any trailing spaces/'\n'

      typeText(messageDiv, parsedData);
    } else {
      const err = await response.text();

      // @ts-ignore

      messageDiv.innerHTML = 'Something went wrong';
      alert(err);
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

        setResponse(data);
        setValue('');
      } else {
        setResponse('Something went wrong');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className='box'>
        <div id='chat_container'>
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
