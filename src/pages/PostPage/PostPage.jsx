import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../constants/url";
import { GlobalContext } from "../../contexts/GlobalContext";
import Header from "../../layout/Header/Header";
import { goToLoginPage } from "../../routes/coordinator";
import arrowUp from "../../assets/arrow-up.svg";
import arrowUpBlue from "../../assets/arrow-up-blue.svg";
import arrowDown from "../../assets/arrow-down.svg";
import arrowDownRed from "../../assets/arrow-down-red.svg";
import chat from "../../assets/chat.svg";
import { Flex, Input } from "@chakra-ui/react";
import CommentCards from "../../components/CommentCards/CommentCards";

const PostPage = () => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [likes, setLikes] = useState(false);
  const [dislikes, setDislikes] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const context = useContext(GlobalContext);
  const { posts, fetchPosts } = context;

  useEffect(() => {
    const token = window.localStorage.getItem("labeddit-token");
    if (!token) {
      goToLoginPage(navigate);
    } else {
      fetchPosts();
      fetchComments();
    }
  }, [comments]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/posts/comment/${params.postId}`,
        {
          headers: {
            Authorization: window.localStorage.getItem("labeddit-token"),
          },
        }
      );
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createComment = async (event) => {
    event.preventDefault();
    try {
      const body = {
        content: content,
      };
      await axios.post(`${BASE_URL}/posts/comment/${params.postId}`, body, {
        headers: {
          Authorization: window.localStorage.getItem("labeddit-token"),
        },
      });
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };

  const like = async () => {
    try {
      const body = {
        like: true,
      };
      await axios.put(BASE_URL + `/posts/${post.id}/like`, body, {
        headers: {
          Authorization: window.localStorage.getItem("labeddit-token"),
        },
      });
      fetchPosts();
      setLikes(true);
      setDislikes(false);
    } catch (error) {
      console.error(error);
    }
  };

  const dislike = async () => {
    try {
      const body = {
        like: false,
      };
      await axios.put(BASE_URL + `/posts/${post.id}/like`, body, {
        headers: {
          Authorization: window.localStorage.getItem("labeddit-token"),
        },
      });
      fetchPosts();
      setLikes(false);
      setDislikes(true);
    } catch (error) {
      console.error(error);
    }
  };

  const post = posts.find((post) => post.id === params.postId);

  return (
    <div>
      <Header />
      <div className="container">
        <div id="card">
          <p id="username">Enviador por: {post?.creator.name}</p>
          <p id="post-text">{post?.content}</p>
          <div className="row">
            {likes === true ? (
              <img src={arrowUpBlue} alt="" className="icon" onClick={like} />
            ) : (
              <img src={arrowUp} alt="" className="icon" onClick={like} />
            )}
            <p className="numbers-post">{post?.likes}</p>
            {dislikes === true ? (
              <img
                src={arrowDownRed}
                alt=""
                className="icon"
                onClick={dislike}
              />
            ) : (
              <img src={arrowDown} alt="" className="icon" onClick={dislike} />
            )}
            <img src={chat} alt="" className="icon" />
            <p className="numbers-post" id="margin-left">
              {post?.comments}
            </p>
          </div>
        </div>
      </div>
      <Flex gap="2" direction="column" align="center">
        <Input
          padding="0"
          marginTop="30"
          type="text"
          placeholder="Adicionar comentário"
          height="130"
          paddingBottom="100px"
          maxWidth="334"
          paddingLeft="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <a onClick={createComment} className="btn-post">
          Responder
        </a>
        <div className="divider"></div>
      </Flex>
      <div className="gap">
        {comments &&
          comments.map((comment) => {
            return (
              <CommentCards
                key={comment.id}
                fetchComments={fetchComments}
                comment={comment}
              />
            );
          })}
      </div>
    </div>
  );
};

export default PostPage;
