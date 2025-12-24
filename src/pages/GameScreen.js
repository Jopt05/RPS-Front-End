import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import '../styles/Game.css'
import Background from '../assets/bg-triangle.svg'
import rock from '../assets/icon-rock.svg'
import paper from '../assets/icon-paper.svg'
import scissors from '../assets/icon-scissors.svg'
import { UserContext } from '../App'
import useGame from '../hooks/useGame.hook'
import useFetch from '../hooks/useFetch.hook'

const indexMap = {
    0: 'Rock',
    1: 'Paper',
    2: 'Scissors'
}

const GameScreen = () => {

    const { UserInfo, setUserInfo } = useContext( UserContext );
    const { gameState, handlePlayAgain, handleStart } = useGame();

    const { handlePut } = useFetch(process.env.REACT_APP_API_URL);

    const updateUserScore = async () => {
        const userResponse = await handlePut(
            {
                score: UserInfo.user.score + 1
            }, 
            `/api/usuarios/${ UserInfo.user.uid }`, 
            {
                'x-token' : UserInfo?.tokenId
            }
        );

        if( !userResponse ) {
            return;
        }

        setUserInfo(x => ({
            ...x,
            user: {
                ...x.user,
                score: x.user.score + 1
            }
        }))
    }

    useEffect(() => {
        if (gameState.winnerText != 'YOU WIN') return;

        updateUserScore();
    }, [gameState.winnerText])

    return (
        <>
            <NavBar />
            <div className={`RPSContainer ${ !gameState.isPlaying ? 'Full' : '' }`}>
                <img className={`RPSContainer__Bg ${ gameState.isPlaying ? 'Hide' : '' }`} src={ Background } />
                <div className={`ItemContainer Rock ${ gameState.isPlaying ? 'Hide' : '' }`} onClick={ handleStart }>
                    <div className="ItemBorder">
                        <div className="ItemInnerShadow">
                            <div className="ItemInnerContainer">
                                <img name="Rock" className="Item-Svg" src={rock} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`ItemContainer Paper ${ gameState.isPlaying ? 'Hide' : '' }`} onClick={ handleStart }>
                    <div className="ItemBorder">
                        <div className="ItemInnerShadow">
                            <div className="ItemInnerContainer">
                                <img name="Paper" className="Item-Svg" src={paper} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`ItemContainer Scissors ${ gameState.isPlaying ? 'Hide' : '' }`} onClick={ handleStart }>
                    <div className="ItemBorder">
                        <div className="ItemInnerShadow">
                            <div className="ItemInnerContainer">
                                <img name="Scissors" className="Item-Svg" src={scissors} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`GameContainer ${ (gameState.isPlaying && gameState.winnerText) ? '' : 'Hide' }`}>
                    <div className="Option">
                        <p className="OptionTitle">
                            YOU PICKED
                        </p>
                        <div className={ `ItemContainerG ${ indexMap[gameState.userElectionIndex] }` }>
                            <div className="ItemBorder">
                                <div className="ItemInnerShadow">
                                    <div className="ItemInnerContainer">
                                        <img  className="Item-Svg" src={ gameState.userElectionImg } />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`Option ${ (gameState.isPlaying && gameState.winnerText) ? '' : 'NoShow' }`}>
                        <div className="Versus">
                            <p className="OptionTitle">
                                {
                                    gameState.winnerText
                                }
                            </p>
                            {
                                <button className="ButtonAgain" onClick={ handlePlayAgain }>
                                    PLAY AGAIN
                                </button>
                            }
                        </div>
                    </div>
                    <div className="Option">
                        <p className="OptionTitle">
                            THE HOUSE PICKED
                        </p>
                        <div className={ `ItemContainerG ${ indexMap[gameState.aiElectionIndex] }` }>
                            <div className="ItemBorder">
                                <div className="ItemInnerShadow">
                                    <div className="ItemInnerContainer">
                                        <img className="Item-Svg" src={ gameState.aiElectionImg } />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GameScreen
