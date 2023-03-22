import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../constants/url";
import arrowUp from "../../assets/arrow-up.svg";
import arrowUpBlue from "../../assets/arrow-up-blue.svg";
import arrowDown from "../../assets/arrow-down.svg";
import arrowDownRed from "../../assets/arrow-down-red.svg";

const CommentCards = (props) => {
  const { comment, fetchComments } = props;
  const [likes, setLikes] = useState(false);
  const [dislikes, setDislikes] = useState(false);

  const like = async () => {
    try {
      const body = {
        like: true,
      };
      await axios.put(BASE_URL + `/posts/comment/${comment.id}/like`, body, {
        headers: {
          Authorization: window.localStorage.getItem("labeddit-token"),
        },
      });
      fetchComments();
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
      await axios.put(BASE_URL + `/posts/comment/${comment.id}/like`, body, {
        headers: {
          Authorization: window.localStorage.getItem("labeddit-token"),
        },
      });
      fetchComments();
      setDislikes(true);
      setLikes(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container" id="card">
      <p id="username">Enviador por: {comment.creator.name}</p>
      <p id="post-text">{comment.content}</p>
      <div className="row">
        {likes ? (
          <img src={arrowUpBlue} alt="" className="icon" onClick={like} />
        ) : (
          <img src={arrowUp} alt="" className="icon" onClick={like} />
        )}
        <p className="numbers-post">{comment.likes}</p>
        {dislikes ? (
          <img src={arrowDownRed} alt="" className="icon" onClick={dislike} />
        ) : (
          <img src={arrowDown} alt="" className="icon" onClick={dislike} />
        )}
      </div>
    </div>
  );
};

export default CommentCards;
