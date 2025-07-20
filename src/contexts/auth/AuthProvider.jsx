import { useReducer } from 'react';
import { authReducer, initialAuthState } from './authReducer';
import { AuthStateContext, AuthDispatchContext } from './authContext';

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
