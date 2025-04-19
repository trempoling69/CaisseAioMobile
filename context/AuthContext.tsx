import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import axios from 'axios';
import { User } from '@/type/user';
import { API_URL, get } from '@/api/config';
import * as SecureStore from 'expo-secure-store';

type AuthContext = {
  verifyLogin: () => Promise<void>;
  isLoggedIn: boolean | null;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  register: (credentials: {
    lastname: string;
    firstname: string;
    email: string;
    password: string;
  }) => Promise<void>;
  isError: boolean;
  errorMessage: string;
  logOut: () => void;
  currentUser: User | undefined;
  setIsLoggedIn: (value: boolean) => void;
  clearError: () => void;
};
export const AuthContext = createContext<AuthContext | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useState<User>();

  const verifyLogin = useCallback(async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        throw new Error('no token found');
      }
      await getCurrentUser();
    } catch (err) {
      console.error(err);
      setIsLoggedIn(false);
    }
  }, []);

  const clearError = () => {
    console.log('clear error');
    if (isError || errorMessage !== '') {
      setIsError(false);
      setErrorMessage('');
    }
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      clearError();
      const respLogin = await axios.post(
        `${API_URL}/api/authentification/login`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      const token = respLogin.data.data.access_token;
      await SecureStore.setItemAsync('token', token);
      await verifyLogin();
      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      console.log(err);
      setIsError(true);
      setErrorMessage(err.response.data?.message || 'Erreur inconnue');
    }
  };

  const register = async (credentails: {
    lastname: string;
    firstname: string;
    email: string;
    password: string;
  }) => {
    try {
      clearError();
      const respLogin = await axios.post(
        `${API_URL}/api/authentification/register`,
        credentails,
        { withCredentials: true },
      );
      const token = respLogin.data.data.access_token;
      await SecureStore.setItemAsync('token', token);
      await verifyLogin();
      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      console.log(err);
      console.log(err.response.data?.message);
      setIsError(true);
      setErrorMessage(err.response.data?.message || 'Erreur inconnue');
    }
  };

  const logOut = async () => {
    await axios.post(
      `${API_URL}/api/authentification/refresh/clear`,
      {},
      { withCredentials: true },
    );
    SecureStore.deleteItemAsync('token');
    setIsLoggedIn(false);
  };

  const getCurrentUser = async () => {
    const requestUser = await get<User>('/api/users/me');
    setCurrentUser(requestUser.data);
    setIsLoggedIn(true);
  };
  return (
    <AuthContext.Provider
      value={{
        verifyLogin,
        isLoggedIn,
        login,
        isError,
        errorMessage,
        logOut,
        currentUser,
        setIsLoggedIn,
        register,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
};
export default AuthProvider;
