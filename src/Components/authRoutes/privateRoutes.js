import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoutes = ({
    user,
    component: Comp,
    ...rest //"rest" es el resto de las props (que vienen desde "Routes") que no especificamos ("path", "exact", etc).


}) => {
    //Siempre que use "Route" de 'react-router-dom', este va a aplicar muchas props como: history, etc.
    return <Route {...rest} component={(props)=>( /**ahora la función (que recibe "props" de react-router, no de las mismas que uso en
                                                      PrivateRoutes) tiene de que devolver un componente.*/
            user ? //Si tengo un usuario, quiero devolver un componente.
                 <Comp {...props} user={user}/> /**REFERENCIA a "Comp" de "privateRoutes". Lo que significa que es "Dashboard", junto con 
                                                   las props y toda la info de usuario.*/
                 ://Si no tengo usuario logueado y se quiere entrar a una ruta privada, lo redirecciono a la pantalla de sign in.
                 <Redirect to="/sign_in"/>
    )}/>
};

export default PrivateRoutes;