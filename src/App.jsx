import { Box, ChakraProvider } from '@chakra-ui/react';

function App() {
	console.log('teset');
	return (
		<ChakraProvider>
			<Box>Hi</Box>
		</ChakraProvider>
	);
}

export default App;
