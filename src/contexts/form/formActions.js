import { createAction } from '../../utils/createAction';
import { FORM_ACTION_TYPES } from './formActionTypes';

export const updateField = (name, value) =>
  createAction(FORM_ACTION_TYPES.UPDATE_FIELD, { name, value });

export const setErrors = errors => createAction(FORM_ACTION_TYPES.SET_ERRORS, errors);

export const clearErrors = () => createAction(FORM_ACTION_TYPES.CLEAR_ERRORS, null);

export const startSubmit = () => createAction(FORM_ACTION_TYPES.START_SUBMIT, null);

export const stopSubmit = () => createAction(FORM_ACTION_TYPES.RESET_FORM, null);

export const resetForm = () => createAction(FORM_ACTION_TYPES.RESET_FORM, null);

export const markDirty = () => createAction(FORM_ACTION_TYPES.MARK_DIRTY, null);
