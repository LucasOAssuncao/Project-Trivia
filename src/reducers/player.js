import { SUBMIT_LOGIN_FORM, EXPORT_TOKEN, EXPORT_COUNT, RESET } from '../actions';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case SUBMIT_LOGIN_FORM:
    return {
      ...state,
      name: action.payload.nome,
      gravatarEmail: action.payload.gravatarEmail,
    };
  case EXPORT_TOKEN:
    return {
      ...state,
      tokenObj: action.payload,
    };
  case EXPORT_COUNT:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  case RESET:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
};

export default player;
