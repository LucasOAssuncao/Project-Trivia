import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Game extends React.Component {
  //   componentDidMount() {}
  render() {
    const { email, name, score } = this.props;
    return (
      <div>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${email}` }
            alt="imagem de avatar"
            data-testid="header-profile-picture"
          />
          <h3 data-testid="header-player-name">{name}</h3>
          <h4 data-testid="header-score">{score}</h4>
        </header>
      </div>
    );
  }
}

Game.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(Game);
