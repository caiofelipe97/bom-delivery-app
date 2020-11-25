import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { useRoute } from '@react-navigation/native';
import api from '../services/api';
import { User } from '../types';

interface AuthState {
  token: string;
  user: User;
}
interface SignInCredentials {
  token: string;
}

interface AuthContextData {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signInWithCustomToken(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function onAuthStateChanged(
      firebaseUser: FirebaseAuthTypes.User | null,
    ): Promise<void> {
      if (firebaseUser) {
        const firestoreResponse = await firestore()
          .collection<User>('users')
          .doc(firebaseUser.uid)
          .get();
        const firestoreUser = firestoreResponse.data();
        if (firestoreUser) {
          setUser(firestoreUser);
        }
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    }
    auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  const signInWithCustomToken = useCallback(async ({ token }) => {
    try {
      await auth().signInWithCustomToken(token);
    } catch (err) {
      console.log(`Erro ao autenticar o usuário ${err}`);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await auth().signOut();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, signInWithCustomToken, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
