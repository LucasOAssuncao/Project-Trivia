import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';

class Game extends React.Component {
  state = {
    questions: [{ incorrect_answers: [], category: '', question: [] }],
    index: 0,
    respondido: false,
  };

  async componentDidMount() {
    const { history } = this.props;
    const token1 = localStorage.getItem('token');
    console.log(token1);
    const response = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${token1}`,
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
    const { index, questions, respondido } = this.state;

    const answers = questions[index].incorrect_answers.map((e, i) => (
      <button
        key={ i }
        data-testid={ `wrong-answer-${i}` }
        type="button"
        className={ respondido && 'incorrectAnswer' }
        onClick={ () => this.setState({ respondido: true }) }
      >
        {e}
      </button>
    ));
    answers.push(
      <button
        type="button"
        data-testid="correct-answer"
        key="4"
        className={ respondido && 'correctAnswer' }
        onClick={ () => this.setState({ respondido: true }) }
      >
        {questions[index].correct_answer}
      </button>,
    );
    const randomize = answers.sort(() => Math.random() - +'0.5');
    return randomize;
  };

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
          <div data-testid="answer-options">{array}</div>
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
  // token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  // token: state.player.tokenObj,
});

// const mapDispatchToProps = (dispatch) => ({
// });

export default connect(mapStateToProps, null)(Game);
