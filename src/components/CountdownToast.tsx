import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from 'react';

const CountdownToast = ({ initialTime, onEnd }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(prevTimeLeft => {
                if (prevTimeLeft <= 1) {
                    clearInterval(intervalId);
                    onEnd();
                    return 0;
                }
                return prevTimeLeft - 1;
            });
    }, 1000);

    return () => clearInterval(intervalId);
    }, [onEnd]);

    return (
        <div>
            Reservation successful, redirecting you to restaurants page in {timeLeft} seconds
        </div>
    );
};

export default CountdownToast;