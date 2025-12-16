import React, { useState } from 'react';
import { calculatorAPI } from '../services/api';

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
        <div className="w-[400px] max-w-[95%] mx-auto my-8 p-5 bg-gradient-to-br from-calculator-dark to-[#34495e] rounded-[20px] shadow-calculator font-sans">
            {/* Display */}
            <div className="relative bg-calculator-darker rounded-[10px] p-4 mb-5 min-h-[80px] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                <div className="absolute top-2.5 left-4 text-[10px] text-calculator-blue font-bold bg-[rgba(52,152,219,0.2)] px-2 py-0.5 rounded">
                    {mode.toUpperCase()}
                </div>
                <div className="text-right text-[32px] text-calculator-light font-light tracking-wider break-all min-h-[45px] flex items-center justify-end pt-1.5">
                    {loading ? 'Calculating...' : display}
                </div>
                {error && (
                    <div className="text-calculator-red text-xs mt-1.5 text-right">
                        {error}
                    </div>
                )}
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-5 gap-2">
                {/* Row 1: Mode and Memory */}
                <button 
                    onClick={toggleMode}
                    className="p-3.5 text-sm font-semibold border-none rounded-lg cursor-pointer transition-all duration-200 shadow-button bg-gradient-to-br from-calculator-gray to-[#95a5a6] text-calculator-light hover:from-[#95a5a6] hover:to-calculator-gray active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {mode}
                </button>
                <button className="p-3.5 text-[13px] font-semibold border-none rounded-lg cursor-pointer transition-all duration-200 shadow-button bg-gradient-to-br from-calculator-gray to-[#95a5a6] text-calculator-light hover:from-[#95a5a6] hover:to-calculator-gray active:scale-95">
                    MC
                </button>
                <button className="p-3.5 text-[13px] font-semibold border-none rounded-lg cursor-pointer transition-all duration-200 shadow-button bg-gradient-to-br from-calculator-gray to-[#95a5a6] text-calculator-light hover:from-[#95a5a6] hover:to-calculator-gray active:scale-95">
                    MR
                </button>
                <button className="p-3.5 text-[13px] font-semibold border-none rounded-lg cursor-pointer transition-all duration-200 shadow-button bg-gradient-to-br from-calculator-gray to-[#95a5a6] text-calculator-light hover:from-[#95a5a6] hover:to-calculator-gray active:scale-95">
                    M+
                </button>
                <button className="p-3.5 text-[13px] font-semibold border-none rounded-lg cursor-pointer transition-all duration-200 shadow-button bg-gradient-to-br from-calculator-gray to-[#95a5a6] text-calculator-light hover:from-[#95a5a6] hover:to-calculator-gray active:scale-95">
                    M-
                </button>

                {/* Row 2: Scientific functions */}
                <button onClick={() => handleScientificOperation('sin')} className="p-3.5 text-sm font-semibold border-none rounded-lg cursor-pointer transition-all duration-200 shadow-button bg-gradient-to-br from-calculator-blue to-[#2980b9] text-white hover:from-[#2980b9] hover:to-calculator-blue active:scale-95" disabled={loading}>sin</button>
                <button onClick={() => handleScientificOperation('cos')} className="p-3.5 text-sm font-semibold border-none rounded-lg cursor-pointer transition-all duration-200 shadow-button bg-gradient-to-br from-calculator-blue to-[#2980b9] text-white hover:from-[#2980b9] hover:to-calculator-blue active:scale-95" disabled={loading}>cos</button>
                <button onClick={() => handleScientificOperation('tan')} className="p-3.5 text-sm font-semibold border-none rounded-lg cursor-pointer transition-all duration-200 shadow-button bg-gradient-to-br from-calculator-blue to-[#2980b9] text-white hover:from-[#2980b9] hover:to-calculator-blue active:scale-95" disabled={loading}>tan</button>
                <button onClick={() => handleScientificOperation('log')} className="p-3.5 text-sm font-semibold border-none rounded-lg cursor-pointer transition-all duration-200 shadow-button bg-gradient-to-br from-calculator-blue to-[#2980b9] text-white hover:from-[#2980b9] hover:to-calculator-blue active:scale-95" disabled={loading}>ln</button>
                <button onClick={() => handleScientificOperation('log10')} className="p-3.5 text-sm font-semibold border-none rounded-lg cursor-pointer transition-all duration-200 shadow-button bg-gradient-to-br from-calculator-blue to-[#2980b9] text-white hover:from-[#2980b9] hover:to-calculator-blue active:scale-95" disabled={loading}>log</button>

                {/* Row 3: More scientific functions */}
                <button onClick={() => handleScientificOperation('sqrt')} className="p-3.5 text-sm font-semibold border-none rounded-lg cursor-pointer transition-all duration-200 shadow-button bg-gradient-to-br from-calculator-blue to-[#2980b9] text-white hover:from-[#2980b9] hover:to-calculator-blue active:scale-95" disabled={loading}>√</button>
                <button onClick={() => handleBasicOperation('^')} className="p-3.5 text-sm font-semibold border-none rounded-lg cursor-pointer transition-all duration-200 shadow-button bg-gradient-to-br from-calculator-blue to-[#2980b9] text-white hover:from-[#2980b9] hover:to-calculator-blue active:scale-95" disabled={loading}>x^y</button>
                <button onClick={() => handleScientificOperation('exp')} className="p-3.5 text-sm font-semibold border-none rounded-lg cursor-pointer transition-all duration-200 shadow-button bg-gradient-to-br from-calculator-blue to-[#2980b9] text-white hover:from-[#2980b9] hover:to-calculator-blue active:scale-95" disabled={loading}>e^x</button>
                <button onClick={() => handleScientificOperation('factorial')} className="p-3.5 text-sm font-semibold border-none rounded-lg cursor-pointer transition-all duration-200 shadow-button bg-gradient-to-br from-calculator-blue to-[#2980b9] text-white hover:from-[#2980b9] hover:to-calculator_blue active:scale-95" disabled={loading}>x!</button>
                <button onClick={handleBackspace} className="p-3.5 text-xl font-bold border-none rounded-lg cursor-pointer transition-all duration-200 shadow-button bg-gradient-to-br from-calculator-orange to-[#d35400] text-white hover:from-[#d35400] hover:to-calculator-orange active:scale-95" disabled={loading}>←</button>

                {/* Row 4: Clear and operations */}
                <button onClick={handleClear} className="p-3.5 text-lg font-semibold border-none rounded-lg cursor-pointer transition-all duration-200 shadow-button bg-gradient-to-br from-calculator-red to-[#c0392b] text-white hover:from-[#c0392b] hover:to-calculator-red active:scale-95" disabled={loading}>C</button>
                <button onClick={() => handleBasicOperation('÷')} className="p-3.5 text-xl font-bold border-none rounded-lg cursor-pointer transition-all duration-200 shadow-button bg-gradient-to-br from-calculator-orange to-[#d35400] text-white hover:from-[#d35400] hover:to-calculator-orange active:scale-95" disabled={loading}>÷</button>
                <button onClick={() => handleBasicOperation('×')} className="p-3.5 text-xl font-bold border-none rounded-lg cursor-pointer transition-all duration-200 shadow-button bg-gradient-to-br from-calculator-orange to-[#d35400] text-white hover:from-[#d35400] hover:to-calculator-orange active:scale-95" disabled={loading}>×</button>
                <button onClick={() => handleBasicOperation('-')} className="p-3.5 text-xl font-bold border-none rounded-lg cursor-pointer transition-all duration-200 shadow-button bg-gradient-to-br from-calculator-orange to-[#d35400] text-white hover:from-[#d35400] hover:to-calculator-orange active:scale-95" disabled={loading}>−</button>
                <button onClick={() => handleBasicOperation('+')} className="p-3.5 text-xl font-bold border-none rounded-lg cursor-pointer transition-all duration-200 shadow-button bg-gradient-to-br from-calculator-orange to-[#d35400] text-white hover:from-[#d35400] hover:to-calculator-orange active:scale-95" disabled={loading}>+</button>

                {/* Number buttons */}
                {['7', '8', '9', '()', '%', '4', '5', '6', 'π', 'e', '1', '2', '3', '+/-'].map((btn) => (
                    <button 
                        key={btn}
                        onClick={() => handleNumberClick(btn)}
                        className="p-3.5 text-lg font-semibold border-none rounded-lg cursor-pointer transition-all duration-200 shadow-button bg-gradient-to-br from-calculator-light to-[#bdc3c7] text-calculator-dark hover:from-[#bdc3c7] hover:to-calculator-light active:scale-95"
                        disabled={loading}
                    >
                        {btn}
                    </button>
                ))}

                {/* Equals button */}
                <button 
                    onClick={calculateResult}
                    className="row-span-2 p-3.5 text-2xl font-semibold border-none rounded-lg cursor-pointer transition-all duration-200 shadow-button bg-gradient-to-br from-calculator-green to-[#229954] text-white hover:from-[#229954] hover:to-calculator-green active:scale-95"
                    disabled={loading}
                >
                    =
                </button>

                {/* Last row */}
                <button onClick={() => handleNumberClick('0')} className="col-span-2 p-3.5 text-lg font-semibold border-none rounded-lg cursor-pointer transition-all duration-200 shadow-button bg-gradient-to-br from-calculator-light to-[#bdc3c7] text-calculator-dark hover:from-[#bdc3c7] hover:to-calculator-light active:scale-95" disabled={loading}>0</button>
                <button onClick={handleDecimalClick} className="p-3.5 text-lg font-semibold border-none rounded-lg cursor-pointer transition-all duration-200 shadow-button bg-gradient-to-br from-calculator-light to-[#bdc3c7] text-calculator-dark hover:from-[#bdc3c7] hover:to-calculator-light active:scale-95" disabled={loading}>.</button>
                <button className="p-3.5 text-lg font-semibold border-none rounded-lg cursor-pointer transition-all duration-200 shadow-button bg-gradient-to-br from-calculator-light to-[#bdc3c7] text-calculator-dark hover:from-[#bdc3c7] hover:to-calculator-light active:scale-95" disabled={loading}>Ans</button>
            </div>
        </div>
    );
};

export default ScientificCalculator;