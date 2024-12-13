'use client'

import React, { useState, useEffect } from 'react';
import './globals.css';

const Calculator: React.FC = () => {
  // State to store user input
  const [input, setInput] = useState<string>('');

  // State to store the calculated result
  const [result, setResult] = useState<number | string | null>(null);

  // State to track whether the component is mounted (for hydration)
  const [isMounted, setIsMounted] = useState(false);

  // useEffect to set the component as mounted, preventing SSR mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Function to handle user input (appends the clicked value to input)
  const handleInput = (value: string) => {
    setInput((prev) => prev + value);
  };

  // Function to calculate the result of the entered input
  const calculateResult = () => {
    try {
      // Replace 'pi' with its numeric value in the input string
      const calculated = handlePi(input);

      // Evaluate the input string and update the result state
      setResult(eval(calculated));
    } catch {

      // Set result to 'Error' if evaluation fails
      setResult('Error');
    }
  };

  // Function to clear the input and result
  const clearInput = () => {
    setInput('');
    setResult(null);
  };

  // Function to handle 'pi' input and replace it with its numeric value
  const handlePi = (input: string): string => {
    if(input.includes('pi')) {
      return input.replace('pi', '*' + Math.PI.toString());
    }

    return input;
  }

  // Prevent rendering if the component is not mounted (to avoid SSR issues)
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