// export default AuthForm;

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth, db, firebase } from '../../firebase/firebaseConfig';
import styles from './AuthForm.module.css';

const AuthForm = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state to handle redirection
  const router = useRouter();

  // Effect to handle redirection if user is authenticated
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // If user is authenticated and trying to access login page, redirect to home
        if (mode === 'login') {
          router.push('/');
        }
      } else {
        // If user is not authenticated and trying to access signup page, redirect to login
        if (mode === 'signup') {
          router.push('/login');
        }
      }
      setLoading(false); // Stop loading once the redirection logic is handled
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [mode, router]);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'signup') {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        await db.collection('users').add({
          userId: user.uid,
          email: user.email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        console.log('User signed up:', user);
        router.push('/'); // Redirect to home page after successful signup
      } else {
        await auth.signInWithEmailAndPassword(email, password);
        console.log('User logged in');
        router.push('/'); // Redirect to home page after successful login
      }
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    }
  };

  // Show loading indicator or nothing while checking authentication state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {/* <h1 className={styles.title}>{mode === 'signup' ? 'Signup' : 'Login'}</h1> */}
      <form onSubmit={handleAuth} className="emailBox">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          {mode === 'signup' ? 'Signup' : 'Login'}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default AuthForm;

