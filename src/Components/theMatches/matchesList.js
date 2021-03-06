import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import NodeGroup from 'react-move/NodeGroup';

class MatchesList extends Component {

    state = {
        matcheslist:[]
    }

    static getDerivedStateFromProps(props,state){
        return state = {
            matcheslist: props.matches
        }
    }

    showMatches = () => (
        this.state.matcheslist ?
            <NodeGroup
                data={this.state.matcheslist}
                keyAccessor={(d)=> d.id} //d: es un estado; representa a una lista, a "data".
         
                start={()=>({
                    opacity:0,
                    x:-200
                })}

                enter={(d,i)=>({
                    opacity:[1],
                    x:[0],
                    timing:{duration: 500, delay: i*50, ease: easePolyOut}
                })}

                update={(d,i)=>({
                    opacity:[1],
                    x:[0],
                    timing:{duration: 500, delay: i*50, ease: easePolyOut}
                })}

                leave={(d,i)=>({
                    opacity:[0],
                    x:[-200],
                    timing:{duration: 500, delay: i*50, ease: easePolyOut}
                })}

            >

                {(nodes)=>( //"nodes" es una lista con todas las iteraciones de todos los elementos de mis listas. 
                    <div>
                        {nodes.map(({key, data, state: {x, opacity}}) => { //El "state" es del "NodeGroup", NO el de "MatchesList".
                            let obj = {opacity, transform: `translate(${x}px)`}
                            return  (   
                                <div
                                    key={key}
                                    className="match_box_big">
                                    style={obj} 
                                >
                                    <div className="block_wraper" /**OJO: "wraper" con una sola "p" por una cuestión de CSS. Puede que haya que arreglar otras cosas similares con "wraper".*/> 
                                        <div className="block">
                                            <div
                                                className="icon"
                                                style={{ background: `url(/images/team_icons/${data.localThmb}.png)` }}></div>
                                            <div className="team">{data.local}</div>
                                            <div className="result">{data.resultLocal}</div>

                                        </div>
                                        <div className="block">
                                            <div
                                                className="icon"
                                                style={{ background: `url(/images/team_icons/${data.awayThmb}.png)` }}></div>
                                            <div className="team">{data.away}</div>
                                            <div className="result">{data.resultAway}</div>

                                        </div>
                                    </div>
                                    <div className="block_wraper nfo">
                                        <div><strong>Date:</strong>{data.date}</div>
                                        <div><strong>Stadium:</strong>{data.stadium}</div>
                                        <div><strong>Referee:</strong>{data.referee}</div>

                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

            </NodeGroup>
            : null
    )

    render() {
        return (
            <div>
                {this.showMatches()}
            </div>
        );
    }
}

export default MatchesList;