import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';

export type Restaurant = {
    id: string,
    name: string,
    location: string,
    cuisine: string,
    image: string,
};

export type Reservation = {
    userId: string;
    restaurantId: string;
    time: string;
    date: string;
    numberOfPeople: number;
};

export const getRestaurants = async (): Promise<Restaurant[]> => {
    const restaurantsCol = collection(db, 'restaurants');
    const restaurantSnapshot = await getDocs(restaurantsCol);
    const restaurantList = restaurantSnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Restaurant, 'id'>)
    }));
    return restaurantList;
}

export const addReservation = async (reservation: Reservation) => {
    
    const reservationDoc = doc(db, 'reservations');

    await setDoc(reservationDoc, reservation);
};