'use client'

import React, { useState, useEffect } from 'react';
import './globals.css';

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<number | string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleInput = (value: string) => {
    setInput((prev) => prev + value);
  };

  const calculateResult = () => {
    try {
      const calculated = handlePi(input);

      setResult(eval(calculated));
    } catch {
      setResult('Error');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult(null);
  };

  const handlePi = (input: string): string => {
    if(input.includes('pi')) {
      return input.replace('pi', '*' + Math.PI.toString());
    }

    return input;
  }

  if (!isMounted) return null; // Prevent SSR mismatch

  return (
      <div className="calculator-container">
        <div className="calculator-display">
          <h2>{input || '0'}</h2>
          <h2>{result !== null && result}</h2>
        </div>
        <div className="calculator-grid">
          <button className="calculator-button" onClick={() => handleInput('%')}>%</button>
          <button className="calculator-button" onClick={() => handleInput('pi')}>π</button>
          <button className="calculator-button" onClick={() => handleInput('**')}>x²</button>
          <button className="calculator-button" onClick={() => handleInput('/')}>÷</button>
          {[7, 8, 9].map((num) => (
              <button key={num} className="calculator-button" onClick={() => handleInput(num.toString())}>{num}</button>
          ))}
          <button className="calculator-button" onClick={() => handleInput('*')}>×</button>
          {[4, 5, 6].map((num) => (
              <button key={num} className="calculator-button" onClick={() => handleInput(num.toString())}>{num}</button>
          ))}
          <button className="calculator-button" onClick={() => handleInput('-')}>−</button>
          {[1, 2, 3].map((num) => (
              <button key={num} className="calculator-button" onClick={() => handleInput(num.toString())}>{num}</button>
          ))}
          <button className="calculator-button" onClick={() => handleInput('+')}>+</button>
          <button className="calculator-button" onClick={() => handleInput('0')}>0</button>
          <button className="calculator-button" onClick={clearInput}>DEL</button>
          <button className="calculator-button calculator-equal" onClick={calculateResult}>=</button>
        </div>
      </div>
  );
};

export default Calculator;