import React, {useContext} from 'react';
import { Navigate, Outlet } from 'react-router';
import { supabase } from './supabaseClient';
import { paths } from './path';
import { AuthProvider } from './Auth';

const RestrictedRoutes = () => {

    let user = useContext(AuthProvider);

    return (
        !user ? <Outlet/> : <Navigate to = {paths.home}/> 
    );
    
};

export default RestrictedRoutes;