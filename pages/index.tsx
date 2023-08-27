import Link from 'next/link';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Welcome to Restaurant Reservation System</h1>
            <Link href="/test">
                Go to test
            </Link>
            <Link href="/auth">
                Go to Auth
            </Link>
        </div>
    );
};

export default Home;
