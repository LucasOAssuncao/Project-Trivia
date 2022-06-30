import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetCountAndAssertions } from '../actions';

class Ranking extends React.Component {
  state = {
    ranking: [],
  };

  async componentDidMount() {
    const { name, email, score } = this.props;
    const objInfo = {
      name,
      score,
      picture: `https://www.gravatar.com/avatar/${email}`,
    };
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    if (ranking === null) {
      localStorage.setItem('ranking', JSON.stringify([objInfo]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([...ranking, objInfo]));
    }
    const objUpdated = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ ranking: objUpdated });
  }

  resetScore = () => {
    const { history, resetCountAndAssertion } = this.props;
    resetCountAndAssertion();
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {ranking
          && ranking.sort(
            (a, b) => parseFloat(b.score) - parseFloat(a.score),
          ).map(({ name, score, picture }, index) => (
            <div key={ index }>
              <img src={ picture } alt={ name } />
              <p data-testid={ `player-name-${index}` }>{name}</p>
              <p data-testid={ `player-score-${index}` }>{score}</p>
            </div>
          ))}
        <div>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.resetScore }
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  resetCountAndAssertion: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  resetCountAndAssertion: (param) => dispatch(resetCountAndAssertions(param)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
