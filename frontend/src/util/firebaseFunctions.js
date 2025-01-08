import firebase from "../firebase";

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth();

export const logout = () => {
  return signOut(auth);
};

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const getFirebaseIdToken = () => {
  return auth.currentUser.getIdToken(false);
};
