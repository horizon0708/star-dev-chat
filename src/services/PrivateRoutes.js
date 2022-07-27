import React, {useContext} from 'react';
import { Navigate, Outlet } from 'react-router';
import { paths } from './path';
import { AuthProvider } from './Auth';

const PrivateRoutes = () => {

    let user = useContext(AuthProvider)

    return (   
          user ? <Outlet/> : <Navigate to = {paths.signin}/> 
    );
    
};

export default PrivateRoutes;