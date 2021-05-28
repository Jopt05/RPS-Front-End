import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../App'
import '../styles/NavBar.css'

const NavBar = () => {

    const { UserInfo, setUserInfo } = useContext( UserContext )

    return (
        <>
            <div className="Game">
                <header className="Game__Header">
                    <div className="Game__Header-Container">
                        <div className="Game__Header-Container-TitleC">
                            <p className="Game__Header-Container-TitleC-Title">
                                Rock<br/>
                                Papper<br/>
                                Scissors
                            </p>
                        </div>
                        <nav className="GameNav">
                            <NavLink activeClassName="GameNav__Link-A" className="GameNav__Link" to="/game">Play</NavLink>
                            <NavLink activeClassName="GameNav__Link-A" className="GameNav__Link" to="/score">Scoreboard</NavLink>
                        </nav>
                        <div className="Game__Header-Container-ScoreC">
                            <div className="Game__Header-Container-ScoreCC">
                                <span className="Game__Header-Container-ScoreCC-Score">
                                    SCORE
                                </span>
                                <span className="Game__Header-Container-ScoreCC-ScoreP">
                                    {
                                        UserInfo?.user?.score
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </>
    )
}

export default NavBar
