import React, { useState } from 'react';
import { calculatorAPI } from '../services/api';
import '../styles/Calculator.css';

const Calculator: React.FC = () => {
    const [numA, setNumA] = useState<string>('');
    const [numB, setNumB] = useState<string>('');
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleOperation = async (operation: keyof typeof calculatorAPI) => {
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

    const clearInputs = () => {
        setNumA('');
        setNumB('');
        setResult(null);
        setError('');
    };

    return (
        <div className="calculator-container">
            <h1>FastAPI Calculator</h1>
            
            <div className="input-section">
                <input
                    type="number"
                    placeholder="First number"
                    value={numA}
                    onChange={(e) => setNumA(e.target.value)}
                    disabled={loading}
                />
                <input
                    type="number"
                    placeholder="Second number"
                    value={numB}
                    onChange={(e) => setNumB(e.target.value)}
                    disabled={loading}
                />
            </div>

            <div className="button-section">
                <button onClick={() => handleOperation('add')} disabled={loading}>
                    + Add
                </button>
                <button onClick={() => handleOperation('subtract')} disabled={loading}>
                    - Subtract
                </button>
                <button onClick={() => handleOperation('multiply')} disabled={loading}>
                    × Multiply
                </button>
                <button onClick={() => handleOperation('divide')} disabled={loading}>
                    ÷ Divide
                </button>
                <button onClick={clearInputs} disabled={loading} className="clear-btn">
                    Clear
                </button>
            </div>

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

export default Calculator;