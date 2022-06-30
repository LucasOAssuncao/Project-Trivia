export const SUBMIT_LOGIN_FORM = 'SUBMIT_LOGIN_FORM';
export const EXPORT_TOKEN = 'EXPORT_TOKEN';
export const EXPORT_COUNT = 'EXPORT_COUNT';

export const submitLoginForm = (param) => ({
  type: SUBMIT_LOGIN_FORM,
  payload: param,
});

const exportToken = (param) => ({
  type: EXPORT_TOKEN,
  payload: param,
});

export const getToken = () => async (dispatch) => {
  await fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((data) => {
      dispatch(exportToken(data));
      localStorage.setItem('token', data.token);
    });
};

export const exportCount = (param) => ({
  type: EXPORT_COUNT,
  payload: param,
});
