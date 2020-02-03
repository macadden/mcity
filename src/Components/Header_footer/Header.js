import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

 import { Link } from 'react-router-dom'; /**cuando hago click en los botones appBar tengo links */

import { CityLogo } from '../ui/icons';

class Header extends Component {
    render() {
        return (
            <AppBar
                position="fixed"
                style={{
                    backgroundColor:'#98c5e9',
                    boxShadow: 'none',
                    padding: '10px 0', /**10px from the top and 0 from the sides */
                    borderBottom: '2px solid #00285e'
                }}
            >
                <Toolbar style={{display:'flex'}}>
                    <div style={{flexGrow: 1}} /** flexGrow: https://cdn-media-1.freecodecamp.org/images/duNzzISFc-oJJ4pFXr9OvCNwF46JawATpzrx */>
                        <div className="header_logo">
                            <CityLogo
                                link={true}
                                linkTo="/"
                                width="70px"
                                height="70px"
                            />
                        </div>
                    </div>

                    <Link to="/the_team">
                        <Button color="inherit">The team</Button>
                    </Link>
                    <Link to="/the_matches">
                        <Button color="inherit">Matches</Button>
                    </Link>

                </Toolbar>

            </AppBar>


        );
    }
}

export default Header;