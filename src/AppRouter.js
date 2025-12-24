import React, { createContext, useContext } from 'react';
import {
    // BrowserRouter as Router,
    HashRouter as Router,
    Routes,
    Route,
    Navigate
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
                <Routes>
                    <Route exact path="/login" element={ <LoginScreen /> } />
                    <Route exact path="/register" element={ <RegisterScreen /> } />
                    <Route exact path="/game" element={ 
                        <PrivateRoute isAuthenticated={ UserInfo.isLogged }>
                            <GameScreen />
                        </PrivateRoute>
                    } />
                    <Route exact path="/score" element={ 
                        <PrivateRoute isAuthenticated={ UserInfo.isLogged }>
                            <ScoreScreen />
                        </PrivateRoute>
                    } />
                    <Route path="*" element={ <Navigate to="/login" replace /> } />
                </Routes>
            </div>
        </Router>
    )
}

export default AppRouter
