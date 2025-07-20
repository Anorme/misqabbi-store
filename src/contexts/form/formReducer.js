import { FORM_ACTION_TYPES } from './formActionTypes';

export const initialFormState = {
  values: {},
  errors: {},
  isSubmitting: false,
  isDirty: false,
};

export const formReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case FORM_ACTION_TYPES.UPDATE_FIELD: {
      const { name, value } = payload;
      return {
        ...state,
        values: {
          ...state.values,
          [name]: value,
        },
        isDirty: true,
      };
    }

    case FORM_ACTION_TYPES.SET_ERRORS:
      return {
        ...state,
        errors: payload,
      };

    case FORM_ACTION_TYPES.CLEAR_ERRORS:
      return {
        ...state,
        errors: {},
      };

    case FORM_ACTION_TYPES.START_SUBMIT:
      return {
        ...state,
        isSubmitting: true,
      };

    case FORM_ACTION_TYPES.STOP_SUBMIT:
      return {
        ...state,
        isSubmitting: false,
      };

    case FORM_ACTION_TYPES.RESET_FORM:
      return {
        ...initialFormState,
      };

    case FORM_ACTION_TYPES.MARK_DIRTY:
      return {
        ...state,
        isDirty: true,
      };

    default:
      console.warn(`Unhandled form action type: ${type}`);
      return state;
  }
};
