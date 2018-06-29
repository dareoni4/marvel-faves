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
import Menu from './components/shared/Menu';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import Profile from './components/profile';
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
                <Menu />
                {isLoaded && (
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/profile" component={Profile} />
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
