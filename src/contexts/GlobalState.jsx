import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/url";

export const GlobalState = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem("labeddit-token");

    if (token) {
      fetchPosts();
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(BASE_URL + "/posts", {
        headers: {
          Authorization: window.localStorage.getItem("labeddit-token"),
        },
      });

      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    posts,
    setPosts,
    fetchPosts,
  };
};
