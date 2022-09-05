import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import '../styles/Game.css'
import Background from '../assets/bg-triangle.svg'
import rock from '../assets/icon-rock.svg'
import paper from '../assets/icon-paper.svg'
import scissors from '../assets/icon-scissors.svg'
import { UserContext } from '../App'
import { getItem } from '../helpers/getItem'
import {
    // BrowserRouter as Router,
    HashRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

const GameScreen = ({ history }) => {

    const { UserInfo, setUserInfo } = useContext( UserContext );

    const { user } = UserInfo;

    const { score } = user;

    const [IsPlaying, setIsPlaying] = useState(false);
    const [PlayAgain, setPlayAgain] = useState(false);
    const [Election, setElection] = useState({
        userElection: null,
        aiElection: null,
    });
    const [Win, setWin] = useState('');
    const [Item, setItem] = useState({
        userItem: null,
        aiItem: null
    })

    const itemsSVG = [
        rock,
        paper,
        scissors
    ];

    const winner = (player, pc) => {
        let isWinner = '';

        if( player === pc ){
            isWinner = 'SAME'
        } else if ( (player === 0 && pc === 2) || (player === 2 && pc === 1) || (player === 1 && pc === 0) ) {
            isWinner = 'YOU WIN'
        } else {
            isWinner = 'YOU LOSE' 
        }

        setWin(isWinner)

        setTimeout(() => {
            setPlayAgain( true );
        }, 500);
    }    

    const startGame = ( e ) => {
        setIsPlaying( true );

        let election = e.target,
            aiElection;

        while( election.tagName != 'IMG' ){
            election = election.children[0]
        };

        election = election.getAttribute('name');
        
        aiElection = Math.floor(Math.random() * (3 - 0)) + 0;

        aiElection = getItem( aiElection );

        setElection({
            ...Election,
            aiElection: aiElection,
            userElection: election,
        });

        election = getItem( election );

        aiElection = getItem( aiElection );

        setItem({
            ...Item,
            userItem: itemsSVG[election],
            aiItem: itemsSVG[aiElection]
        });

        winner(election, aiElection);
    }

    const handlePlayAgain = () => {
        setIsPlaying( false );
        setPlayAgain( false );
    }

    useEffect(() => {
        if (Win != 'YOU WIN') return;

        fetch(`https://rpsbackend-production.up.railway.app/api/usuarios/${ user.uid }`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-token' : UserInfo?.tokenId
            },
            body: JSON.stringify({
                score: UserInfo.user.score + 1
            }),
        })
        .then( data => data.json() )
        .catch( data => console.log("Error en la peticion"))
        
        setTimeout(() => {
            setUserInfo({
                ...UserInfo,
                user: {
                    ...user,
                    score: score + 1
                }
            })
        }, 1500);
    }, [Win])

    return (
        <>
            <NavBar />
            <div className={`RPSContainer ${ IsPlaying ? 'Full' : '' }`}>
                <img className={`RPSContainer__Bg ${ IsPlaying ? 'Hide' : '' }`} src={ Background } />
                <div className={`ItemContainer Rock ${ IsPlaying ? 'Hide' : '' }`} onClick={ startGame }>
                    <div className="ItemBorder">
                        <div className="ItemInnerShadow">
                            <div className="ItemInnerContainer">
                                <img name="Rock" className="Item-Svg" src={rock} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`ItemContainer Paper ${ IsPlaying ? 'Hide' : '' }`} onClick={ startGame }>
                    <div className="ItemBorder">
                        <div className="ItemInnerShadow">
                            <div className="ItemInnerContainer">
                                <img name="Paper" className="Item-Svg" src={paper} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`ItemContainer Scissors ${ IsPlaying ? 'Hide' : '' }`} onClick={ startGame }>
                    <div className="ItemBorder">
                        <div className="ItemInnerShadow">
                            <div className="ItemInnerContainer">
                                <img name="Scissors" className="Item-Svg" src={scissors} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`GameContainer ${ IsPlaying ? '' : 'Hide' }`}>
                    <div className="Option">
                        <p className="OptionTitle">
                            YOU PICKED
                        </p>
                        <div className={ `ItemContainerG ${ Election.userElection }` }>
                            <div className="ItemBorder">
                                <div className="ItemInnerShadow">
                                    <div className="ItemInnerContainer">
                                        <img  className="Item-Svg" src={ Item.userItem } />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`Option ${ PlayAgain ? '' : 'NoShow' }`}>
                        <div className="Versus">
                            <p className="OptionTitle">
                                {
                                    Win
                                }
                            </p>
                            {
                                Win != 'YOU WIN' && (
                                    <button className="ButtonAgain" onClick={ handlePlayAgain }>
                                        PLAY AGAIN
                                    </button>
                                )
                            }
                        </div>
                    </div>
                    <div className="Option">
                        <p className="OptionTitle">
                            THE HOUSE PICKED
                        </p>
                        <div className={ `ItemContainerG ${ Election.aiElection }` }>
                            <div className="ItemBorder">
                                <div className="ItemInnerShadow">
                                    <div className="ItemInnerContainer">
                                        <img className="Item-Svg" src={ Item.aiItem } />
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
