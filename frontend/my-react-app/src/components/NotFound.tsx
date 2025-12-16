import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1 style={{ fontSize: '72px', margin: '0', color: '#dc3545' }}>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>
            <Link to="/" className="button" style={{ 
                display: 'inline-block', 
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                borderRadius: '5px',
                textDecoration: 'none'
            }}>
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;