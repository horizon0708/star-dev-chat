import { Box, Container, Heading, HStack, Link } from '@chakra-ui/react';
import React from 'react';
import { paths } from '../../services/path';

export const Navbar = () => {
  return (
    <Box py={4}>
      <Container maxW="container.xl" >
        <HStack justifyContent="space-between" h="50px" bg="blackAlpha.200" >
          <Heading p={4} color="green.500" size="md" sx={{textDecoration: 'none'}} as={Link} href={paths.home}>
            Star Dev Chat
          </Heading>
          <HStack  >
            <Link  sx={{textDecoration: 'none'}}
                   href={paths.profile} 
                   p={2}
                   m={4}
                   bg="green.500"
                   color="white"
                   borderRadius="md"
                   fontSize="large"
                   boxShadow="md"
                   textShadow="sm"
                               >Profile</Link>
          </HStack> 
        </HStack>
      </Container>
    </Box>
  );
};
