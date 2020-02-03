import React from 'react';
import Header from '../Components/Header_footer/Header';/**"Header.js" lo pongo porque no tengo un "index" */
import Footer from '../Components/Header_footer/Footer';/**"Footer.js" lo pongo porque no tengo un "index" */

const Layout = (props) => {
    return (
        <div>
            <Header/>
            {props.children}
            <Footer/>
        </div>
    );
};

export default Layout;