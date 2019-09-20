import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './components/Note';
import noteService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true);

  const hook = () => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes);
    });
  };
  useEffect(hook, []);

  const toggleImportanceOf = id => {
    const note = notes.find(note => note.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => (note.id !== id ? note : returnedNote)));
      })
      .catch(error => {
        alert(`the note '${note.content}' was already deleted from server`);
        setNotes(notes.filter(n => n.id !== id));
      });
  };

  const rows = notes =>
    notesToShow.map(note => (
      <Note
        key={note.id}
        note={note}
        toggleImportance={() => toggleImportanceOf(note.id)}
      />
    ));

  const addNote = event => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString,
      important: Math.random() > 0.5,
      id: notes.length + 1
    };

    noteService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote));
      setNewNote('');
    });
  };

  const handleNoteChange = event => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'imporrtant' : 'all'}
        </button>
      </div>
      <ul>{rows(notes)}</ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
