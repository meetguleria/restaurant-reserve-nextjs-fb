import firebase from 'firebase/app';
import 'firebase/auth';  // for authentication
import 'firebase/firestore';  // for cloud firestore
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
