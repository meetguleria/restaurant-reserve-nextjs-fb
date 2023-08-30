import { useState, useEffect } from 'react';
import { useAuth } from '../src/authContext';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Link from 'next/link';
import AuthModal from '../src/components/authModal';
import { getRestaurants, Restaurant } from '../src/api';

const Restaurants: React.FC = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);
    const { user } = useAuth();
    const router = useRouter();

    const toggleModal = () => {
        setAuthModalOpen(!isAuthModalOpen)
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRestaurants();
            setRestaurants(data);
        };

        fetchData();
    }, []);

    return (
        <div className="p-4 bg-custom-grey">
            <h1 className="text-4xl mb-4 text-custom-green">Available Restaurants</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {restaurants.map((restaurant) => (
                <div key={restaurant.id} className='relative mb-8'>
                <div className='w-[400px] h-[300px] relative rounded-lg overflow-hidden'>
                    <Image 
                        src={restaurant.image} 
                        alt={restaurant.name}
                        layout='fill'
                        objectFit='cover'
                        objectPosition='center'
                        className='object-cover rounded-lg'
                        quality={20}
                    />
                    <button 
                        className="absolute bottom-0 left-0 rounded-lg p-2 bg-custom-green text-white"
                        onClick={() => {
                            if (user) {
                                router.push(`/makeReservation?restaurantId=${restaurant.id}`);
                            } else {
                                toggleModal();
                            }
                        }}
                    >
                        Make a Reservation
                    </button>
                </div>
                    <h2 className="text-2xl mb-2 text-custom-peach">{restaurant.name}</h2>
                    <p className="mb-2 text-custom-pink">{restaurant.location}</p>
            </div>
            ))}
            </div>
            {isAuthModalOpen && <AuthModal closeModal={toggleModal} />}
        </div>
    );
};

export default Restaurants;
