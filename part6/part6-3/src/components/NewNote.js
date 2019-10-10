import React from 'react';
import { createNote } from '../reducers/noteReducer';

const NewNote = ({ store }) => {
  const addNote = event => {
    event.preventDefault();

    const content = event.target.note.value;
    store.dispatch(createNote(content));
    event.target.note.value = '';
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" autoComplete="off" />
      <button type="submit">add</button>
    </form>
  );
};

export default NewNote;
