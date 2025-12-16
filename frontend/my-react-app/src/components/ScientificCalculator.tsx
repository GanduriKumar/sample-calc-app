import React, { useState } from 'react';
import { calculatorAPI } from '../services/api';
import '../styles/ScientificCalculator.css';

const ScientificCalculator: React.FC = () => {
    const [display, setDisplay] = useState<string>('0');
    const [currentValue, setCurrentValue] = useState<string>('');
    const [previousValue, setPreviousValue] = useState<string>('');
    const [operation, setOperation] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [mode, setMode] = useState<'deg' | 'rad'>('deg');

    const handleNumberClick = (num: string) => {
        if (display === '0' || display === 'Error') {
            setDisplay(num);
            setCurrentValue(num);
        } else {
            setDisplay(display + num);
            setCurrentValue(currentValue + num);
        }
        setError('');
    };

    const handleDecimalClick = () => {
        if (!currentValue.includes('.')) {
            const newValue = currentValue + '.';
            setCurrentValue(newValue);
            setDisplay(display + '.');
        }
    };

    const handleClear = () => {
        setDisplay('0');
        setCurrentValue('');
        setPreviousValue('');
        setOperation('');
        setError('');
    };

    const handleBasicOperation = async (op: string) => {
        if (currentValue === '') return;

        if (previousValue !== '' && operation !== '') {
            await calculateResult();
        } else {
            setPreviousValue(currentValue);
            setCurrentValue('');
            setOperation(op);
            setDisplay(display + ' ' + op + ' ');
        }
    };

    const handleScientificOperation = async (op: string) => {
        if (currentValue === '') return;
        
        setLoading(true);
        setError('');

        try {
            const x = parseFloat(currentValue);
            let radValue = x;
            
            // Convert to radians if in degree mode for trig functions
            if (mode === 'deg' && ['sin', 'cos', 'tan'].includes(op)) {
                radValue = (x * Math.PI) / 180;
            }

            let result: number;
            
            switch (op) {
                case 'sin':
                    result = await calculatorAPI.sin({ x: radValue });
                    break;
                case 'cos':
                    result = await calculatorAPI.cos({ x: radValue });
                    break;
                case 'tan':
                    result = await calculatorAPI.tan({ x: radValue });
                    break;
                case 'log':
                    result = await calculatorAPI.log({ x });
                    break;
                case 'log10':
                    result = await calculatorAPI.log10({ x });
                    break;
                case 'exp':
                    result = await calculatorAPI.exp({ x });
                    break;
                case 'sqrt':
                    result = await calculatorAPI.sqrt({ x });
                    break;
                case 'factorial':
                    result = await calculatorAPI.factorial({ x });
                    break;
                default:
                    result = 0;
            }

            const formattedResult = Number(result.toFixed(10)).toString();
            setDisplay(formattedResult);
            setCurrentValue(formattedResult);
            setPreviousValue('');
            setOperation('');
        } catch (err: any) {
            setError(err.message || 'Error');
            setDisplay('Error');
        } finally {
            setLoading(false);
        }
    };

    const calculateResult = async () => {
        if (previousValue === '' || currentValue === '' || operation === '') return;

        setLoading(true);
        setError('');

        try {
            const a = parseFloat(previousValue);
            const b = parseFloat(currentValue);
            let result: number;

            switch (operation) {
                case '+':
                    result = await calculatorAPI.add({ a, b });
                    break;
                case '-':
                    result = await calculatorAPI.subtract({ a, b });
                    break;
                case '×':
                    result = await calculatorAPI.multiply({ a, b });
                    break;
                case '÷':
                    result = await calculatorAPI.divide({ a, b });
                    break;
                case '^':
                    result = await calculatorAPI.power({ a, b });
                    break;
                default:
                    result = 0;
            }

            const formattedResult = Number(result.toFixed(10)).toString();
            setDisplay(formattedResult);
            setCurrentValue(formattedResult);
            setPreviousValue('');
            setOperation('');
        } catch (err: any) {
            setError(err.message || 'Error');
            setDisplay('Error');
        } finally {
            setLoading(false);
        }
    };

    const handleBackspace = () => {
        if (currentValue.length > 0) {
            const newValue = currentValue.slice(0, -1);
            setCurrentValue(newValue);
            setDisplay(newValue || '0');
        }
    };

    const toggleMode = () => {
        setMode(mode === 'deg' ? 'rad' : 'deg');
    };

    return (
        <div className="scientific-calculator">
            <div className="calculator-display">
                <div className="mode-indicator">{mode.toUpperCase()}</div>
                <div className="display-screen">{loading ? 'Calculating...' : display}</div>
                {error && <div className="error-message">{error}</div>}
            </div>

            <div className="calculator-buttons">
                {/* Row 1: Mode and Memory */}
                <button className="btn btn-function" onClick={toggleMode}>{mode}</button>
                <button className="btn btn-function">MC</button>
                <button className="btn btn-function">MR</button>
                <button className="btn btn-function">M+</button>
                <button className="btn btn-function">M-</button>

                {/* Row 2: Scientific functions */}
                <button className="btn btn-scientific" onClick={() => handleScientificOperation('sin')}>sin</button>
                <button className="btn btn-scientific" onClick={() => handleScientificOperation('cos')}>cos</button>
                <button className="btn btn-scientific" onClick={() => handleScientificOperation('tan')}>tan</button>
                <button className="btn btn-scientific" onClick={() => handleScientificOperation('log')}>ln</button>
                <button className="btn btn-scientific" onClick={() => handleScientificOperation('log10')}>log</button>

                {/* Row 3: More scientific functions */}
                <button className="btn btn-scientific" onClick={() => handleScientificOperation('sqrt')}>√</button>
                <button className="btn btn-scientific" onClick={() => handleBasicOperation('^')}>x^y</button>
                <button className="btn btn-scientific" onClick={() => handleScientificOperation('exp')}>e^x</button>
                <button className="btn btn-scientific" onClick={() => handleScientificOperation('factorial')}>x!</button>
                <button className="btn btn-operation" onClick={handleBackspace}>←</button>

                {/* Row 4: Clear and operations */}
                <button className="btn btn-clear" onClick={handleClear}>C</button>
                <button className="btn btn-operation" onClick={() => handleBasicOperation('÷')}>÷</button>
                <button className="btn btn-operation" onClick={() => handleBasicOperation('×')}>×</button>
                <button className="btn btn-operation" onClick={() => handleBasicOperation('-')}>−</button>
                <button className="btn btn-operation" onClick={() => handleBasicOperation('+')}>+</button>

                {/* Rows 5-8: Number pad */}
                <button className="btn btn-number" onClick={() => handleNumberClick('7')}>7</button>
                <button className="btn btn-number" onClick={() => handleNumberClick('8')}>8</button>
                <button className="btn btn-number" onClick={() => handleNumberClick('9')}>9</button>
                <button className="btn btn-number" onClick={() => handleNumberClick('()')}>()</button>
                <button className="btn btn-number" onClick={() => handleNumberClick('%')}>%</button>

                <button className="btn btn-number" onClick={() => handleNumberClick('4')}>4</button>
                <button className="btn btn-number" onClick={() => handleNumberClick('5')}>5</button>
                <button className="btn btn-number" onClick={() => handleNumberClick('6')}>6</button>
                <button className="btn btn-number" onClick={() => handleNumberClick('π')}>π</button>
                <button className="btn btn-number" onClick={() => handleNumberClick('e')}>e</button>

                <button className="btn btn-number" onClick={() => handleNumberClick('1')}>1</button>
                <button className="btn btn-number" onClick={() => handleNumberClick('2')}>2</button>
                <button className="btn btn-number" onClick={() => handleNumberClick('3')}>3</button>
                <button className="btn btn-number" onClick={() => handleNumberClick('+/-')}>+/-</button>
                <button className="btn btn-equals" onClick={calculateResult}>=</button>

                <button className="btn btn-number btn-zero" onClick={() => handleNumberClick('0')}>0</button>
                <button className="btn btn-number" onClick={handleDecimalClick}>.</button>
                <button className="btn btn-number">Ans</button>
            </div>
        </div>
    );
};

export default ScientificCalculator;