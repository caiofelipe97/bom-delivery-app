import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
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
  facebookUser: FirebaseAuthTypes.User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signInWithCustomToken(credentials: SignInCredentials): Promise<void>;
  signInFacebookUser(): Promise<void>;
  fbLogin(): Promise<void>;
  signOut(): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [
    facebookUser,
    setFacebookUser,
  ] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function onAuthStateChanged(
      firebaseUser: FirebaseAuthTypes.User | null,
    ): Promise<void> {
      if (firebaseUser) {
        console.log(firebaseUser);
        const facebookLogin = firebaseUser.providerData.find(
          userProviderData => userProviderData.providerId === 'facebook.com',
        );
        const firestoreResponse = await firestore()
          .collection<User>('users')
          .doc(firebaseUser.uid)
          .get();
        if (!firestoreResponse.exists && facebookLogin) {
          if (facebookLogin) {
            setFacebookUser(firebaseUser);
            setLoading(false);
          }
        } else if (firestoreResponse.exists) {
          const firestoreUser = firestoreResponse.data();
          if (firestoreUser) {
            setUser(firestoreUser);
          }
          setLoading(false);
        } else {
          setFacebookUser(null);
          setUser(null);
          setLoading(false);
        }
      } else {
        setFacebookUser(null);
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

  const signInFacebookUser = useCallback(async () => {
    if (facebookUser) {
      const firestoreResponse = await firestore()
        .collection<User>('users')
        .doc(facebookUser.uid)
        .get();
      const firestoreUser = firestoreResponse.data();
      setUser(firestoreUser || null);
    }
  }, [facebookUser]);

  const fbLogin = useCallback(async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw new Error('User cancelled the login process');
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw new Error('Something went wrong obtaining access token');
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      await auth().signInWithCredential(facebookCredential);
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        Alert.alert(
          'E-mail já cadastrado',
          'Já existe uma conta esse e-mail, por favor faça o login por e-mail.',
        );
      }
      console.log(error);
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
      value={{
        user,
        facebookUser,
        setUser,
        signInFacebookUser,
        signInWithCustomToken,
        fbLogin,
        signOut,
        loading,
      }}
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
