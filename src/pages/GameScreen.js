import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import '../styles/Game.css'
import Background from '../assets/bg-triangle.svg'
import rock from '../assets/icon-rock.svg'
import paper from '../assets/icon-paper.svg'
import scissors from '../assets/icon-scissors.svg'

const GameScreen = () => {

    const [IsPlaying, setIsPlaying] = useState(false);

    const startGame = ( e ) => {
        
        let election = e.target;

        while( election.tagName != 'IMG' ){
            election = election.children[0]
        };

        election = election.getAttribute('name');

    }

    return (
        <>
            <NavBar />
            <div className="RPSContainer">
                <img className="RPSContainer__Bg" src={ Background } />
                <div className="ItemContainer" onClick={ startGame }>
                    <div className="ItemBorder">
                        <div className="ItemInnerShadow">
                            <div className="ItemInnerContainer">
                                <img name="rock" className="Item-Svg" src={rock} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ItemContainer" onClick={ startGame }>
                    <div className="ItemBorder">
                        <div className="ItemInnerShadow">
                            <div className="ItemInnerContainer">
                                <img name="paper" className="Item-Svg" src={paper} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ItemContainer" onClick={ startGame }>
                    <div className="ItemBorder">
                        <div className="ItemInnerShadow">
                            <div className="ItemInnerContainer">
                                <img name="scissors" className="Item-Svg" src={scissors} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GameScreen
