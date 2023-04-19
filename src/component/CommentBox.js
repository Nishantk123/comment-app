import React, { useState } from "react";
import { AddComment } from "../layout/Comments";
import profile from "../assets/icons/profile.png";
import chat from "../assets/icons/chat.png";
import arrow from "../assets/icons/arrow.png";
const CommentBox = ({ comment }) => {
  const { id, text, children } = comment;
  const [show, setShow] = useState(false);
  const handleComment = () => {
    setShow(!show);
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <div>
      <div className="d-flex my-3">
        <img src={profile} className="profile-icon" />
        <div className="w-100">
          <div className="comment-box">
            <h6>Manoj Singh</h6>
            <div className="comment-text">{text}</div>
          </div>
          <div className="d-flex">
            <div>
              <img src={arrow} className="arrow-icon" />
              <span className="comment-count">
                {children.length > 0 && children.length}
              </span>
            </div>
            <img src={chat} className="chat-icon" onClick={handleComment} />
          </div>
          <div>{show && <AddComment pid={id} handleClose={handleClose} />}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
