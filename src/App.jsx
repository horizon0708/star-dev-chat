import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Navbar } from './components/Navbar/Navbar';
import { Layout } from './components/Layout';
import { SignUp } from './pages/SignUp/SignUp';

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <Layout>
        <SignUp />
      </Layout>
    </ChakraProvider>
  );
}

export default App;
