import React, { Component } from 'react';

// Styling
import './assets/css/reset.css';
import './App.css';

// Routing
import { Switch, Route, withRouter } from 'react-router-dom';

// Store
import { connect } from 'react-redux';
import { verify } from './store';

// Components
import Home from './components/home';
import Faves from './components/faves';
import Login from './components/login';
import Register from './components/register';
import NotFound from './components/not-found';

/**
 * Top-Level Application
 */
class App extends Component {
    /**
     * When the component mounts, verify
     * user data.
     */
    componentDidMount() {
        this.props.verify();
    }

    /**
     * Render component.
     *
     * @return {Component}
     */
    render() {
        const { isLoaded } = this.props;

        return (
            <div className="App">
                {isLoaded && (
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/faves" component={Faves} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/" component={NotFound} />
                    </Switch>
                )}
            </div>
        );
    }
}

export default withRouter(
    connect(
        state => ({ isLoaded: !state.isLoading }),
        { verify }
    )(App)
);
