import { useState, useEffect } from 'react';
import { auth } from '../firebaseClient';
import { onAuthStateChanged } from 'firebase/auth';

export function useAuthState() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return user;
}
