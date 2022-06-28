import { SUBMIT_LOGIN_FORM, EXPORT_TOKEN } from '../actions';

const initialState = {
  name: '',
  assertions: null,
  score: null,
  gravatarEmail: '',
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case SUBMIT_LOGIN_FORM:
    return {
      ...state,
      name: action.payload.name,
    };
  case EXPORT_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  default:
    return state;
  }
};

export default player;
