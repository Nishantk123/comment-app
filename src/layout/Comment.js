import { useState, useRef, useEffect } from "react";
import Action from "./Action";
import CommentBox from "../component/CommentBox";
import send from "../assets/icons/send.png";
import profile from "../assets/icons/profile.png";
import chat from "../assets/icons/chat.png";
import arrow from "../assets/icons/arrow.png";
import Delete from "../assets/icons/delete.png";
import remove from "../assets/icons/remove.png";
import edit from "../assets/icons/edit.png";
import down from "../assets/icons/down.png";
// import { ReactComponent as DownArrow } from "../assets/down-arrow.svg";
// import { ReactComponent as UpArrow } from "../assets/up-arrow.svg";

const Comment = ({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  comment,
}) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const handleNewComment = () => {
    setShowInput(true);
    setExpand(true);
  };
  const handleExpand = () => {
    setExpand(!expand);
  };
  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText);
    } else {
      setExpand(true);
      handleInsertNode(comment.id, input);
      setShowInput(false);
      setInput("");
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };

  return (
    <div className="container-fluid">
      <div className={comment.id === 1 ? "inputContainer" : "commentContainer"}>
        {comment.id === 1 ? (
          <div className="w-100 my-3   ps-lg-5 d-flex">
            <input
              type="text"
              className="form-control w-100"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="add comment..."
            />

            <img
              src={send}
              className="send-icon ms-2"
              type="COMMENT"
              onClick={onAddComment}
            />
          </div>
        ) : (
          <>
            <div className="d-flex mt-3">
              <img src={profile} className="profile-icon" />
              <div className="w-100">
                <div className="comment-box">
                  <h6>Manoj Singh</h6>
                  <div
                    className={
                      editMode ? "comment-text-editable" : "comment-text"
                    }
                    contentEditable={editMode}
                    suppressContentEditableWarning={editMode}
                    ref={inputRef}
                    style={{ wordWrap: "break-word" }}
                  >
                    {comment.name}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", marginTop: "5px" }}>
              {editMode ? (
                <div className="px-5 d-flex">
                  <Action
                    className="reply"
                    type="SAVE"
                    handleClick={onAddComment}
                  />
                  <Action
                    className="reply"
                    type="CANCEL"
                    handleClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comment.name;
                      setEditMode(false);
                    }}
                  />
                </div>
              ) : (
                <div className="px-5 d-flex">
                  <div>
                    <img
                      src={expand ? down : arrow}
                      className={expand ? "chat-icon" : "chat-icon-small"}
                      onClick={handleExpand}
                    />
                    <span style={{ fontSize: "14px" }}>
                      {comment.items.length}
                    </span>
                  </div>
                  <img
                    src={chat}
                    className="chat-icon"
                    type={
                      <>
                        {/* {expand ? (
                          <UpArrow width="10px" height="10px" />
                        ) : (
                          <DownArrow width="10px" height="10px" />
                        )}{" "} */}
                        REPLY
                      </>
                    }
                    onClick={handleNewComment}
                  />
                  <img
                    src={edit}
                    className="chat-icon"
                    type="EDIT"
                    onClick={() => {
                      setEditMode(true);
                    }}
                  />
                  <img
                    src={Delete}
                    className="chat-icon"
                    type="DELETE"
                    onClick={handleDelete}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div
        className="comment-container"
        style={{ display: expand ? "block" : "none" }}
      >
        {showInput && (
          <div className="d-flex w-100 ps-5 mt-3">
            <input
              type="text"
              className="form-control w-100"
              autoFocus
              onChange={(e) => setInput(e.target.value)}
            />
            <img
              src={send}
              className="send-icon"
              type="COMMENT"
              onClick={onAddComment}
            />
            <img
              src={remove}
              className="send-icon"
              type="CANCEL"
              onClick={() => {
                setShowInput(false);
                if (!comment?.items?.length) setExpand(false);
              }}
            />
          </div>
        )}

        {comment?.items?.map((cmnt) => {
          return (
            <Comment
              key={cmnt.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              comment={cmnt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
