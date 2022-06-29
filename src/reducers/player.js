import { SUBMIT_LOGIN_FORM, EXPORT_TOKEN } from '../actions';

const initialState = {
  name: '',
  assertions: null,
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
  default:
    return state;
  }
};

export default player;
