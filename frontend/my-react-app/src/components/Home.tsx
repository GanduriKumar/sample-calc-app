import React from 'react';
import { Link } from 'react-router-dom';
import ScientificCalculator from './ScientificCalculator';

const Home: React.FC = () => {
    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '20px'
        }}>
            <nav style={{ 
                textAlign: 'center', 
                marginBottom: '20px',
                padding: '10px'
            }}>
                <Link 
                    to="/about" 
                    style={{ 
                        color: 'white',
                        fontSize: '16px',
                        textDecoration: 'none',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        transition: 'all 0.3s'
                    }}
                >
                    About
                </Link>
            </nav>
            <ScientificCalculator />
        </div>
    );
};

export default Home;