import { useState } from "react";
import { addReservation, Reservation } from '../src/api';

const ReservationForm: React.FC = () => {
    const [restaurantId, setRestaurantId] = useState("");
    const [userId, setUserId] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [numPeople, setNumPeople] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const reservation: Reservation = {
            restaurantId,
            userId,
            time: dateTime.split(' ')[1],
            date: dateTime.split(' ')[0],
            numberOfPeople: numPeople,
        };

        await addReservation(reservation);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Restaurant ID:
                <input type="text" value={restaurantId} onChange={(e) => setRestaurantId(e.target.value)} />
            </label>
            <label>
                User ID:
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
            </label>
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