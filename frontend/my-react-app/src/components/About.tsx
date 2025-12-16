import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
    return (
        <div className="container">
            <nav style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Link to="/" style={{ color: '#007bff' }}>Home</Link>
            </nav>
            <h1>About Calculator App</h1>
            <p>This is a FastAPI-powered calculator with a React frontend built with Vite.</p>
            <h2>Features:</h2>
            <ul style={{ listStyle: 'disc', paddingLeft: '40px' }}>
                <li>Addition</li>
                <li>Subtraction</li>
                <li>Multiplication</li>
                <li>Division</li>
            </ul>
            <h2>Tech Stack:</h2>
            <ul style={{ listStyle: 'disc', paddingLeft: '40px' }}>
                <li>Backend: FastAPI (Python)</li>
                <li>Frontend: React with TypeScript</li>
                <li>Build Tool: Vite</li>
            </ul>
        </div>
    );
};

export default About;