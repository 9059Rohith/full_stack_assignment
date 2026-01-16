import React, { useState } from 'react';
import Display from './components/Display';
import ButtonGrid from './components/ButtonGrid';
import './App.css';

const App = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("0");

  const ops = ['/', '*', '+', '-', '.'];

  const updateCalc = (value) => {
    if (
      (ops.includes(value) && input === '') ||
      (ops.includes(value) && ops.includes(input.slice(-1)))
    ) return;

    const newInput = input + value;
    setInput(newInput);

    if (!ops.includes(value)) {
      try {
        setResult(eval(newInput).toString());
      } catch (e) { }
    }
  };

  const calculate = () => {
    try {
      const finalResult = eval(input).toString();
      setInput(finalResult);
      setResult(finalResult);
    } catch (err) {
      setResult("Error");
    }
  };

  const clear = () => {
    setInput("");
    setResult("0");
  };

  const deleteLast = () => {
    const val = input.slice(0, -1);
    setInput(val);
    if(val === "") setResult("0");
  };

  return (
    <div className="wrapper">
      <div className="glass-calculator">
        <Display history={input} current={result} />
        <ButtonGrid 
          updateCalc={updateCalc}
          calculate={calculate}
          clear={clear}
          deleteLast={deleteLast}
        />
      </div>
    </div>
  );
};

export default App;