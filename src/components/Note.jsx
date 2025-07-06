import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Note(props) {
  function deleted() {
    props.onClicked(props.id);
  }
  return (
    <div class="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={deleted}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
