import React from "react";
import { useSelector } from "react-redux";
import { Comments, AddComment } from "./layout/Comments";
import { selectGroupedComments } from "./redux";
import "./App.scss";

export default function App() {
  const comments = useSelector(selectGroupedComments);
  console.log("My comments", comments);
  return (
    <div className="app py-3">
      <div className="container ">
        <div className="my-3">
          <Comments comments={comments} />
        </div>
        <AddComment pid="root" />
      </div>
    </div>
  );
}
