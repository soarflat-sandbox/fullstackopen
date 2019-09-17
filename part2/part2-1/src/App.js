import React from 'react';

import Note from './components/Note';

export default function App({ notes }) {
  const rows = notes => notes.map(note => <Note key={note.id} note={note} />);

  return (
    <div>
      <h1>Notes</h1>
      <ul>{rows(notes)}</ul>
    </div>
  );
}
