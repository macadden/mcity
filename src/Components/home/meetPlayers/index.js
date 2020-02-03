import React, { Component } from 'react';
import Stripes from '../../../Resources/images/stripes.png';
import { Tag } from '../../ui/misc';
import Reveal from 'react-reveal/Reveal';
import HomeCards from './cards';

class MeetPlayers extends Component {

    state = {
        show:false /**cuando arranque la app */
    }

    render() {
        return (
            <Reveal
                /**"fraction" va de 0 a 1; con 0.7 digo que cuando el cajón que tengo que animar esté al 70% en pantalla, empiece la animación */
                fraction={0.7}
                onReveal={()=>{
                    this.setState({
                        show:true
                    })
                }}
            
            >
                <div className="home_meetplayers"
                    style={{ background: `#ffffff url(${Stripes})` }}
                >
                    <div className="container">
                        <div className="home_meetplayers_wrapper">
                            <div className="home_card_wrapper">
                                
                                <HomeCards /**ojo con "show={this.state.show}" ¿¿¿POR QUÉ HAGO ESTO???*/
                                    show={this.state.show}
                                />
                            </div>
                            <div className="home_text_wrapper">
                                <div>
                                    <Tag bck="#0e1731" size="100px" color="#ffffff" add={{
                                        display: 'inline-block',
                                        marginBotton: '20px',
                                    }}>
                                        Meet
                                </Tag>
                                </div>
                                <div>
                                    <Tag
                                        bck="#0e1731" size="100px" color="#ffffff" add={{
                                            display: 'inline-block',
                                            marginBotton: '20px',
                                        }}>
                                        The
                                </Tag>
                                </div>
                                <div>
                                    <Tag
                                        bck="#0e1731" size="100px" color="#ffffff" add={{
                                            display: 'inline-block',
                                            marginBotton: '20px',
                                        }}>
                                        Players
                                </Tag>
                                </div>
                                <div>
                                    <Tag bck="#ffffff"
                                        size="27px"
                                        color="#0e1731"
                                        link={true}
                                        linkto="/the_team"
                                        add={{
                                            display: 'inline-block',
                                            marginBotton: '27px',
                                            border: '1px solid #0e1731'
                                        }}>
                                        Meet them here
                                </Tag>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>
        );
    }
}

export default MeetPlayers;