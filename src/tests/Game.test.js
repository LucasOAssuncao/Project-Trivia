import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const setTimeout = 40000;
describe('test of the screen Ranking', () => {
  it('test if the btn next is in the document and can be clicked', async () => {
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

  it('test if you can click on the wrong answer button', async () => {
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

    const incorrectAnswer = await waitFor(() =>
      screen.getByTestId('wrong-answer-0')
    );
    expect(incorrectAnswer).toBeInTheDocument();
    userEvent.click(incorrectAnswer);
    expect(incorrectAnswer).toBeInTheDocument();
    expect(correctAnswer).toBeInTheDocument();
  });

  jest.setTimeout(setTimeout);
  it('test if after 30 seconds the button true is disabled', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByRole('button', { name: /play/i });
    
    userEvent.type(inputName, 'Tryber');
    userEvent.type(inputEmail, 'tryber@trybe.com');
    userEvent.click(btnPlay);

    await screen.findByTestId('question-category');
    const buttonTrue = await screen.findByTestId('correct-answer');
    userEvent.click(buttonTrue);

    await screen.findByText('0', {}, {timeout:31000});
    await waitFor(() => expect(buttonTrue).toBeDisabled(), {timeout:31000});


    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next')); 

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next')); 

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));     

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next')); 

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next')); 

    await waitFor(() => expect(history.location.pathname).toBe('/feedback'));
  });

  it('test if the token is wrong you get redirect to "/"', async () => {

    const tokenMock = {
      response_code: 3,
      results: [],
      };

    global.fetch = jest.fn(() => Promise.resolve(({
      json: () => Promise.resolve(tokenMock)
      })))
      
    const { history } = renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(inputName, 'Tryber');
    userEvent.type(inputEmail, 'tryber@trybe.com');
    
    userEvent.click(btnPlay);
  
    
    await waitFor(() => expect(history.location.pathname).toBe('/'));

  });
});
