export const SUBMIT_LOGIN_FORM = 'SUBMIT_LOGIN_FORM';
export const EXPORT_TOKEN = 'EXPORT_TOKEN';

export const submitLoginForm = (param) => ({
  type: SUBMIT_LOGIN_FORM,
  payload: param,
});

const exportToken = (param) => ({
  type: EXPORT_TOKEN,
  payload: param,
});

export const getToken = () => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  const { token } = data;
  localStorage.setItem('token', token);
  dispatch(exportToken(token));
};
