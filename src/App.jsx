import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Navbar } from './components/Navbar/Navbar';
import { Layout } from './components/Layout';
import { SignUp } from './pages/SignUp/SignUp';
import { Routes, Route } from 'react-router-dom';
import { paths } from './services/path';
import { Home } from './pages/Home/Home';
import { Profile } from './pages/Profile/Profile';

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <Layout>
        <Routes>
          <Route path={paths.signUp} element={<SignUp />} />
          <Route path={paths.profile} element={<Profile />} />
          <Route path={paths.home} element={<Home />} />
        </Routes>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
