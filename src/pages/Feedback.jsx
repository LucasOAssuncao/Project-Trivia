import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { resetCountAndAssertions } from '../actions';

class Feedback extends React.Component {
  resetScore = () => {
    const { history, resetCountAndAssertion } = this.props;
    resetCountAndAssertion();
    history.push('/');
  }

  render() {
    const { email, name, score, rightAnswers, history } = this.props;

    return (
      <div>
        <header>
          <p data-testid="feedback-text">Feedback</p>
          <img
            src={ `https://www.gravatar.com/avatar/${email}` }
            alt="imagem de avatar"
            data-testid="header-profile-picture"
          />
          <h3 data-testid="header-player-name">{name}</h3>
          <h4 data-testid="header-score">{score}</h4>
        </header>
        <main>
          <h1 data-testid="feedback-text">
            {rightAnswers < +'3' ? 'Could be better...' : 'Well Done!'}
          </h1>
          <h2 data-testid="feedback-total-score">{score}</h2>
          <h2 data-testid="feedback-total-question">{rightAnswers}</h2>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.resetScore }
          >
            Play Again
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
          >
            Ranking
          </button>
        </main>
      </div>
    );
  }
}

Feedback.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  rightAnswers: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  resetCountAndAssertion: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  rightAnswers: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  resetCountAndAssertion: (param) => dispatch(resetCountAndAssertions(param)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
