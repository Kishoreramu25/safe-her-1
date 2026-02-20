import React from 'react';
import { useNavigate } from 'react-router-dom';

const SOSButton: React.FC = () => {
    const navigate = useNavigate();

    const handleSOS = () => {
        navigate('/sos');
    };

    return (
        <button
            onClick={handleSOS}
            className="size-16 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/40 flex items-center justify-center border-4 border-background-light dark:border-background-dark active:scale-95 transition-all animate-pulse-slow"
        >
            <span className="font-bold text-lg tracking-wider">SOS</span>
        </button>
    );
};

export default SOSButton;
