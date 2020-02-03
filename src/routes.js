import React from 'react';
import Layout from './Hoc/Layout';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './Components/authRoutes/privateRoutes';
import PublicRoute from './Components/authRoutes/publicRoutes';

import Home from './Components/home';
import SignIn from './Components/SignIn';
import TheTeam from './Components/theTeam';
import TheMatches from './Components/theMatches';
import NotFound from './Components/ui/not_found';

import Dashboard from './Components/admin/Dashboard';
import AdminMatches from './Components/admin/matches';
import AddEditMatch from './Components/admin/matches/addEditMatch';
import AdminPlayers from './Components/admin/players';
import AddEditPlayers from './Components/admin/players/addEditPlayers';

const Routes = (props) => {



  return (
    /**Ejemplo de PUBLICROUTE: (comentario viejo antes de hacer los cambios para permisos de usuario) Defino una ruta para "home"; en
     * "component" digo a qué componente quiero renderizar a home, y es simplemente "home"; "path" es el camino que va a usar la ruta, 
     * y también es home (/).
     * -"/admin_matches/edit_match/:id"; el ":id" es la manera de captar valores dinámicos con REACT ROUTER en la URL.
     * -Si voy al "edit_match" sin el id, lo que quiero es ir específicamente a "AddMatch" */
    <Layout>
      <Switch>
        <PrivateRoute {...props} path="/admin_players/add_players" exact component={AddEditPlayers} />
        <PrivateRoute {...props} path="/admin_players/add_players/:id" exact component={AddEditPlayers} />
        <PrivateRoute {...props} path="/admin_players" exact component={AdminPlayers} />
        <PrivateRoute {...props} path="/admin_matches/edit_match" exact component={AddEditMatch} />
        <PrivateRoute {...props} path="/admin_matches/edit_match/:id" exact component={AddEditMatch} />
        <PrivateRoute {...props} path="/admin_matches" exact component={AdminMatches} />
        <PrivateRoute {...props} path="/dashboard" exact component={Dashboard} />
        <PublicRoute {...props} path="/sign_in" restricted={true} exact component={SignIn} />
        <PublicRoute {...props} path="/the_matches" restricted={false} exact component={TheMatches} />       
        <PublicRoute {...props} path="/the_team" restricted={false} exact component={TheTeam} />
        <PublicRoute {...props} path="/" restricted={false} exact component={Home} />
        <PublicRoute {...props} restricted={false} exact component={NotFound} />
      </Switch>

    </Layout>

  )
}

export default Routes;
