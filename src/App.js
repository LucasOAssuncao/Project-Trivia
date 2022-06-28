import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
// import logo from './trivia.png';
import './App.css';

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
      {/* </header> */}
    </div>
  );
}
