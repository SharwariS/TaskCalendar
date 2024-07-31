// pages/_app.js
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserProvider } from '../context/UserContext';
import '../global/styles.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      // Redirect to login page if user is not authenticated and trying to access protected routes
      if (!localStorage.getItem('userId') && url !== '/login') {
        router.push('/login');
      }
    };

    // Listen to route changes
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
