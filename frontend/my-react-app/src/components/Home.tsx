import React from 'react';
import { Link } from 'react-router-dom';
import ScientificCalculator from './ScientificCalculator';

const Home: React.FC = () => {
    return (
        <div className="container">
            <nav style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Link to="/about" style={{ marginRight: '20px', color: '#007bff' }}>About</Link>
            </nav>
            <ScientificCalculator />
        </div>
    );
};

export default Home;