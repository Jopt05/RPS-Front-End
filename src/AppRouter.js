import React, { createContext } from 'react';
import {
    // BrowserRouter as Router,
    HashRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import GameScreen from './pages/GameScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import ScoreScreen from './pages/ScoreScreen';

export const AppRouter = () => {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/login" component={ LoginScreen } />
                    <Route exact path="/register" component={ RegisterScreen } />
                    <Route exact path="/game" component={ GameScreen } />
                    <Route exact path="/score" component={ ScoreScreen } />
                    <Redirect to="/login" />
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter
