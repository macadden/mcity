import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoutes = ({
    user,
    component: Comp,
    ...rest
}) => {
    //Siempre que use "Route" de 'react-router-dom', este va a aplicar muchas props como: history, etc.
    return <Route {...rest} component={(props)=>( /**ahora la función (que recibe "props" de react-router, no de las mismas que uso en
                                                      PrivateRoutes) tiene de que devolver un componente.*/
              rest.restricted ? /**-"rest" porque estoy en la parte de "rest" de las "props".
                                   -Checkeo si esta "restricted"; si lo está, hago algo sino devuelvo un componente. */
                ( user ? //-Si el usuario está logueado, no quiero que vaya a Log In, así que lo redirecciono a "dashboard".
                    <Redirect to="/dashboard"/>
                    : //Si el usuario NO está logueado, lo mando a Sign In.
                    <Comp {...props} user={user}/>
                )

              : //Si no está "restricted" devuelvo un componente.
                                                
              <Comp {...props} user={user}/>
    )}/>  
};

export default PublicRoutes;