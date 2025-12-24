import rock from '../assets/icon-rock.svg'
import paper from '../assets/icon-paper.svg'
import scissors from '../assets/icon-scissors.svg'
import { getNumberSelection } from '../helpers/getItem'
import { useState } from 'react'

const itemsSVG = [
    rock,
    paper,
    scissors
];

const useGame = () => {

    const [gameState, setGameState] = useState({
        isPlaying: false,
        winnerText: '',
        userElectionImg: null,
        aiElectionImg: null,
        userElectionIndex: null,
        aiElectionIndex: null,
    })

    const getWinnerText = ( player, pc ) => {
        let winnerText = '';

        if( player === pc ){
            winnerText = 'SAME'
        } else if ( (player === 0 && pc === 2) || (player === 2 && pc === 1) || (player === 1 && pc === 0) ) {
            winnerText = 'YOU WIN'
        } else {
            winnerText = 'YOU LOSE' 
        }

        return winnerText;
    }

    const handleStart = (e) => {
        setGameState(s => ({
            ...s,
            isPlaying: true,
        }))

        let userElection = e.target,
            aiElection;

        while( userElection.tagName != 'IMG' ){
            userElection = userElection.children[0]
        };

        userElection = userElection.getAttribute('name');
        aiElection = Math.floor(Math.random() * (3 - 0)) + 0;

        userElection = getNumberSelection( userElection );

        const winnerText = getWinnerText( userElection, aiElection );

        setGameState(s => ({
            ...s,
            winnerText,
            userElectionImg: itemsSVG[ userElection ],
            aiElectionImg: itemsSVG[aiElection],
            userElectionIndex: userElection,
            aiElectionIndex: aiElection
        }));
    }

    const handlePlayAgain = () => {
        setGameState(s => ({
            ...s,
            isPlaying: false,
            winnerText: '',
            userElectionImg: null,
            aiElectionImg: null,
            userElectionIndex: null,
            aiElectionIndex: null,
        }))
    }

    return {
        gameState,
        handleStart,
        handlePlayAgain,
    }
    
}

export default useGame