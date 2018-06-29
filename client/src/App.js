import React, { Component } from 'react';
import './assets/css/reset.css';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home';
import Faves from './components/faves';
import Login from './components/login';
import Register from './components/register';
import NotFound from './components/not-found';

/**
 * Top-Level Application
 */
class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/faves" component={Faves} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/" component={NotFound} />
                </Switch>
            </div>
        );
    }
}

export default App;
