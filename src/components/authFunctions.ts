import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';

import firebase from 'firebase/app';

export const handleSignUp = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log('User signed up: ', user);
    })
    .catch((error: firebase.FirebaseError) => {
        console.error('Error signing up: ', error);
    });
}

export const handleLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        //signed in
        const user = userCredential.user;
        console.log('User logged in: ', user);
    })
    .catch((error: firebase.FirebaseError) => {
        console.error('Error logging in: ', error);
    });
}

export const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log('User signed in with Google: ', user);
        })
        .catch((error) => {
            console.error('Error signing in with Google: ', error);
        });
}


