import React from 'react';
import { Tag } from '../../ui/misc'; /**tengo que meter las "{}" porque no estoy haciendo "export default" de "Tag" en "misc.js" */
import Blocks from './Blocks';


const MatchesHome = () => {
    return (
        /**dentro del "div home_matches_wrapper meto un container porque está centrada en el medio, entonces ahi hay una clase llamada
         * "container" */
        <div className="home_matches_wrapper">
             <div className="container">
                <Tag
                    bck="#0e1731"
                    size="50px"
                    color="#ffffff"
                //**add={{color:'red'}} ---- esta línea sirve si quiero agregar propiedades adicionales que pisen las del hijo (?) en misc.js; si paso color:'red', en misc.js "color: props.color" va a ser rojo por la línea "...props.add" en ese archivo. Los "..." hacen que cualquier cosa que pase de padre a hijo, se cumpla (?)*/            
                > 
                    Matches
                </Tag>

                <Blocks/>

                <Tag
                    bck="#ffffff"
                    size="22px"
                    color="#0e1731"
                    link={true}
                    linkto="/the_team"
                >
                    See more matches
                </Tag>

            </div>
        </div>
    );
};

export default MatchesHome;