import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';
import { exportCount } from '../actions';

class Game extends React.Component {
  state = {
    questions: [{ incorrect_answers: [], category: '', question: [] }],
    index: 0,
    respondido: false,
    timer: 30,
    interval: '',
    answersBtns: [],
  };

  async componentDidMount() {
    const { history } = this.props;
    const token1 = localStorage.getItem('token');
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
      // eslint-disable-next-line react/destructuring-assignment
      console.log(this.state.questions);
    }

    const interval = setInterval(this.timer, +'1000');
    this.setState({ interval });
    this.randomizeAnswers();
  }

  timer = () => {
    const { timer, interval } = this.state;
    if (timer === 0) {
      clearInterval(interval);
      this.buttonDisabler();
      this.setState({ respondido: true });
    } else {
      this.setState((previousState) => ({
        timer: previousState.timer - 1,
      }));
    }
  };

  buttonDisabler = () => {
    const buttons = document.getElementsByClassName('answers');
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].disabled = true;
    }
  };

  btnNext = () => {
    const { index } = this.state;
    const { history } = this.props;
    this.setState({
      index: index + 1,
      respondido: false,
      timer: 30,
    }, () => this.randomizeAnswers());
    const buttons = document.getElementsByClassName('answers');
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].disabled = false;
    }
    this.timer();
    if (index + 1 > +'4') {
      history.push('/feedback');
    }
  }

  // req 11 e 12
  randomizeAnswers = () => {
    const { index, questions } = this.state;

    const answers = questions[index].incorrect_answers.map((e, i) => ({
      element: e,
      index: i,
    }));
    answers.push({ element: questions[index].correct_answer, index: 4 });
    const randomize = answers.sort(() => Math.random() - +'0.5');
    this.setState({ answersBtns: randomize });
    // console.log(questions[index]);
    console.log(answers);
    console.log(questions[index].incorrect_answers);
  };

  correctAnswer = (i) => {
    const { respondido, answersBtns } = this.state;
    if (respondido && answersBtns[i].index === +'4') {
      return 'correctAnswer';
    }
    if (!respondido) {
      return '';
    }
    if (respondido && answersBtns[i].index !== +'4') {
      return 'incorrectAnswer';
    }
  };

  incrementScore = ({ target: { textContent } }) => {
    this.setState({ respondido: true });
    const { timer, questions, index } = this.state;
    const { exportCounts } = this.props;
    const difficulty = { hard: 3, medium: 2, easy: 1 };
    console.log(questions[index]);
    console.log('click', textContent);
    console.log('correct', questions[index].correct_answer);
    if (textContent === questions[index].correct_answer) {
      console.log('olá');
      exportCounts(+'10' + (timer * difficulty[questions[index].difficulty]));
    }
    // console.log(difficulty[questions[index].difficulty], timer);
    this.buttonDisabler();
  };

  render() {
    const { questions, index, timer, answersBtns, respondido } = this.state;
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
        <div>
          <p>{timer}</p>
        </div>
        <div>
          <h1 data-testid="question-category">{questions[index].category}</h1>
          <p data-testid="question-text">{questions[index].question}</p>
          <div data-testid="answer-options">
            {answersBtns.map((e, i) => (
              <button
                key={ e.index }
                data-testid={
                  e.index === +'4'
                    ? 'correct-answer'
                    : `wrong-answer-${e.index}`
                }
                type="button"
                className={ `answers ${this.correctAnswer(i)}` }
                onClick={ this.incrementScore }
              >
                {e.element}
              </button>
            ))}
            {console.log(answersBtns)}
            {respondido && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.btnNext }
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  email: PropTypes.string.isRequired,
  exportCounts: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  exportCounts: (param) => dispatch(exportCount(param)),
  //
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
