/**Uso una libreria (react-move GITHUB) para animaciones */
import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';

class Stripes extends Component {

    state = {
    /*Array; en cada "{}" hay una prop distinta*/
        stripes:[
            {
                background:'#98c5e9',
                left: 120,
                rotate: 25,
                top: -260,
                delay: 0
            },
            {
                background:'#ffffff',
                left: 360,
                rotate: 25,
                top: -397,
                delay: 200
            },
            {
                background:'#98c5e9',
                left: 600,
                rotate: 25,
                top: -498,
                delay: 400
            }
        ]
    }
    
    /**acá pienso en loopear las diferentes stripes que tenga; con el map me quedo con los elementos que especifique adentro */
    showStripes = () => (
        /**después del "=>" uso "()" porque quiero devolver un elemento (Animate)*/
        this.state.stripes.map((stripe,i)=>(
            <Animate 
                key={i} /**si voy a loopear algo, tengo que usar una key */
                show={true} /**necesita saber cuándo tiene que aparecer. Si cuando se monta/renderiza el objeto o no */
                /**PASOS: se crean las propiedades de "start"; se agregan las nuevas de "enter" y se las paso a la función.*/
                start={{
                    background:"#ffffff",/** el background siempre va a empezar blanco*/
                    opacity:0,
                    left:0,
                    rotate:0,
                    top:0
                }}

                enter={{
                    background: `${stripe.background}`, /**no puedo usar "stripe.background", que podría ser lógico, sin los "[]" */
                    opacity:[1],
                    left:[stripe.left],
                    rotate:[stripe.rotate],
                    top:[stripe.top],
                    timing: {delay:stripe.delay, duration: 200, ease: easePolyOut },
                    /**siempre que "enter" funcione, tengo distintos eventos sucediendo, y se puede checkear en la documentación.
                     * Por ejemplo, quiero saber cuándo termine la animación para poder ejecutar otra función. Por eso hago lo de 
                     * "events". Lo impreso por console.log se puede ver en la consola de Google Chrome.
                     */
                    events:{
                        end(){
                            console.log('animation finished')
                        }
                    }
                }}

            >
             
                {({ opacity,left,rotate,top,background})=>{
                    /**acá arriba hago uso de ESX paso las props a animar, porque estoy animando todas ellas. Cuando las paso, también puedo
                    pasar las propiedades que están en "<div>"*/
                    return(
                        <div
                            className="stripe"
                            style={{
                                background,
                                opacity,
                                transform: `rotate(${rotate}deg) translate(${left}px,${top}px)` /**la 2da posición de translate se refiere al top*/
                            }}
                        ></div>
                    )
                }}
            </Animate>
        ))
    )

    render() {
        return (
            <div className="featured_stripes">
                {this.showStripes()}
            </div>
        );
    }
}

export default Stripes;