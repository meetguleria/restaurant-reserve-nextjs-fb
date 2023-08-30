import { useState } from "react";
import { useRouter } from 'next/router';
import { addReservation, Reservation } from '../src/api';
import { useAuth } from '../src/authContext';

const ReservationForm: React.FC = () => {
    const router = useRouter();
    const { restaurantId } = router.query;
    const { user } = useAuth();

    const [dateTime, setDateTime] = useState("");
    const [numPeople, setNumPeople] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (user && restaurantId) {
            const reservation: Reservation = {
                restaurantId: restaurantId as string,
                userId: user.uid,
                time: dateTime.split(' ')[1],
                date: dateTime.split(' ')[0],
                numberOfPeople: numPeople,
            };
    
            await addReservation(reservation);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Date and Time:
            <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
            </label>
            <label>
                Number of People:
            <input type="number" value={numPeople} onChange={(e) => setNumPeople(Number(e.target.value))} />
            </label>
            <button type="submit">Make Reservation</button>
        </form>
    )
};

export default ReservationForm;