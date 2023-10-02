import '../styles/globals.css';
import { AuthProvider } from '../src/authContext';

import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
            <ToastContainer />
        </AuthProvider>
    );
}

export default MyApp;
