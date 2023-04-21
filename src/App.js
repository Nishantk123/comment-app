import React, { useState } from "react";
import Comment from "./layout/Comment";
import "./App.scss";
import Utils from "./utils/Utils";
const comments = {
  id: 1,
  items: [],
};
 const App=() =>{
  // const comments = useSelector(selectGroupedComments);
  // console.log("My comments", comments);
  const [commentsData, setCommentsData] = useState(comments);

  const { insertComment, editComment, deleteComment } = Utils();

  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertComment(commentsData, folderId, item);
    setCommentsData(finalStructure);
  };

  const handleEditNode = (folderId, value) => {
    const finalStructure = editComment(commentsData, folderId, value);
    setCommentsData(finalStructure);
  };

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteComment(commentsData, folderId);
    const temp = { ...finalStructure };
    setCommentsData(temp);
  };
console.log(commentsData)
  return (
    <div className="app">
    <Comment
      handleInsertNode={handleInsertNode}
      handleEditNode={handleEditNode}
      handleDeleteNode={handleDeleteNode}
      comment={commentsData}
    />
  </div>
  );
}

export default App