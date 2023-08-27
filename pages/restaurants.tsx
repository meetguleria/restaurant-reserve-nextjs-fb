import Link from 'next/link';

// Sample restaurant data
const restaurantData = [
  {
    id: '1',
    name: 'Restaurant One',
    location: 'Location One',
    image: 'image_url_1',
  },
  {
    id: '2',
    name: 'Restaurant Two',
    location: 'Location Two',
    image: 'image_url_2',
  },
  // ...more restaurants
];

const Restaurants: React.FC = () => {
  return (
    <div className="p-4 bg-custom-grey">
      <h1 className="text-4xl mb-4 text-custom-green">Available Restaurants</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurantData.map((restaurant) => (
          <div key={restaurant.id} className="border p-4 rounded bg-white">
            <h2 className="text-2xl mb-2 text-custom-peach">{restaurant.name}</h2>
            <p className="mb-2 text-custom-pink">{restaurant.location}</p>
            <Link href={`/restaurant/${restaurant.id}`} className='text-custom-green'>
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
