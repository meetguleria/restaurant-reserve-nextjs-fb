import { useState, useEffect, useCallback } from "react";
import { useRouter } from 'next/router';
import { addReservation, Reservation } from '../src/api';
import { useAuth } from '../src/authContext';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// @ts-ignore
import { BsBoxArrowInLeft } from 'react-icons/bs';

const ReservationForm: React.FC = () => {

    const router = useRouter();
    const { restaurantId } = router.query;
    const { user } = useAuth();

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [numGuests, setnumGuests] = useState(0);
    const [showGuestPicker, setShowGuestPicker] = useState(false);
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            const duration = 5;
            let timeLeft = duration;

                // Show success toast
            toast(`Reservation successful, redirecting you to restaurants page in ${timeLeft} seconds`, {
                toastId: "toast-id",
                autoClose: duration * 1000,
                onClose: () => {
                    router.push("/")
                },
            });

            const intervalId = setInterval(() => {
                timeLeft--;

                if (timeLeft < 0) {
                    clearInterval(intervalId);
                } 
            }, 1000);

        }
    }, [isSuccess, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (user && restaurantId && selectedDate && numGuests > 0) {
            const reservation: Reservation = {
                restaurantId: restaurantId as string,
                userId: user.uid,
                time: selectedDate?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) || '',
                date: selectedDate?.toISOString().split('T')[0] || '',
                numberOfPeople: numGuests,
            };

            await addReservation(reservation);
            setIsSuccess(true);
        } else {
            console.error("Please fill all the required fields.");
        }
    };

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        setShowGuestPicker(true)
        if (numGuests > 0) {
            setConfirmationVisible(true);
        }
    }

    const handleGuestsChange = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.currentTarget;
        setnumGuests(Number(target.value));
        if (selectedDate) {
            setConfirmationVisible(true);
        }
    };

    const backToHomepage = () => {
        router.push('/');
    };

    // Setting up time range for selection
    const minTime = new Date();
    minTime.setHours(11);
    minTime.setMinutes(0);

    const maxTime = new Date();
    maxTime.setHours(20);
    maxTime.setMinutes(0);

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <button onClick={backToHomepage}
                className="mb-4 flex items-center text-lg font-bold"
            >
                <BsBoxArrowInLeft className="mr-2 text-3xl" /> Back to Restaurants
            </button>

                <div className="flex items-center space-x-4">
                    <DatePicker 
                        selected={selectedDate}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        className="border p-2 rounded"
                        showTimeSelect
                        timeFormat="h:mm aa"
                        timeIntervals={60}
                        minTime={minTime}
                        maxTime={maxTime}
                        inline
                    />
                </div>
                {showGuestPicker && (
                    <div>
                        <label className="block text-lg mb-2">Number of Guests:</label>
                        <input 
                            type="number"
                            value={numGuests}
                            onChange={handleGuestsChange}
                            min="1"
                            max="10"
                            className="border p-2 rounded w-40"
                        />
                    </div>
                )}

                {confirmationVisible && (
                    <div className="mt-4">
                        <p className="mb-2">
                            Do you want to reserve for {selectedDate?.toLocaleDateString()} at 
                            {selectedDate?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                            for {numGuests} people?
                        </p>
                        <button type="submit">Make Reservation</button>
                    </div>
                )}
        </form>
    )
};

export default ReservationForm;