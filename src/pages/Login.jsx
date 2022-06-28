import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Login extends React.Component {
  state = {
    email: '',
    nome: '',
    lockButton: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    const { email, nome } = this.state;
    const regexValidation = /\S+@\w+\.\w+/;
    const finalValidation = regexValidation.test(email);
    this.setState({ lockButton: true });
    if (finalValidation && email && nome) {
      this.setState({ lockButton: false });
      console.log(nome.length);
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
          //   onClick={ this.handleSubmit }
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

const mapDispatchToProps = () => ({});

export default connect(null, mapDispatchToProps)(Login);
Login.propTypes = {
  history: PropTypes.string.isRequired,
};
