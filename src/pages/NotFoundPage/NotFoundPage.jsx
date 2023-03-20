import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import Header from "../../layout/Header/Header";

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, pink.500, yellow.400)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text color={"gray.500"} mb={6}>
          The page you're looking for does not seem to exist
        </Text>

        <Button
          colorScheme="yellow"
          bgGradient="linear(to-r, pink.500, yellow.400)"
          color="white"
          variant="solid"
        >
          Go to Home
        </Button>
      </Box>
    </>
  );
};

export default NotFoundPage;
