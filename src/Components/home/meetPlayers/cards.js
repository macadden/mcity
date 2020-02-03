import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
import Otamendi from '../../../Resources/images/players/Otamendi.png';
import PlayerCard from "../../ui/playerCard";

class HomeCards extends Component {

    state = {
        cards: [ /**tengo 4 cartas, así que array de 4 */
            {
                bottom: 90,
                left: 300
            },
            {
                bottom: 60,
                left: 200
            },
            {
                bottom: 30,
                left: 100
            },
            {  /**esta es la 1ra */
                bottom: 0,
                left: 0
            },
        ]
    }

    showAnimateCards = () => (
        this.state.cards.map((card,i)=>(
            <Animate
                key={i}
                /**¿DE DÓNDE SALE LO QUE USO DE "PROPS"? */
                show={this.props.show}
            
                start={{
                    left:0,
                    bottom:0
                }}

                enter={{
                    left:[card.left],
                    bottom:[card.bottom],
                    timing:{duration: 500, ease: easePolyOut}
                }}
            >
                {({ left, bottom })=>{
                    return(
                        <div
                            style={{
                                position: 'absolute',
                                left,
                                bottom
                            }}
                        >
                            <PlayerCard
                                number="30"
                                name="Nicolás"
                                lastname="Otamendi"
                                bck={Otamendi}
                            />
                        </div>
                    )
                }}
            </Animate>
        ))
    )

    render() {
        return (
            <div>
                {this.showAnimateCards()}
            </div>
        );
    }
}

export default HomeCards;