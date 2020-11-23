import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
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
  user: User;
  signInWithCustomToken(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      /*
      const [token, user] = await AsyncStorage.multiGet([
        '@BomDelivery:token',
        '@BomDelivery:user',
      ]);

      setLoading(false);
      */
    }
    loadStorageData();
  }, []);

  const signInWithCustomToken = useCallback(async ({ token }) => {
    /*
    const response = await api.post('sessions', {
      email,
      password,
    });
    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
    */
  }, []);

  /*
  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);
    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));
      setData({
        token: data.token,
        user,
      });
    },
    [data.token],
  );
  */
  return (
    <AuthContext.Provider
      value={{ user: data.user, signInWithCustomToken, loading }}
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
