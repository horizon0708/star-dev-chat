 import {
  Box,
  Container,
  Heading,
  HStack,
  Link as LinkC,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';
import { paths } from '../../services/path';
import { useSignUp } from '../../pages/SignUp/services/SignUp.Hooks';

export const Navbar = () => {
  const navbar = useSignUp();
  console.log(navbar);
  return (
    <Box py={4}>
      <Container maxW="container.xl">
        <HStack justifyContent="space-between">
          <Heading id='test-home' size="md" as={Link} to={paths.home}>
            Star Dev Chat
          </Heading>
          <HStack spacing={4}>
            <LinkC as={Link} to={paths.profile}>
              Profile 
            </LinkC>
           {navbar && <LinkC as={Link} to={paths.signup}>Sign up</LinkC>}
            <LinkC as={Link} to={paths.signin}>Sign in</LinkC>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};
