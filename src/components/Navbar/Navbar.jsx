import { HStack, Container, Heading, Link as LinkC } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { paths } from '../../services/path';
import { AuthContext } from '../../services/Auth';

export const navBarHeight = '50px';

export const Navbar = () => {
  const user = useContext(AuthContext);

  return (
    <HStack height={navBarHeight}>
      <Container maxW="container.xl">
        <HStack justifyContent="space-between">
          <Heading id="test-home" size="md" as={Link} to={paths.home}>
            Star Dev Chat
          </Heading>
          <HStack spacing={4}>
            {user && (
              <LinkC as={Link} to={paths.profile}>
                Profile
              </LinkC>
            )}
            {user && (
              <LinkC as={Link} to={paths.signout}>
                Sign out
              </LinkC>
            )}
            {user && (
              <LinkC as={Link} to={paths.chat}>
                Chat
              </LinkC>
            )}
            {!user && (
              <LinkC as={Link} to={paths.signup}>
                Sign up
              </LinkC>
            )}
            {!user && (
              <LinkC as={Link} to={paths.signin}>
                Sign in
              </LinkC>
            )}
          </HStack>
        </HStack>
      </Container>
    </HStack>
  );
};
