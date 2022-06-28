import { SUBMIT_LOGIN_FORM } from '../actions';

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
  default:
    return state;
  }
};

export default player;
