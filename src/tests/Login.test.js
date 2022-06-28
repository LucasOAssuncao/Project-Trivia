import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import Login from '../pages/Login';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
describe('test of the screen login',()=>{
it('testing if there are inputs for name and email',()=>{
    renderWithRouterAndRedux(<App/>)
    const inputName = screen.getByTestId('input-player-name')
    const inputEmail = screen.getByTestId('input-gravatar-email')
    
    expect(inputName).toBeInTheDocument()
    expect(inputEmail).toBeInTheDocument()
})
it('the button should only be unlocked when the entries are filled in correctly',()=>{
   const {history} = renderWithRouterAndRedux(<App/>)
    const inputName = screen.getByTestId('input-player-name')
    const inputEmail = screen.getByTestId('input-gravatar-email')
    const btnPlay = screen.getByRole('button', {name: /play/i})
    
    expect(inputName).toBeInTheDocument()
    expect(inputEmail).toBeInTheDocument()
    userEvent.type(inputName, 'Tryber')
    userEvent.type(inputEmail, 'tryber@trybe.com')
    userEvent.click(btnPlay)
    expect(history.location.pathname).toBe('/jogo');
})
it('if the button redirects to /settings ',()=>{
    const {history} = renderWithRouterAndRedux(<App/>)
    const btnSetting = screen.getByRole('button', {name: /settings/i})
     userEvent.click(btnSetting)
     expect(history.location.pathname).toBe('/settings');
 })
})