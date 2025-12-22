import React, { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import axios from "axios";

// Public Axios (no token)
const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

// Secure Axios with token auto-add
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create user
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const googleLogin = async () => {
    setLoading(true);
    try {
      return await signInWithPopup(auth, googleProvider);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      localStorage.removeItem("access-token");
      setUser(null);
      setRole(null);
      return await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateUserProfile = async (name, photoURL) => {
    if (!auth.currentUser) return;
    return updateProfile(auth.currentUser, { displayName: name, photoURL });
  };

  // Auth state listener + role fetch
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          // Get JWT
          const tokenRes = await axiosPublic.post("/jwt", { email: currentUser.email });
          if (tokenRes.data?.token) {
            localStorage.setItem("access-token", tokenRes.data.token);
          }

          // Get role (using secure instance with token)
          const roleRes = await axiosSecure.get(`/users/role/${currentUser.email}`);
          const fetchedRole = roleRes.data?.role || "employee"; // Fallback
          setRole(fetchedRole);
          console.log("Role loaded:", fetchedRole);
        } catch (err) {
          console.error("Role fetch error:", err);
          setRole("employee");
        }
      } else {
        localStorage.removeItem("access-token");
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    role,
    loading,
    createUser,
    login,
    googleLogin,
    logout,
    updateUserProfile,
    axiosSecure,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};