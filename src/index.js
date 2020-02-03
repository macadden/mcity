import React from 'react';
import ReactDOM from 'react-dom';
import './Resources/css/app.css';


import { BrowserRouter } from 'react-router-dom'; /**Tengo que 'wrapear' (?) la app dentro del browser Router,
                                                    así que voy a tener que traer cosas de React Router*/
import Routes from './routes';
import { firebase } from './firebase';


/**-Esta función es mi App principal
 * -pasandole las props a "Routes" puedo checkear desde allá si tengo un usuario o no.
 */
const App = (props) => {
    return (
        <BrowserRouter>
            <Routes {...props}/> 
        </BrowserRouter>
        
    )
}

/**-La función interna, después de haber checkeado "onAuthStateChanged", devuelve la App.
 * -Siempre que "onAuth..." cambie, se va a recibir un "user".
 * -Siempre que renderice la App voy a agregar una prop ("user") que va a tener toda la lógica para el usuario.
*/
firebase.auth().onAuthStateChanged((user)=>{
    ReactDOM.render(<App user={user}/>, document.getElementById('root'));
})


