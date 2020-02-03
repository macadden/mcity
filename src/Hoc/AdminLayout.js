//Es un RSC porque solo devuelve el conteiner del código  del DIV ppal de "dashboard.js"

import React from 'react';
import AdminNav from '../Components/admin/nav/AdminNav';

const AdminLayout = (props) => {
    return (
        /**-Tengo dos partes ppales; la solapa de la izquierda y la pantalla ppal central, así que necesito dos DIVs ppales.
         * -En el div derecho tengo que ṕoner cualquier contenido que obtengo de "Dashboard.js" (los hijos), por eso tengo "props".
        */
        <div className="admin_container">
            <div className="admin_left_nav">
                <AdminNav/>
            </div>
            <div className="admin_right">
                {props.children}
            </div>
        </div>
    );
};

export default AdminLayout;