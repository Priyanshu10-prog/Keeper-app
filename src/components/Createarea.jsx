import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [text, setText] = useState({
    title: "",
    content: "",
  });
  const [textarea, expandArea] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setText((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  function handleClick(event) {
    event.preventDefault();
    props.onClicked(text);
    setText({
      title: "",
      content: "",
    });
    expandArea(false);
  }

  function expand() {
    expandArea(true);
  }

  return (
    <div>
      <form className="create-note" spellCheck="false">
        <input
          onChange={handleChange}
          type="text"
          name="title"
          placeholder="title"
          value={text.title}
        />
        <textarea
          onClick={expand}
          onChange={handleChange}
          type="text"
          name="content"
          placeholder="type your content"
          value={text.content}
          rows={textarea && "4"}
        />
        <Zoom in={textarea}>
          <Fab onClick={handleClick}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
