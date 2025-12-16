import React from 'react';
import { Link } from 'react-router-dom';
import Calculator from './Calculator';

const Home: React.FC = () => {
    return (
        <div className="container">
            <nav style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Link to="/about" style={{ marginRight: '20px', color: '#007bff' }}>About</Link>
            </nav>
            <Calculator />
        </div>
    );
};

export default Home;