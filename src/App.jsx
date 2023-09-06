import React, { useState, useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:7070/notes");
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      } else {
        console.error("Failed to fetch notes");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addNote = async () => {
    try {
      const response = await fetch("http://localhost:7070/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newNote }),
      });
      if (response.ok) {
        setNewNote("");
        fetchNotes();
      } else {
        console.error("Failed to add note");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:7070/notes/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchNotes();
      } else {
        console.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <h1>Notes</h1>
      <div className="input-container">
        <input className="input"
          type="text"
          placeholder="New Note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button className='button' onClick={addNote}>Add</button>
      </div>
      <ul className="card-container">
        {notes.map((note) => (
          <li key={note.id} className="note-card">
            <span>{note.content}</span>
            <span
              className="delete-button"
              onClick={() => deleteNote(note.id)}
            >
              &#10006;
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

