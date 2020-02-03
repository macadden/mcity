import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem'; //Lo uso para darle estructura de lista lateral.
import { firebase } from '../../../firebase';

//Lugar donde voy a almacenar los links
const AdminNav = () => {

    const links = [
        {
            title: 'Matches',
            linkTo: '/admin_matches'
        },
        {
            title: 'Add Match',
            linkTo: '/admin_matches/edit_match'
        },
        {
            title: 'Players',
            linkTo: '/admin_players'
        },
        {
            title: 'Add Players',
            linkTo: '/admin_players/add_players'
        }
    ]

    const style = {
        color: '#ffffff',
        fontWeight: '300',
        borderBottom:'1px solid #353535'

    }


    /**-Lugar para renderizar todos los items en forma de link; además, lugar para loopearlos y luego mostrar, en el DIV de "return", el item actual.
     * -Mapeo los links; en cada iteración voy a recibir un link y luego voy a ejecutar una función con un link... estoy loopeando, así que necesit una "key".
       -Dentro de ListItem tengo que poner el nombre del link; además especificar qué tipo de item queremos de "material-ui" (button)
     */
    const renderItems = () => (
        links.map(link => (
            <Link to={link.linkTo} key={link.title}>
                <listItem button style={style}>
                    {link.title}
                </listItem>
            </Link>
        ))    
    )

    //Para desloguearse.
    const logouthandler = () => {
        firebase.auth().signOut().then(()=>{ //A DIFERENCIA DEL CURSO, LE AGREGUÉ "()" A "signOut".
            console.log('Log out succesful')
        },(error)=>{
            console.log('Error logging out')
        })
    }

    return (
        <div>
            {renderItems()}
            <ListItem button style={style} onClick={() => logouthandler()}>
                Log Out
            </ListItem>
        </div>
    );
};

export default AdminNav;