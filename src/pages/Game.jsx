import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Game extends React.Component {
  state = {
    questions: [{ incorrect_answers: [], category: '', question: [] }],
    index: 0,
  }

  async componentDidMount() {
    const { token, history } = this.props;
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${+'5'}&token=${token}`,
    );
    const data = await response.json();
    const final = await data;
    if (final.response_code === +'3') {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({ questions: final.results });
    }
  }

  randomizeAnswers = () => {
    const { index, questions } = this.state;

    const answers = questions[index].incorrect_answers.map((e, i) => (
      <button
        key={ i }
        data-testid={ `wrong-answer-${i}` }
        type="button"
      >
        {e}
      </button>
    ));
    answers.push(
      <button
        type="button"
        data-testid="correct-answer"
        key="4"
      >
        {questions[index].correct_answer}
      </button>,
    );
    const randomize = answers.sort(() => (Math.random() - +'0.5'));
    return randomize;
  }

  render() {
    const { questions, index } = this.state;
    const { email, name, score } = this.props;
    const array = this.randomizeAnswers();
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
        <div>
          <h1 data-testid="question-category">{questions[index].category}</h1>
          <p data-testid="question-text">{questions[index].question}</p>
          <div>
            {array}
          </div>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  token: PropTypes.string,
};

Game.defaultProps = {
  token: '',
};

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  token: state.player.token,
});

// const mapDispatchToProps = (dispatch) => ({
// });

export default connect(mapStateToProps, null)(Game);
