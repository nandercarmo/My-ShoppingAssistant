// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCiUZf3q7OVns6FDXH1mtQrIAeHGjisnjg",
  authDomain: "my-shopping-assistant-b7228.firebaseapp.com",
  projectId: "my-shopping-assistant-b7228",
  storageBucket: "my-shopping-assistant-b7228.appspot.com",
  messagingSenderId: "659666583158",
  appId: "1:659666583158:web:b7ebf1bceff5f19afbe957",
  measurementId: "G-LHENJQYMHP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export function signup(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [ currentUser, setCurrentUser ] = useState<User>();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => user && setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}
