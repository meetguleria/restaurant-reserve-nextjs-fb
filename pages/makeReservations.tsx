import { useState } from "react";
import { useRouter } from 'next/router';
import { addReservation, Reservation } from '../src/api';
import { useAuth } from '../src/authContext';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReservationForm: React.FC = () => {
    const router = useRouter();
    const { restaurantId } = router.query;
    const { user } = useAuth();

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [numPeople, setNumPeople] = useState(0);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showGuestPicker, setShowGuestPicker] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (user && restaurantId && selectedDate && selectedTime && numPeople > 0) {
            const reservation: Reservation = {
                restaurantId: restaurantId as string,
                userId: user.uid,
                time: selectedTime,
                date: selectedDate?.toISOString().split('T')[0] || '',
                numberOfPeople: numPeople,
            };
    
            await addReservation(reservation);
        } else {
            console.error("Please fill all the required fields.");
        }
    };

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        setShowTimePicker(true);
    }

    const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTime(e.target.value);
        setShowGuestPicker(true);
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div className="flex items-center space-x-4">
                    <DatePicker 
                    inline
                    selected={selectedDate}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    className="border p-2 rounded"
                    />
                
                {showTimePicker && (
                    <select
                        value={selectedTime}
                        onChange={handleTimeChange}
                        className="border p-2 rounded w-40"
                    >
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="13:00">1:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                        <option value="17:00">5:00 PM</option>
                        <option value="18:00">6:00 PM</option>
                        <option value="19:00">7:00 PM</option>
                    </select>
                )}
                </div>
                {showGuestPicker && (
                    <div>
                        <label className="block text-lg mb-2">Number of People:</label>
                        <input 
                            type="number"
                            value={numPeople}
                            onChange={(e) => setNumPeople(Number(e.target.value))}
                            min="1"
                            max="10"
                            className="border p-2 rounded w-40"
                        />
                    </div>
                )}
            <button type="submit">Make Reservation</button>
        </form>
    )
};

export default ReservationForm;