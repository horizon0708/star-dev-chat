import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home/Home';
import { Layout } from './components/Layout';

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <Layout>
        <Home />
      </Layout>
    </ChakraProvider>
  );
}

export default App;
