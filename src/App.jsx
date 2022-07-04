import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Navbar } from './components/Navbar/Navbar';
import { Layout } from './components/Layout';
import { SignUp } from './pages/SignUp/SignUp';
import { Routes, Route } from 'react-router-dom';
import { paths } from './services/path';
import { Home } from './pages/Home/Home';
import { Profile } from './pages/Profile/Profile';
import {SignIn} from './pages/SignIn/SignIn';
import PrivateRoutes from './services/PrivateRoutes';

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <Layout>
        <Routes>
          <Route element={<PrivateRoutes/>}>
               <Route path={paths.home} element={<Home />}  exact/>
               <Route path={paths.profile} element={<Profile />} exact/>
          </Route>          
          <Route path={paths.signup} element={<SignUp />} />
          <Route path={paths.signin} element={<SignIn />} />
        </Routes>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
