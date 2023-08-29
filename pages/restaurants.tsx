import { useState, useEffect } from 'react';
import Image from 'next/image';

import Link from 'next/link';
import { getRestaurants, Restaurant } from '../src/api';

const Restaurants: React.FC = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

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
                    <Link href={`/makeReservation?restaurantId=${restaurant.id}`} passHref>
                        <button className="absolute bottom-0 left-0 rounded-lg p-2 bg-custom-green text-white">
                            Make a Reservation
                        </button>
                    </Link>
                </div>
                    <h2 className="text-2xl mb-2 text-custom-peach">{restaurant.name}</h2>
                    <p className="mb-2 text-custom-pink">{restaurant.location}</p>
            </div>
            ))}
            </div>
        </div>
    );
};

export default Restaurants;
