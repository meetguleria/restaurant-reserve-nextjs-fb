import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';

export const handleSignUp = async (email: string, password: string): Promise<boolean> => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        return true;
    } catch (error) {
        console.error('Error signing up: ', error);
        return false;
    }
}

export const handleLogin = async (email: string, password: string): Promise <boolean> => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        return true;
    } catch (error) {
        console.error("Error logging in: ", error);
        return false;
    }
}

export const handleGoogleSignIn = async (): Promise<boolean> => {
    try {
        signInWithPopup(auth, provider)
        return true;
    } catch (error) {
        console.error("Error signing in with Google: ", error);
        return false;
    }
}


