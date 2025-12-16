import React from 'react';
import { Link } from 'react-router-dom';
import ScientificCalculator from './ScientificCalculator';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] p-5">
            <nav className="text-center mb-5 p-2.5">
                <Link 
                    to="/about" 
                    className="text-white text-base no-underline bg-white/20 px-5 py-2.5 rounded-md transition-all duration-300 hover:bg-white/30"
                >
                    About
                </Link>
            </nav>
            <ScientificCalculator />
        </div>
    );
};

export default Home;