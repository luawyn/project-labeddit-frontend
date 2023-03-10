import { Input, Flex } from "@chakra-ui/react";
import React from "react";
import PostCards from "../../components/PostCards/PostCards";
import Header from "../../layout/Header/Header";
import "../HomePage/homePage.sass";

const HomePage = () => {
  return (
    <div className="container">
      <Header />
      <Flex gap="2" direction="column" align="center">
        <Input
          padding="0"
          marginTop="30"
          type="text"
          placeholder="Escreva seu post..."
          height="130"
          paddingBottom="100px"
          maxWidth="334"
        />
        <a href="" className="btn-post">
          Postar
        </a>
        <div className="divider"></div>
      </Flex>
      <PostCards />
    </div>
  );
};

export default HomePage;
