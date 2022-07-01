import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const gravatar = 'https://www.gravatar.com/avatar/';
const STORE_TEST = [
  {
    name: 'jogador1',
    picture: `${gravatar}jogador1`,
    score: 101
  },
  {
    name: 'jogador2',
    picture: `${gravatar}jogador2`,
    score: 210
  },
  {
    name: 'jogador3',
    picture: `${gravatar}jogador3`,
    score: 90
  }
];
describe('test of the screen Ranking', () => {
  it('testa se os elementos aparecem na tela', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');
    //````````````````````````````````````````````````````````````
    const title = screen.getByRole('heading', { name: /ranking/i });
    const playAgain = screen.getByTestId('btn-go-home');
    //````````````````````````````````````````````````````````````

    expect(title).toBeInTheDocument();
    expect(playAgain).toBeInTheDocument();
    //````````````````````````````````````````````````````````````

    userEvent.click(playAgain);
    expect(history.location.pathname).toBe('/');
    expect(title).not.toBeInTheDocument();
    expect(playAgain).not.toBeInTheDocument();
  });

  it('mais de um jogador é mostrado', () => {
    localStorage.setItem('ranking', JSON.stringify(STORE_TEST));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');

    const imgP2 = screen.getByRole('img', { name: /jogador2/i });
    const player2 = screen.getByTestId('player-name-0');
    const scoreP2 = screen.getByTestId('player-score-0');

    const imgP1 = screen.getByRole('img', { name: /jogador1/i });
    const player1 = screen.getByTestId('player-name-1');
    const scoreP1 = screen.getByTestId('player-score-1');

    const imgP3 = screen.getByRole('img', { name: /jogador3/i });
    const player3 = screen.getByTestId('player-name-2');
    const scoreP3 = screen.getByTestId('player-score-2');
    //````````````````````````````````````````````````````````````

    expect(imgP2).toBeInTheDocument();
    expect(player2).toBeInTheDocument();
    expect(scoreP2).toBeInTheDocument();

    expect(player2.innerHTML).toBe('jogador2');
    expect(scoreP2.innerHTML).toBe('210');
    expect(imgP2.src).toBe('https://www.gravatar.com/avatar/');
    //````````````````````````````````````````````````````````````

    expect(imgP1).toBeInTheDocument();
    expect(player1).toBeInTheDocument();
    expect(scoreP1).toBeInTheDocument();

    expect(player1.innerHTML).toBe('jogador1');
    expect(scoreP1.innerHTML).toBe('101');
    expect(imgP1.src).toBe('https://www.gravatar.com/avatar/');
    //````````````````````````````````````````````````````````````

    expect(imgP3).toBeInTheDocument();
    expect(player3).toBeInTheDocument();
    expect(scoreP3).toBeInTheDocument();

    expect(player3.innerHTML).toBe('jogador3');
    expect(scoreP3.innerHTML).toBe('90');
    expect(imgP3.src).toBe('https://www.gravatar.com/avatar/');
  });
});
