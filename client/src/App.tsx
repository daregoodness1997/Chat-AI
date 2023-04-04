import { useState, useEffect } from 'react';

import './App.css';
import { Answer, Button, Question, Textarea } from './components';

function App() {
  const [text, setText] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  let loadInterval;

  useEffect(() => {
    const loadingIndicatorFunc = () => {
      let textContent = '';
      loadInterval = setInterval(() => {
        textContent += '.';
        if (textContent === '....') textContent = '';
        setText(textContent);
      }, 600);
    };
    loadingIndicatorFunc();
  }, []);

  console.log('loadiing', text);
  return (
    <div className='App'>
      <div className='box'>
        <Question label={question ? question : 'Enter your question'} />

        <Answer>{response ? response : text}</Answer>

        <form className='form'>
          <Textarea placeholder='Send a message...' />
          <Button label='Send' />
        </form>
      </div>
    </div>
  );
}

export default App;
