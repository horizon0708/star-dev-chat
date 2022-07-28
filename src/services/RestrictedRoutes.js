import React, {useContext} from 'react';
import { Navigate, Outlet } from 'react-router';
import { paths } from './path';
import { AuthContext } from './Auth';

const RestrictedRoutes = () => {

    let user = useContext(AuthContext);

    return (
        !user ? <Outlet/> : <Navigate to = {paths.home}/> 
    );

};

export default RestrictedRoutes;