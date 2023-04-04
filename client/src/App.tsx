import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Answer, Button, Question, Textarea } from './components';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <div className='box'>
        <Question label='5 advanced project ideas in react js' />
        <Answer>5 advanced project ideas in react js </Answer>
        <form className='form'>
          <Textarea placeholder='Send a message...' />
          <Button label='Send' />
        </form>
      </div>
    </div>
  );
}

export default App;
