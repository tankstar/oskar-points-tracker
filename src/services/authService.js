import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase/config';

export const listenToAuth = (callback) => onAuthStateChanged(auth, callback);

export const signIn = async (email, password) => signInWithEmailAndPassword(auth, email, password);

export const register = async (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const logout = async () => signOut(auth);
