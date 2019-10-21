import React from 'react';
import { connect } from 'react-redux';
import { createNote } from '../reducers/noteReducer';

const NewNote = props => {
  const addNote = event => {
    event.preventDefault();

    const content = event.target.note.value;
    props.createNote(content);
    event.target.note.value = '';
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" autoComplete="off" />
      <button type="submit">add</button>
    </form>
  );
};

export default connect(
  null,
  { createNote }
)(NewNote);
