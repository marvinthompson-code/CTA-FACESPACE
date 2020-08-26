import firebase from "../firebase";

export const logout = () => {
  return firebase.auth().signOut();
};

export const login = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signUp = (email, password) => {
  console.log("This is email", email, password);
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const getFirebaseIdToken = () => {
  return firebase.auth().currentUser.getIdToken(false);
};
