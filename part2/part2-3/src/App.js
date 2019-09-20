import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './components/Note';

const App = () => {
  const [notes, setNotes] = useState([]);

  const hook = () => {
    console.log('effect');
    axios.get('http://localhost:3001/notes').then(response => {
      console.log('promise fulfilled');
      setNotes(response.data);
    });
  };
  useEffect(hook, []);
  console.log('render', notes.length, 'notes');

  const rows = notes => notes.map(note => <Note key={note.id} note={note} />);

  return (
    <div>
      <h1>Notes</h1>
      <ul>{rows(notes)}</ul>
    </div>
  );
};

export default App;
