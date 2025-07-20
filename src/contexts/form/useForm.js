import { useContext } from 'react';
import { FormStateContext, FormDispatchContext } from './formContext';

export const useFormState = () => {
  const context = useContext(FormStateContext);
  if (!context) {
    throw new Error('useFormState must be used within a FormProvider');
  }
  return context;
};

export const useFormDispatch = () => {
  const dispatch = useContext(FormDispatchContext);
  if (!dispatch) {
    throw new Error('useFormDispatch must be used within a FormProvider');
  }
  return dispatch;
};
