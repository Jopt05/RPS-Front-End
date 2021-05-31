import React, { createContext, useContext } from 'react';
import {
    // BrowserRouter as Router,
    HashRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { UserContext } from './App';
import GameScreen from './pages/GameScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import ScoreScreen from './pages/ScoreScreen';
import { PrivateRoute } from './routers/PrivateRoute';

export const AppRouter = () => {

    const { UserInfo, setUserInfo } = useContext( UserContext );

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/login" component={ LoginScreen } />
                    <Route exact path="/register" component={ RegisterScreen } />
                    <PrivateRoute isAuthenticated={ UserInfo.isLogged } exact path="/game" component={ GameScreen } />
                    <PrivateRoute isAuthenticated={ UserInfo.isLogged } exact path="/score" component={ ScoreScreen } />
                    <Redirect to="/login" />
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter
