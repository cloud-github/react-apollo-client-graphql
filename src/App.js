import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Header from './components/header';
import Home from './containers/home';
import Countries from './containers/countries';
import NotFound from './components/not_found';
import './App.css';

const App = () => {
  return (
      <div className="App">
        <header className="App-header">
          <Router>
            <div>
              <Header/>
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/countries' component={Countries}/>
                <Route exact path='/countries/:code' component={Countries}/>
                <Route component={NotFound}/>
              </Switch>
            </div>
          </Router>
        </header>
      </div>
  );
};

export default App;

