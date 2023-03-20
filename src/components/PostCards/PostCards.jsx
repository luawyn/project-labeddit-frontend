import React, { useContext } from "react";
import chat from "../../assets/chat.svg";
import arrowUp from "../../assets/arrow-up.svg";
import arrowDown from "../../assets/arrow-down.svg";
import "../PostCards/postCards.sass";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BASE_URL } from "../../constants/url";
import axios from "axios";
import { goToCommentPage } from "../../routes/coordinator";

const PostCards = (props) => {
  const { post } = props;
  const navigate = useNavigate();

  const context = useContext(GlobalContext);
  const { fetchPosts } = context;

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
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container">
      <p id="username">Enviador por: {post.creator.name}</p>
      <p id="post-text">{post.content}</p>
      <div className="row">
        <img src={arrowUp} alt="" className="icon" onClick={like} />
        <p className="numbers-post">1.2k</p>
        <img src={arrowDown} alt="" className="icon" onClick={dislike} />
        <img
          src={chat}
          alt=""
          className="icon"
          onClick={() => goToCommentPage(navigate, post.id)}
        />
        <p className="numbers-post" id="margin-left">
          {post.comments}
        </p>
      </div>
    </div>
  );
};

export default PostCards;
