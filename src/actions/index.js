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
  await fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((data) => {
      dispatch(exportToken(data));
      localStorage.setItem('token', data.token);
    });
};

// export const fetchQuestions = (token) => async (dispatch) => {
//   const response = await fetch(
//     `https://opentdb.com/api.php?amount=5&token=${token}`,
//   );
//   const data = await response.json();
//   const final = await data;
// }
