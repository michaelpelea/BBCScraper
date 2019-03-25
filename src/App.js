import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";

import Home from './layouts/main.jsx';
import './App.css';

const hist = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={hist}>
        <div className="App">
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>      
    );
  }
}

export default App;
