import { Box, Container, Heading, HStack, Link } from '@chakra-ui/react';
import React from 'react';
import { paths } from '../../services/path';

export const Navbar = () => {
  return (
    <Box py={4}>
      <Container maxW="container.xl">
        <HStack justifyContent="space-between">
          <Heading size="md" as={Link} href={paths.home}>
            Star Dev Chat
          </Heading>
          <HStack spacing={4}>
            <Link href={paths.profile}>Profile</Link>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};
