import { useReducer } from 'react';
import { initialFormState, formReducer } from './formReducer';
import { FormStateContext, FormDispatchContext } from './formContext';

export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  return (
    <FormStateContext.Provider value={state}>
      <FormDispatchContext.Provider value={dispatch}>{children}</FormDispatchContext.Provider>
    </FormStateContext.Provider>
  );
};
