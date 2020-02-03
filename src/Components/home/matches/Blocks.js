import React, { Component } from 'react';
import { firebaseMatches } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';

import MatchesBlock from '../../ui/matches_block';
import Slide from 'react-reveal/Slide';

class Blocks extends Component {

    state = {
        matches:[]
    }

    /**- Función disparadora. Toma los ¿últimos? 6, pero no los trae en orden, así que:
     *1) "firebaseLooper" hace la lógica para traer el array (desordenado, pero con la key DENTRO del array) y guardarlos en "matches".
     *2) Como trae el Array desordenado, hago "reverseArray" para ordenarlo
      */
    componentDidMount(){
        firebaseMatches.limitToLast(6).once('value').then((snapshot)=>{
            const matches = firebaseLooper(snapshot);

            this.setState({
                /**le paso "matches" a reverseArray y ¿lo guardo en matches?*/
                matches: reverseArray(matches)
            });
        })
    }

    /**va a loopear la lista de partidos y crear los bloques */
    showMatches = (matches) => (
        /**si tengo partidos hago algo, sino devuelvo "null" */
        matches ?
            /**En cada iteración voy a estar pasando un partido
             * -match={match}: significa que "matches_block" va a ir recibiendo una prop con el partido ({match}) en cada iteración.
             * -En "matches" mapeo y traigo un JSX (por eso uso "()");
             * 
             */
            matches.map((match)=>(
                /**se desliza desde abajo (bottom).
                 * -Como estamos loopeando y devolviendo un elemento, necesito una "key".
                 * -¡¡¡En "<MatchesBlock>" voy a recibir las props vía "{match}" (¿por qué entre "{}"?) porque lo estoy pasando en cada iteración con el MAP!!!
                */
                <Slide bottom key={match.id}>
                <div className="item">
                    <div className="wrapper">
                        
                        <MatchesBlock match={match}/> 
                    </div>

                </div>
                </Slide>
            ))
        :null    
    )



    render() {
        console.log(this.state)
        return (
            <div className="home_matches">
                {this.showMatches(this.state.matches)}
            </div>
        );
    }
}

export default Blocks;