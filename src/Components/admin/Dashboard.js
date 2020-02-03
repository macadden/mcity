//Es un RSC porque solo hago una muestra del layout y redireccionar

import React from 'react';
import AdminLayout from '../../Hoc/AdminLayout'; /**siempre que se tenga una ruta de "Admin", tengo que envolver/empaquetar los componentes
                                                    - dentro de <Admin...> (en este caso, <AdminLayout>)*/

const Dashboard = () => {
    return (
        <AdminLayout>
            <div className="user_dashboard">
                <div>
                    This is your dashboard.
                </div>
            </div>
        </AdminLayout>

    );
};

export default Dashboard;