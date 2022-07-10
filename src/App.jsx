import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Navbar } from './components/Navbar/Navbar';
import { Layout } from './components/Layout';
import { SignUp } from './pages/SignUp/SignUp';
import { Routes, Route,Navigate } from 'react-router-dom';
import { paths } from './services/path';
import { Home } from './pages/Home/Home';
import { Profile } from './pages/Profile/Profile';
import {SignIn} from './pages/SignIn/SignIn';
import SignOut from './pages/SignOut/SignOut';
import PrivateRoutes from './services/PrivateRoutes';
import RestrictedRoutes from './services/RestrictedRoutes';

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <Layout>
        <Routes>
          <Route element={<PrivateRoutes/>}>
          <Route path={paths.profile} element={<Profile />} />
          <Route path={paths.home} element={<Home />} />
          <Route path={paths.signout} element={<SignOut/>} />
          <Route path="/*" element={<Navigate to={paths.home}/>} />
          </Route>
          <Route element={<RestrictedRoutes/>}>
          <Route path={paths.signup} element={<SignUp />} />
          <Route path={paths.signin} element={<SignIn />} />
          <Route path="/*" element={<Navigate to={paths.signin}/>} />

          </Route>
        </Routes>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
