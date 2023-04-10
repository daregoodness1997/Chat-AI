import { useState, useEffect, SyntheticEvent, useRef } from 'react';

import { Answer, Button, Question, Textarea } from './components';
import { Send } from './components/icon';

interface DataProps {
  id: string;
  question: string;
  answer?: string;
}
function App() {
  const chatRef = useRef<{ scrollTop?: string; scrollHeight?: string }>({});
  const responseRef = useRef(null);
  // const formRef = useRef<any>('');
  const [text, setText] = useState<string>('');
  const [response, setResponse] = useState<any>(null);
  const [fetchData, setFetchData] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [data, setData] = useState<[DataProps] | null>(null);

  const loadingIndicatorFunc = () => {
    let textContent = '';
    setInterval(() => {
      textContent += '.';
      if (textContent === '....') textContent = '';
      setText(textContent);
    }, 600);
  };

  const typeText = (text: string) => {
    let index = 0;
    let responseContent = '';

    let interval = setInterval(() => {
      if (index < text.length) {
        responseContent += text.charAt(index);
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

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setQuestion(value);
    const id = generateUniqueId();
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
    loadingIndicatorFunc();
    setFetchData(true);

    setData([{ id: id, question: value }]);

    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: question,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        setResponse(data);
        setFetchData(false);
        setValue('');
      } else {
        const data = 'Something went wrong';
        const passedData = typeText(data);

        setResponse(data);
        setFetchData(false);
      }
    } catch (err) {
      console.log(err);
      setFetchData(true);
    }
  };

  // formRef.current.addEventListener('keyup', (e: any) => {
  //   if (e.keyCode === 13) {
  //     handleSubmit(e);
  //   }
  // });

  console.log('Response', response);

  return (
    <div>
      <div className='box'>
        {question ? (
          <Question
            label={question ? question : 'Enter your question'}
            ref={chatRef}
          />
        ) : null}

        {response || fetchData ? (
          <Answer>{fetchData ? text : response}</Answer>
        ) : null}

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
