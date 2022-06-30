import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import Login from '../pages/Login';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { getToken } from '../actions';

describe('test of the screen login',()=>{
it('testing if there are inputs for name and email',()=>{
    renderWithRouterAndRedux(<App/>)
    const inputName = screen.getByTestId('input-player-name')
    const inputEmail = screen.getByTestId('input-gravatar-email')
    
    expect(inputName).toBeInTheDocument()
    expect(inputEmail).toBeInTheDocument()
})
it('the button should only be unlocked when the entries are filled in correctly', async () => {
   const {history} = renderWithRouterAndRedux(<App/>)
    const inputName = screen.getByTestId('input-player-name')
    const inputEmail = screen.getByTestId('input-gravatar-email')
    const btnPlay = screen.getByRole('button', {name: /play/i})
    
    expect(inputName).toBeInTheDocument()
    expect(inputEmail).toBeInTheDocument()
    userEvent.type(inputName, 'Tryber')
    userEvent.type(inputEmail, 'tryber@trybe.com')
    userEvent.click(btnPlay)
    await waitFor(() => expect(history.location.pathname).toBe('/jogo'));
})
it('if the button redirects to /settings ',()=>{
    const {history} = renderWithRouterAndRedux(<App/>)
    const btnSetting = screen.getByRole('button', {name: /settings/i})
     userEvent.click(btnSetting)
     expect(history.location.pathname).toBe('/settings');
     const text = screen.getByRole('heading', {
        name: /configurações/i
      });
    expect(text).toBeInTheDocument();
 })

 it('fetch have been called', async ()=>{
    renderWithRouterAndRedux(<App/>)
    const inputName = screen.getByTestId('input-player-name')
    const inputEmail = screen.getByTestId('input-gravatar-email')
    const btnPlay = screen.getByRole('button', {name: /play/i})
    
    expect(inputName).toBeInTheDocument()
    expect(inputEmail).toBeInTheDocument()
    expect(btnPlay).toBeInTheDocument()
    userEvent.type(inputName, '')
    expect(inputName).toHaveAttribute('value', ''); 
    userEvent.type(inputEmail, '')
    expect(inputEmail).toHaveAttribute('value', '');
    expect(btnPlay).toBeDisabled();
 })
})