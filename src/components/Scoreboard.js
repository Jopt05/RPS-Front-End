import { useEffect, useState } from "react"
import ScoreRow from './Scoreboard';

const Scoreboard = () => {

    const [Data, setData] = useState(null)

    useEffect(() => {

        const fetchScores = async() => {
            const data = await fetch(`${process.env.REACT_APP_API_URL}/api/usuarios`, {
                method: 'GET'
            })
            .then( data => data.json() )
            .then( data => data.usuarios );

            data.sort( function(a, b){return b.score - a.score} )

            while( data.length > 5 ) {
                data.pop()
            }

            setData({
                ...Data,
                users: data
            })
        }

        fetchScores();
        
    }, [])

    return (
        <div className="Container">
            <div className="Container__Div">
                <div className="Container__Row">
                <p className="Username">
                    NICKNAME
                </p>
                <p className="Score">
                    SCORE
                </p>
                </div>
                {
                    Data?.users.map( ( item ) => (
                        <div className="Container__Row">
                            <p className="Username">
                                { item.user }
                            </p>
                            <p className="Score">
                                { item.score }
                            </p>
                        </div>
                    ) )
                }
            </div>
        </div>
    )
}

export default Scoreboard
