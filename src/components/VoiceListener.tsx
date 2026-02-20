import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

const VoiceListener: React.FC = () => {
    const navigate = useNavigate();
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setError('Voice recognition not supported');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        // Flag to prevent fighting with Settings page mic or unmounts
        let shouldKeepListening = true;

        recognition.onstart = () => {
            console.log("Voice Command Active");
            setIsListening(true);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            if (event.error === 'not-allowed') {
                shouldKeepListening = false;
                setError("Microphone access denied");
            }
        };

        recognition.onend = () => {
            setIsListening(false);
            // Auto-restart for "Always On" functionality
            if (shouldKeepListening) {
                try {
                    recognition.start();
                } catch (e) {
                    console.error("Restart failed", e);
                }
            }
        };

        recognition.onresult = (event: any) => {
            const lastResultIndex = event.results.length - 1;
            const transcript = event.results[lastResultIndex][0].transcript.trim().toLowerCase();
            const customKeyword = localStorage.getItem('sos_keyword')?.toLowerCase() || 'help me';

            console.log('Voice heard:', transcript);

            if (transcript.includes(customKeyword) || transcript.includes('emergency') || transcript.includes('sos')) {
                console.log('SOS Triggered via Voice:', transcript);
                shouldKeepListening = false; // Stop listening while navigating
                recognition.stop();
                navigate('/sos');
            }
        };

        try {
            recognition.start();
        } catch (e) {
            console.error(e);
        }

        return () => {
            shouldKeepListening = false;
            recognition.stop();
        };
    }, [navigate]);

    if (error) return null; // Or render a subtle indicator

    return (
        <div className="hidden">
            {/* Hidden component just for logic */}
            {isListening && <span id="voice-active-indicator">Listening</span>}
        </div>
    );
};

export default VoiceListener;
