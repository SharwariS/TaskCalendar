// context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log('User ID:', user.uid);
        setUserId(user.uid);
        localStorage.setItem('userId', user.uid); // Store userId in localStorage
        console.log('Stored User ID:', localStorage.getItem('userId'));

      } else {
        console.log('User not logged in');
        setUserId(null);
        localStorage.removeItem('userId'); // Remove userId from localStorage
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={userId}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserId = () => useContext(UserContext);
