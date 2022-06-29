import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { getToken, submitLoginForm } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    nome: '',
    lockButton: true,
  };

  handleClick = async () => {
    const { getTokens, history, submitEmailAndNames } = this.props;
    const { email, nome } = this.state;
    await getTokens();
    const gravatarEmail = md5(email).toString();
    submitEmailAndNames({ gravatarEmail, nome });
    history.push('/jogo');
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    const { email, nome } = this.state;
    const regexValidation = /\S+@\w+\.\w+/;
    const finalValidation = regexValidation.test(email);
    this.setState({ lockButton: true });
    if (finalValidation && email && nome) {
      this.setState({ lockButton: false });
    } else {
      this.setState({ lockButton: true });
    }
  };

  render() {
    const { history } = this.props;
    const { email, nome, lockButton } = this.state;
    return (
      <div>
        <input
          data-testid="input-player-name"
          name="nome"
          type="text"
          placeholder="Nome"
          value={ nome }
          onChange={ this.handleChange }
        />
        <input
          data-testid="input-gravatar-email"
          name="email"
          type="email"
          placeholder="Email"
          value={ email }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ lockButton }
          onClick={ this.handleClick }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Settings
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTokens: () => dispatch(getToken()),
  submitEmailAndNames: (param) => dispatch(submitLoginForm(param)),
});

Login.propTypes = {
  getTokens: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  submitEmailAndNames: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
