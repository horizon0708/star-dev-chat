import { Container } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

export const Layout = ({ children }) => {
  return (
    <Container maxW="container.lg" mt={8}>
      {children}
    </Container>
  );
};

Layout.propTypes = {
  children: PropTypes.children,
};
