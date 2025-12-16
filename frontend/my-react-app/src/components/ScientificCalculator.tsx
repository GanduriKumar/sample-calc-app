import React, { useState } from 'react';
import { calculatorAPI } from '../services/api';
import '../styles/ScientificCalculator.css';

const ScientificCalculator: React.FC = () => {
    const [numA, setNumA] = useState<string>('');
    const [numB, setNumB] = useState<string>('');
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [mode, setMode] = useState<'basic' | 'scientific'>('basic');

    const handleBasicOperation = async (operation: 'add' | 'subtract' | 'multiply' | 'divide' | 'power') => {
        setError('');
        setResult(null);
        setLoading(true);

        const a = parseFloat(numA);
        const b = parseFloat(numB);

        if (isNaN(a) || isNaN(b)) {
            setError('Please enter valid numbers');
            setLoading(false);
            return;
        }

        try {
            const data = { a, b };
            const calculatedResult = await calculatorAPI[operation](data);
            setResult(calculatedResult);
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleScientificOperation = async (operation: 'sin' | 'cos' | 'tan' | 'log' | 'log10' | 'exp' | 'sqrt' | 'factorial') => {
        setError('');
        setResult(null);
        setLoading(true);

        const x = parseFloat(numA);

        if (isNaN(x)) {
            setError('Please enter a valid number');
            setLoading(false);
            return;
        }

        try {
            const data = { x };
            const calculatedResult = await calculatorAPI[operation](data);
            setResult(calculatedResult);
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const clearInputs = () => {
        setNumA('');
        setNumB('');
        setResult(null);
        setError('');
    };

    return (
        <div className="scientific-calculator-container">
            <h1>Scientific Calculator</h1>
            
            <div className="mode-toggle">
                <button 
                    className={mode === 'basic' ? 'active' : ''}
                    onClick={() => setMode('basic')}
                >
                    Basic
                </button>
                <button 
                    className={mode === 'scientific' ? 'active' : ''}
                    onClick={() => setMode('scientific')}
                >
                    Scientific
                </button>
            </div>

            <div className="input-section">
                <input
                    type="number"
                    placeholder={mode === 'scientific' ? "Enter number" : "First number"}
                    value={numA}
                    onChange={(e) => setNumA(e.target.value)}
                    disabled={loading}
                />
                {mode === 'basic' && (
                    <input
                        type="number"
                        placeholder="Second number"
                        value={numB}
                        onChange={(e) => setNumB(e.target.value)}
                        disabled={loading}
                    />
                )}
            </div>

            {mode === 'basic' ? (
                <div className="button-section basic">
                    <button onClick={() => handleBasicOperation('add')} disabled={loading}>
                        +
                    </button>
                    <button onClick={() => handleBasicOperation('subtract')} disabled={loading}>
                        -
                    </button>
                    <button onClick={() => handleBasicOperation('multiply')} disabled={loading}>
                        ×
                    </button>
                    <button onClick={() => handleBasicOperation('divide')} disabled={loading}>
                        ÷
                    </button>
                    <button onClick={() => handleBasicOperation('power')} disabled={loading}>
                        x^y
                    </button>
                    <button onClick={clearInputs} disabled={loading} className="clear-btn">
                        Clear
                    </button>
                </div>
            ) : (
                <div className="button-section scientific">
                    <button onClick={() => handleScientificOperation('sin')} disabled={loading}>
                        sin
                    </button>
                    <button onClick={() => handleScientificOperation('cos')} disabled={loading}>
                        cos
                    </button>
                    <button onClick={() => handleScientificOperation('tan')} disabled={loading}>
                        tan
                    </button>
                    <button onClick={() => handleScientificOperation('log')} disabled={loading}>
                        ln
                    </button>
                    <button onClick={() => handleScientificOperation('log10')} disabled={loading}>
                        log10
                    </button>
                    <button onClick={() => handleScientificOperation('exp')} disabled={loading}>
                        e^x
                    </button>
                    <button onClick={() => handleScientificOperation('sqrt')} disabled={loading}>
                        √
                    </button>
                    <button onClick={() => handleScientificOperation('factorial')} disabled={loading}>
                        n!
                    </button>
                    <button onClick={clearInputs} disabled={loading} className="clear-btn">
                        Clear
                    </button>
                </div>
            )}

            {loading && <div className="loading">Calculating...</div>}

            {result !== null && (
                <div className="result-section">
                    <h2>Result: {result}</h2>
                </div>
            )}

            {error && <div className="error-section">{error}</div>}
        </div>
    );
};

export default ScientificCalculator;