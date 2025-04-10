import React, { useEffect, useState } from 'react';
import "./Alert.css";


function Alert({ onClose, message }) {
    const [visible, setVisible] = useState(true);
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            handleClose();
        }, 3000);
        return () => clearTimeout(timeout);
    }, []);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setVisible(false);
            onClose();
        }, 300); // khớp với transition duration
    };

    if (!visible) return null;

    return (
        <div className='absolute top-5 left-1/2 -translate-x-1/2 flex justify-center z-50 items-start'>
            <div
                className={`px-4 py-2 max-w-xs w-full bg-red-600/70 text-white rounded
                    shadow-md flex items-center justify-between transition-all duration-300 ease-in-out
                    ${closing ? 'opacity-0 scale-75' : 'opacity-100 scale-100 animate-slide-down'}
                `}
                style={{
                    padding: "10px",
                    width: "300px",
                }}>
                <div className="flex items-center">
                    <p className="text-sm ml-2">{message || "Errors"}</p>
                </div>
                <button onClick={handleClose} className="ml-4">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M15 5 5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>

    );
}


export default Alert;
