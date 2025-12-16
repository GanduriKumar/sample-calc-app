import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] p-10">
            <div className="max-w-[800px] mx-auto bg-white p-10 rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
                <nav className="text-center mb-8">
                    <Link 
                        to="/" 
                        className="text-[#667eea] text-base no-underline border-2 border-[#667eea] px-5 py-2.5 rounded-md transition-all duration-300 hover:bg-[#667eea] hover:text-white"
                    >
                        ← Back to Calculator
                    </Link>
                </nav>
                
                <h1 className="text-calculator-dark text-center mb-5 text-3xl font-bold">
                    About Scientific Calculator
                </h1>
                
                <p className="text-base leading-relaxed text-gray-600">
                    This is a full-featured scientific calculator built with FastAPI backend and React frontend.
                </p>
                
                <h2 className="text-calculator-dark mt-8 mb-4 text-2xl font-semibold">Features:</h2>
                <ul className="list-disc pl-10 leading-loose text-gray-600">
                    <li>Basic arithmetic operations (Addition, Subtraction, Multiplication, Division)</li>
                    <li>Scientific functions (Sin, Cos, Tan, Log, Ln, Exp, Square Root)</li>
                    <li>Power and Factorial calculations</li>
                    <li>Degree/Radian mode toggle</li>
                    <li>Memory functions (MC, MR, M+, M-)</li>
                    <li>Traditional calculator interface</li>
                </ul>
                
                <h2 className="text-calculator-dark mt-8 mb-4 text-2xl font-semibold">Tech Stack:</h2>
                <ul className="list-disc pl-10 leading-loose text-gray-600">
                    <li><strong>Backend:</strong> FastAPI (Python) with Uvicorn server</li>
                    <li><strong>Frontend:</strong> React 18 with TypeScript</li>
                    <li><strong>Styling:</strong> Tailwind CSS</li>
                    <li><strong>Build Tool:</strong> Vite</li>
                    <li><strong>HTTP Client:</strong> Axios</li>
                    <li><strong>Routing:</strong> React Router v6</li>
                </ul>
            </div>
        </div>
    );
};

export default About;