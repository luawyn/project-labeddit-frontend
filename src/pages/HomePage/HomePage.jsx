import { Input, Flex } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostCards from "../../components/PostCards/PostCards";
import { BASE_URL } from "../../constants/url";
import { GlobalContext } from "../../contexts/GlobalContext";
import Header from "../../layout/Header/Header";
import { goToLoginPage } from "../../routes/coordinator";
import "../HomePage/homePage.sass";

const HomePage = () => {
  const navigate = useNavigate();
  const context = useContext(GlobalContext);
  const { posts, fetchPosts } = context;
  const [content, setContent] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("labeddit-token");

    if (!token) {
      goToLoginPage(navigate);
    } else {
      fetchPosts();
    }
  }, []);

  const createPost = async (event) => {
    event.preventDefault();

    try {
      const body = {
        content: content,
      };

      await axios.post(BASE_URL + "/posts", body, {
        headers: {
          Authorization: window.localStorage.getItem("labeddit-token"),
        },
      });
      setContent("");
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

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
          paddingBottom="100"
          maxWidth="334"
          paddingLeft="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <a onClick={createPost} className="btn-post">
          Postar
        </a>
        <div className="divider"></div>
      </Flex>
      <div className="gap">
        {posts &&
          posts.map((post) => {
            return <PostCards key={post.id} post={post} />;
          })}
      </div>
    </div>
  );
};

export default HomePage;
