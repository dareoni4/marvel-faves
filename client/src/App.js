import React, { Component } from 'react';
import Home from './components/home';
import './App.css';

/**
 * Top-Level Application
 */
class App extends Component {
    render() {
        return (
            <div className="App">
                <Home />
            </div>
        );
    }
}

export default App;
