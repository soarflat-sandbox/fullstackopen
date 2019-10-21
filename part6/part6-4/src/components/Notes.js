import React from 'react';
import { toggleImportanceOf } from '../reducers/noteReducer';

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content} <strong>{note.important ? 'important' : ''}</strong>
    </li>
  );
};

const Notes = ({ store }) => {
  const { notes, filter } = store.getState();
  const notesToShow = () => {
    if (filter === 'ALL') {
      return notes;
    }
    return filter === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important);
  };
  const toggleImportance = id => () => {
    store.dispatch(toggleImportanceOf(id));
  };

  return (
    <ul>
      {notesToShow().map(note => (
        <Note
          key={note.id}
          note={note}
          handleClick={toggleImportance(note.id)}
        />
      ))}
    </ul>
  );
};

export default Notes;
