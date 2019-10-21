import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import NewNote from './components/NewNote';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';
import noteService from './services/notes';
import { initializeNotes } from './reducers/noteReducer';

const App = props => {
  useEffect(() => {
    noteService.getAll().then(notes => {
      props.initializeNotes(notes);
    });
  });

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default connect(
  null,
  {
    initializeNotes
  }
)(App);
