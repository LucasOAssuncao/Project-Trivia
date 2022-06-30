import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
// import logo from './trivia.png';
import './App.css';
import Setting from './pages/Setting';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Setting } />
        <Route path="/jogo" component={ Game } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
      {/* </header> */}
    </div>
  );
}
