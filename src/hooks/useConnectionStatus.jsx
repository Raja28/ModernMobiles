import { useState, useEffect } from 'react';

export default function useOnlineStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const updateOnlineStatus = () => {
        setIsOnline(navigator.onLine);
    };
    useEffect(() => {
        window.addEventListener('online', updateOnlineStatus); window.addEventListener('offline', updateOnlineStatus);
        return () => {
            window.removeEventListener('online', updateOnlineStatus); window.removeEventListener('offline', updateOnlineStatus);
        };
    }, []);
    return isOnline
}