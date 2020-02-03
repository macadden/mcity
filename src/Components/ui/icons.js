import React from 'react';
import { Link } from 'react-router-dom';

import mcitylogo from '../../Resources/images/logos/manchester_city_logo.png';

export const CityLogo = (props) => {

    const template = <div
        className="img_cover"
        style={{
            width: props.width,
            height: props.height,
            background:`url(${mcitylogo}) no-repeat`
        }}
    ></div>
    
    /**Quizás quiera evitar el hecho de que el logo sea un link; quizás no quiero devolver un link sino un logo que NO sea clickeable.
     * Con este "if" me aseguro de poder usar un logo en las dos condiciones.
     * -"linkTo" es lo que voy a estar pasando como parámetro del PADRE (a donde quiero que vaya)
     */
    if(props.link){
        return (
            <Link to={props.linkTo} className="link_logo">
                {template}
            </Link>
        )
    } else {
        return template
    }
}