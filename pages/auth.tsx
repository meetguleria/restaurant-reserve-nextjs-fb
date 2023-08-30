import { useState } from "react";
import { handleSignUp, handleLogin, handleGoogleSignIn  } from '../src/components/authFunctions';

const Auth: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <div>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => handleSignUp(email, password)}>Sign Up</button>
            <button onClick={() => handleLogin(email, password)}>Login</button>
            <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        </div>
    );
};

export default Auth;