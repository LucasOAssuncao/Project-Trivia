export const SUBMIT_LOGIN_FORM = 'SUBMIT_LOGIN_FORM';

export const submitLoginForm = (param) => ({
  type: SUBMIT_LOGIN_FORM,
  payload: param,
});
