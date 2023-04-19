import React, { useState, memo } from 'react';
import { useDispatch } from 'react-redux';
import { addComment, id } from '../redux';
import CommentBox from '../component/CommentBox';
import send from "../assets/icons/send.png"

export const AddComment = memo(function AddComment({ pid = 'root', handleClose= ()=>{} }) {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  return (
    <div className='d-flex'>
      <input type="text" className='form-control' value={text} onChange={e => setText(e.target.value)} />
      <img src={send}
        className='send-icon'
        onClick={() => {
            dispatch(addComment({ text, id: id(), pid }));
            setText('');
            handleClose()
          }}
        />
    </div>
  );
});

export const Comments = memo(function Comments({ comments }) {
  return (
    <div>
      {Boolean(comments.length) && (
        <ul>
          {comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </ul>
      )}
    </div>
  );
});

export const Comment = memo(function Comment({ comment }) {
  const { id, text, children } = comment;
  const [selected_id, setSelectedID] = useState("");
  const handleComment = (sid) =>{
    setSelectedID(sid)
  }
  return (
    <div>
        <CommentBox comment={comment} handleComment={handleComment}/>
        <Comments key={id} comments={children}  />
        {/* {id === selected_id&&<AddComment pid={id} />} */}
    </div>
  );
});
