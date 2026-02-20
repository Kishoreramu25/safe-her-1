import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SOSActivation: React.FC = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);
    const [active, setActive] = useState(false);

    useEffect(() => {
        let timer: number;
        if (countdown > 0 && !active) {
            timer = setTimeout(() => setCountdown(c => c - 1), 1000);
        } else if (countdown === 0 && !active) {
            setActive(true);
            // Trigger API to send email
            const sendEmail = async () => {
                const emergencyEmail = localStorage.getItem('emergency_email');
                if (!emergencyEmail) return;

                try {
                    await fetch('http://localhost:5000/send-sos-email', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            recipient_email: emergencyEmail,
                            location: '34.0522, -118.2437', // Mock for now, would use Geolocation API
                        })
                    });
                    console.log('SOS SENT: Email dispatch requested.');
                } catch (e) {
                    console.error('Failed to send SOS email:', e);
                }
            };
            sendEmail();
        }
        return () => clearTimeout(timer);
    }, [countdown, active]);

    const handleCancel = () => {
        navigate('/dashboard'); // Or back to previous
    };

    return (
        <div className="bg-slate-900 text-white min-h-screen flex flex-col items-center justify-center font-display relative overflow-hidden">
            {/* Pulsing Background */}
            <div className={`absolute inset-0 bg-red-600 transition-opacity duration-1000 ${active ? 'animate-pulse opacity-80' : 'opacity-0'}`}></div>

            <div className="z-10 flex flex-col items-center w-full max-w-md px-6 text-center">

                {!active ? (
                    <>
                        <h1 className="text-4xl font-bold mb-2">SOS TRIGGERED</h1>
                        <p className="text-slate-300 mb-10">Sending alert in...</p>

                        <div className="relative size-40 flex items-center justify-center mb-10">
                            <svg className="absolute inset-0 size-full -rotate-90">
                                <circle cx="80" cy="80" r="70" fill="none" stroke="#334155" strokeWidth="8" />
                                <circle
                                    cx="80" cy="80" r="70" fill="none" stroke="#ef4444" strokeWidth="8"
                                    strokeDasharray="440"
                                    strokeDashoffset={440 - (440 * countdown) / 5}
                                    className="transition-all duration-1000"
                                />
                            </svg>
                            <span className="text-6xl font-black">{countdown}</span>
                        </div>

                        <button
                            onClick={handleCancel}
                            className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform"
                        >
                            CANCEL
                        </button>
                    </>
                ) : (
                    <>
                        <div className="size-32 bg-white rounded-full flex items-center justify-center mb-6 animate-bounce">
                            <span className="material-symbols-outlined text-red-600 text-6xl">campaign</span>
                        </div>
                        <h1 className="text-3xl font-bold mb-2">ALERT SENT</h1>
                        Your live location has been shared via email to <strong>helper@mail.com</strong> (and authorities).

                        <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 w-full mb-8 border border-white/10">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-mono">GPS: 34.0522, -118.2437</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-mono">Audio Recording Active...</span>
                            </div>
                        </div>

                        <button
                            onClick={handleCancel}
                            className="px-8 py-3 bg-red-800/50 hover:bg-red-800 text-white/50 hover:text-white rounded-lg text-sm font-semibold transition-colors border border-red-500/30"
                        >
                            Deactivate Alarm
                        </button>
                    </>
                )}

            </div>
        </div>
    );
};

export default SOSActivation;
