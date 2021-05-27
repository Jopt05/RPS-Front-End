import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/NavBar.css'

const NavBar = () => {
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
                                    0
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
