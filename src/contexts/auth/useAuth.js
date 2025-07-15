import { useContext } from 'react';
import { AuthStateContext, AuthDispatchContext } from './authContext';

export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }
  return context;
};

export const useAuthDispatch = () => {
  const dispatch = useContext(AuthDispatchContext);
  if (!dispatch) {
    throw new Error('useAuthDispatch must be used within an AuthProvider');
  }
  return dispatch;
};
