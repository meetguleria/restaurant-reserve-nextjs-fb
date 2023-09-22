import { useState } from 'react';
import { useRouter } from 'next/router';
import { handleSignUp, handleLogin, handleGoogleSignIn } from './authFunctions';

interface AuthModalProps {
    closeModal: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ closeModal }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const redirectToReservation = () => {
        router.push('/makeReservations');
    };

    const handleSignUpClick = async () => {
        const success = await handleSignUp(email, password);
        if (success) {
            redirectToReservation();
            closeModal();
        }
    };

    const handleLoginClick = async () => {
        const success = await handleLogin(email, password);
        if (success) {
            redirectToReservation();
            closeModal();
        }
    };

    const handleGoogleSignInClick = async () => {
        const success = await handleGoogleSignIn();
        if (success) {
            redirectToReservation();
            closeModal();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg">
                <button onClick={closeModal} className="float-right">
                    X
                </button>
                <h2 className="text-xl mb-4">Sign In or Sign Up</h2>
                <input 
                    type="email" 
                    placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="block w-full mb-2"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="block w-full mb-4"
                />
                <button onClick={() => handleSignUpClick}>Sign Up</button>
                <button onClick={() => handleLoginClick}>Login</button>
                <button onClick={handleGoogleSignInClick}>Sign in with Google</button>
            </div>
        </div>
    );
};

export default AuthModal;
