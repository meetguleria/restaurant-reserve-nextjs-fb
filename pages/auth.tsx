import { useState } from "react";
import firebase from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPhoneNumber, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';

const Auth: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User signed up: ', user);
        })
        .catch((error: firebase.FirebaseError) => {
            console.error('Error signing up: ', error);
        });
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            //signed in
            const user = userCredential.user;
            console.log('User logged in: ', user);
        })
        .catch((error: firebase.FirebaseError) => {
            console.error('Error logging in: ', error);
        });
    };

    //Google Sign-In
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log('User signed in with Google: ', user);
        })
        .catch((error) => {
            console.error('Error signing in with Google: ', error);
        });
    }

    return (
        <div>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignUp}>Sign Up</button>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        </div>
    );
};

export default Auth;