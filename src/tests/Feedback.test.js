import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
describe('test of the screen Feedback', () => {
  it('tem uma imagem, com nome do jogador', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    const imgGravatar = screen.getByRole('img', { name: /imagem de avatar/i });
    const score = screen.getByRole('heading', { name: /0/i });
    expect(imgGravatar).toBeInTheDocument();
    expect(score).toBeInTheDocument();
  });
});
