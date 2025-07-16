import React, { useState,useEffect } from "react";
import Header from "./header";
import Footer from "./footer";
import CreateArea from "./Createarea";
import Note from "./Note";
import axios from "axios";

function App() {
  const [notes, addNote] = useState([]);
  function add(text) {
    addNote((prev) => [...prev, text]);
  }
useEffect(() =>{
   axios.get("http://localhost:3000/notes").then(res =>{
    addNote(res.data);
   })
}, []);
 


  function deleteItem(id) {
    addNote((prev) => {
      return prev.filter((note) => note.id != id);
    });
  }
  return (
    <div>
      <Header />
      <CreateArea onClicked={add} />
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.tite}
          content={note.content}
          onClicked={deleteItem}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
