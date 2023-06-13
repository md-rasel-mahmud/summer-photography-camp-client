import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import firebaseApp from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const auth = getAuth(firebaseApp);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Register manually enter email password
  const registerWithEmailPass = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //login manually enter email password
  const loginWithEmailPass = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //login with google
  const googleProvider = new GoogleAuthProvider();

  const loginWithGooglePopup = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider);
  };

  // update profile
  const updateUserInfo = (name, imgLink) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: imgLink,
    });
  };

  //Auth observer
  useEffect(() => {
    const unsubscribe = () => {
      onAuthStateChanged(auth, (currentUser) => {
        
        if (currentUser) {
          axios
          .post(`${import.meta.env.VITE_api_link}/jwt`, {
            email: currentUser?.email,
          })
          .then((res) => {
            localStorage.setItem("token", res.data.token);
          });
        } else {
          localStorage.removeItem("token");
        }
        setUser(currentUser);
        
        setLoading(false);
        console.log(currentUser);
      });
    };
    return unsubscribe();
  }, []);

  //logout user
  const logout = () => {
    return signOut(auth);
  };

  const authInfo = {
    user,
    registerWithEmailPass,
    loginWithEmailPass,
    loginWithGooglePopup,
    updateUserInfo,
    logout,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
