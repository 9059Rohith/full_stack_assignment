import React, { useState } from 'react';
import Display from './components/Display';
import ButtonGrid from './components/ButtonGrid';
import './App.css';

const App = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("0");
  const [mode, setMode] = useState("calc"); // "calc" or "string"

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

  const toggleMode = () => {
    setMode(mode === "calc" ? "string" : "calc");
    setInput("");
    setResult("0");
  };

  // String manipulation functions
  const updateString = (value) => {
    setInput(input + value);
    setResult(input + value);
  };

  const stringToUpperCase = () => {
    if (input) {
      const upper = input.toUpperCase();
      setResult(upper);
      setInput(upper);
    }
  };

  const stringToLowerCase = () => {
    if (input) {
      const lower = input.toLowerCase();
      setResult(lower);
      setInput(lower);
    }
  };

  const stringReverse = () => {
    if (input) {
      const reversed = input.split('').reverse().join('');
      setResult(reversed);
      setInput(reversed);
    }
  };

  const stringLength = () => {
    if (input) {
      setResult(`Length: ${input.length}`);
    }
  };

  const stringTrim = () => {
    if (input) {
      const trimmed = input.trim();
      setResult(trimmed);
      setInput(trimmed);
    }
  };

  const stringCapitalize = () => {
    if (input) {
      const capitalized = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
      setResult(capitalized);
      setInput(capitalized);
    }
  };

  const stringRemoveSpaces = () => {
    if (input) {
      const noSpaces = input.replace(/\s+/g, '');
      setResult(noSpaces);
      setInput(noSpaces);
    }
  };

  const stringWordCount = () => {
    if (input) {
      const words = input.trim().split(/\s+/).filter(word => word.length > 0);
      setResult(`Words: ${words.length}`);
    }
  };

  const stringTitleCase = () => {
    if (input) {
      const titleCase = input.toLowerCase().split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      setResult(titleCase);
      setInput(titleCase);
    }
  };

  const stringReplaceVowels = () => {
    if (input) {
      const replaced = input.replace(/[aeiouAEIOU]/g, '*');
      setResult(replaced);
      setInput(replaced);
    }
  };

  const stringAlternateCase = () => {
    if (input) {
      const alternate = input.split('').map((char, index) => 
        index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
      ).join('');
      setResult(alternate);
      setInput(alternate);
    }
  };

  return (
    <div className="wrapper">
      <div className="glass-calculator">
        <div className="mode-toggle">
          <button 
            className={`mode-btn ${mode === 'calc' ? 'active' : ''}`}
            onClick={toggleMode}
          >
            {mode === 'calc' ? '🔢 Calculator' : '🔤 String Tools'}
          </button>
        </div>
        <Display history={input} current={result} mode={mode} />
        <ButtonGrid 
          mode={mode}
          updateCalc={updateCalc}
          calculate={calculate}
          clear={clear}
          deleteLast={deleteLast}
          updateString={updateString}
          stringToUpperCase={stringToUpperCase}
          stringToLowerCase={stringToLowerCase}
          stringReverse={stringReverse}
          stringLength={stringLength}
          stringTrim={stringTrim}
          stringCapitalize={stringCapitalize}
          stringRemoveSpaces={stringRemoveSpaces}
          stringWordCount={stringWordCount}
          stringTitleCase={stringTitleCase}
          stringReplaceVowels={stringReplaceVowels}
          stringAlternateCase={stringAlternateCase}
        />
      </div>
    </div>
  );
};

export default App;