import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetCountAndAssertions } from '../actions';

class Ranking extends React.Component {
    resetScore = () => {
      const { history, resetCountAndAssertion } = this.props;
      resetCountAndAssertion();
      history.push('/');
    }

    render() {
      return (
        <div>
          <h1 data-testid="ranking-title">Ranking</h1>
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
};

const mapDispatchToProps = (dispatch) => ({
  resetCountAndAssertion: (param) => dispatch(resetCountAndAssertions(param)),
});

export default connect(null, mapDispatchToProps)(Ranking);
