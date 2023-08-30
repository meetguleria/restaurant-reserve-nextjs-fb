import { useState } from 'react';
import { handleSignUp, handleLogin, handleGoogleSignIn } from './authFunctions';

interface AuthModalProps {
    closeModal: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ closeModal }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg">
                <button onClick={closeModal} className="float-right"> {/* Use closeModal */}
                    X
                </button>
                <h2 className="text-xl mb-4">Sign In or Sign Up</h2>

                {/* Sign-in and sign-up form */}
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
                <button onClick={() => handleSignUp(email, password)} className="block w-full mb-2">
                    Sign Up
                </button>
                <button onClick={() => handleLogin(email, password)} className="block w-full mb-2">
                    Login
                </button>
                <button onClick={handleGoogleSignIn} className="block w-full">
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default AuthModal;
