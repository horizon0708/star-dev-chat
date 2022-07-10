import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { supabase } from './supabaseClient';
import { paths } from './path';

const RestrictedRoutes = () => {
    let user = supabase.auth.user();

    return (
        !user ? <Outlet/> : <Navigate to = {paths.home}/>

    );
};

export default RestrictedRoutes;