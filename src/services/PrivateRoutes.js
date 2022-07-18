import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { supabase } from './supabaseClient';
import { paths } from './path';

const PrivateRoutes = () => {
    let user = supabase.auth.user();

    return (
     
          user ? <Outlet/> : <Navigate to = {paths.signin}/> 
   
    );
};

export default PrivateRoutes;