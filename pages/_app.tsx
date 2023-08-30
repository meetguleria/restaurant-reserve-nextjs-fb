import '../styles/globals.css';
import { AuthProvider } from '../src/authContext'; // Make sure to adjust the path as needed

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
