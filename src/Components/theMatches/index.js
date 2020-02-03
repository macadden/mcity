import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { firebaseMatches } from '../../firebase';
import { firebaseLooper, reverseArray } from '../ui/misc'

import LeagueTable from './table';
import MatchesList from './matchesList';

class TheMarches extends Component {

    state = {
        loading: true,
        matches: [],
        filterMatches: [],
        playerFilter: 'All',
        resultFilter: 'All'
    }

    componentDidMount() {
        firebaseMatches.once('value').then(snapshot => {
            const matches = firebaseLooper(snapshot);

            this.setState({
                loading: false,
                matches: reverseArray(matches),
                filterMatches: reverseArray(matches)
            })
        })
    }

    showPlayed = (played) => {
        const list = this.state.matches.filter((match)=>{
            return match.final === played
        });
        this.setState({
            filterMatches: played === 'All' ? this.state.matches : list,
            playedFilter: played,
            resultFilter: 'All'
        })
    }

    showResult = (result) => {
        const list = this.state.matches.filter((match)=>{
            return match.result === result
        });
        this.setState({ //devuelvo "result"; si no (o sea, ¿Si no se jugó?) devuelvo playedFilter a 'All' (?).
            filterMatches: result === 'All' ? this.state.matches : list,
            playedFilter: 'All',
            resultFilter: result
        })
    }

    render() {

        const state = this.state;

        return (
            <div className="the_matches_container">
                <div className="the_matches_wrapper">
                    <div className="left">
                        <div className="match_filters">
                             <div className="match_filters_box">
                                <div className="tag">
                                    Show Match
                                </div>
                                <div className="cont">
                                    <div className={`option ${state.playedFilter === 'All'?'active':''}`} /**Uso "{``}" porque intercambio clases (???) */
                                        onClick={()=> this.showPlayed('All')}
                                    >
                                        All 
                                    </div>
                                    <div className={`option ${state.playedFilter === 'Yes'?'active':''}`} /**Uso "{``}" porque intercambio clases (???) */
                                        onClick={()=> this.showPlayed('Yes')}
                                    >
                                        Played
                                    </div>
                                    <div className={`option ${state.playedFilter === 'No'?'active':''}`} /**Uso "{``}" porque intercambio clases (???) */
                                        onClick={()=> this.showPlayed('No')}
                                    >
                                        Not Played 
                                    </div>
                                </div>
                             </div>
                             <div className="match_filters_box">
                                <div className="tag">
                                    Result game
                                </div>
                                <div className="cont">
                                    <div className={`option ${state.resultFilter === 'All'?'active':''}`} /**Uso "{``}" porque intercambio clases (???) */
                                        onClick={()=> this.showResult('All')}
                                    >
                                        All 
                                    </div>
                                    <div className={`option ${state.resultFilter === 'W'?'active':''}`} /**Uso "{``}" porque intercambio clases (???) */
                                        onClick={()=> this.showResult('W')}
                                    >
                                        W
                                    </div>
                                    <div className={`option ${state.resultFilter === 'L'?'active':''}`} /**Uso "{``}" porque intercambio clases (???) */
                                        onClick={()=> this.showResult('L')}
                                    >
                                        L
                                    </div>
                                    <div className={`option ${state.resultFilter === 'D'?'active':''}`} /**Uso "{``}" porque intercambio clases (???) */
                                        onClick={()=> this.showResult('D')}
                                    >
                                        D
                                    </div>
                                </div>
                             </div>
                        </div>
                        <MatchesList matches={state.filterMatches}/>
                    </div>
                    <div className="right">
                        <LeagueTable/>
                    </div>
                </div>
            </div>
        );
    }
}

export default TheMarches;