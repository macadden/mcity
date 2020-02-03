/**Esto está acá en "ui" porque tranquilamente puedo reutilizar el código para usar el "block" en otro lado */

import React from 'react';

/**Le paso el match de base de datos ({match}); ¡¡¡recibe solo la info!!! no es que es un objeto con la info; la info viene pelada*/
const MatchesBlock = ({match}) => {

    console.log(match)
/**-"match_top" son los partidos de local; "match_bottom" de visitante"
 * -Hay dos props en la base de datos de "match": "final" (bool) y "date". Primero pregunta si terminó; si no es así ("?"), sale con "match.date",
 * sino (":") dice que el partido todavía no se jugó.
 * -
*/
    return (
        <div className="match_block">
            <div className="match_date">
                {match.final ? match.date : `Match not played yet: ${match.date}`}
            </div>
            <div className="match_wrapper">
                <div className="match_top">
                    <div className="left">
                        <div className="icon" style={{background: `url(/images/team_icons/${match.localThmb}.png)`}}></div>
                        <div className="team_name">{match.local}</div>
                    </div>
                    <div className="right">
                        {match.final ? match.resultLocal: '-'}
                    </div>

                   
                </div>
                <div className="match_bottom">
                    <div className="left">
                        <div className="icon" style={{background: `url(/images/team_icons/${match.awayThmb}.png)`}}></div>
                        <div className="team_name">{match.away}</div>
                    </div>
                    <div className="right">
                        {match.final ? match.resultAway: '-'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchesBlock;