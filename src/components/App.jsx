import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import CreateArea from "./Createarea";
import Note from "./Note";

function App() {
  const [notes, addNote] = useState([]);
  function add(text) {
    addNote((prev) => [...prev, text]);
  }

  function deleteItem(id) {
    addNote((prev) => {
      return prev.filter((note, index) => index != id);
    });
  }
  return (
    <div>
      <Header />
      <CreateArea onClicked={add} />
      {notes.map((note, index) => (
        <Note
          key={index}
          id={index}
          title={note.title}
          content={note.content}
          onClicked={deleteItem}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
