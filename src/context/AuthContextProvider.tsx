/**
 * Authentication context for the entire application. Stores the users
 * email after singin in.
 */

import { createContext, useState } from "react";

interface AuthenticationStateType {
  email: string | null;
  isAuthenticated: boolean;
}

interface AuthenticationActionType {
  signIn(email: string, callBack: () => void): void;
  signOut(): void;
}

export type AuthenticationContext = AuthenticationStateType & AuthenticationActionType;

const defaultAuthState: AuthenticationStateType = Object.freeze({
  email: null,
  isAuthenticated: false,
});

export const AuthenticationContext = createContext<AuthenticationContext>(null!);

export function AuthContextProvider({ children }: { children: JSX.Element }) {
  const [authState, setAuthState] = useState(defaultAuthState);

  const signIn = (email: string, callBack: () => void) => {
    setAuthState({ email, isAuthenticated: true });
    callBack();
  };

  const signOut = () => setAuthState(defaultAuthState);

  return (
    <AuthenticationContext.Provider value={{ ...authState, signIn, signOut }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
