import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
    return (
        <div style={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '40px'
        }}>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                backgroundColor: 'white',
                padding: '40px',
                borderRadius: '20px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
            }}>
                <nav style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <Link 
                        to="/" 
                        style={{ 
                            color: '#667eea',
                            fontSize: '16px',
                            textDecoration: 'none',
                            border: '2px solid #667eea',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            transition: 'all 0.3s'
                        }}
                    >
                        ← Back to Calculator
                    </Link>
                </nav>
                
                <h1 style={{ color: '#2c3e50', textAlign: 'center', marginBottom: '20px' }}>
                    About Scientific Calculator
                </h1>
                
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
                    This is a full-featured scientific calculator built with FastAPI backend and React frontend.
                </p>
                
                <h2 style={{ color: '#2c3e50', marginTop: '30px', marginBottom: '15px' }}>Features:</h2>
                <ul style={{ listStyle: 'disc', paddingLeft: '40px', lineHeight: '2', color: '#555' }}>
                    <li>Basic arithmetic operations (Addition, Subtraction, Multiplication, Division)</li>
                    <li>Scientific functions (Sin, Cos, Tan, Log, Ln, Exp, Square Root)</li>
                    <li>Power and Factorial calculations</li>
                    <li>Degree/Radian mode toggle</li>
                    <li>Memory functions (MC, MR, M+, M-)</li>
                    <li>Traditional calculator interface</li>
                </ul>
                
                <h2 style={{ color: '#2c3e50', marginTop: '30px', marginBottom: '15px' }}>Tech Stack:</h2>
                <ul style={{ listStyle: 'disc', paddingLeft: '40px', lineHeight: '2', color: '#555' }}>
                    <li><strong>Backend:</strong> FastAPI (Python) with Uvicorn server</li>
                    <li><strong>Frontend:</strong> React 18 with TypeScript</li>
                    <li><strong>Build Tool:</strong> Vite</li>
                    <li><strong>HTTP Client:</strong> Axios</li>
                    <li><strong>Routing:</strong> React Router v6</li>
                </ul>
            </div>
        </div>
    );
};

export default About;