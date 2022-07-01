import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
describe('test of the screen Ranking', () => {
  it('', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(inputName, 'Tryber');
    userEvent.type(inputEmail, 'tryber@trybe.com');
    userEvent.click(btnPlay);
    await waitFor(() => expect(history.location.pathname).toBe('/jogo'));

    const correctAnswer = await waitFor(() =>
      screen.getByTestId('correct-answer')
    );
    expect(correctAnswer).toBeInTheDocument();
    userEvent.click(correctAnswer);
    userEvent.click(screen.getByTestId('btn-next'));
    userEvent.click(correctAnswer);
  });
  //   it('', () => {
  //   });
  //   it('', () => {
  //   });
});
