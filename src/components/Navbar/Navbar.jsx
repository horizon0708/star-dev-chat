import { Box, Container, Heading, HStack, Link } from '@chakra-ui/react';
import React from 'react';
import { paths } from '../../services/path';

export const Navbar = () => {
  return (
    <Box py={4}>
      <Container maxW="container.xl" >
        <HStack justifyContent="space-between" h="50px" bg="#f6f6f6f6" >
          <Heading p={4} color="#0f9d58" size="md" style={{textDecoration: 'none'}} as={Link} href={paths.home}>
            Star Dev Chat
          </Heading>
          <HStack p={4} spacing={4} m={4} bg="#069d58" color="#fff" isRound='true' fontSize="large"  >
            <Link  style={{textDecoration: 'none'}} href={paths.profile}>Profile</Link>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};
