import React from 'react';
import { connect } from 'react-redux';
import Note from './Note';
import { toggleImportanceOf } from '../reducers/noteReducer';

const Notes = props => {
  const toggleImportance = id => () => {
    props.toggleImportanceOf(id);
  };

  return (
    <ul>
      {props.visibleNotes.map(note => (
        <Note
          key={note.id}
          note={note}
          handleClick={toggleImportance(note.id)}
        />
      ))}
    </ul>
  );
};

// Store全体を受け取り、コンポーネントに渡すべきStoreを選択する
// このような関数をSelectorsという。
const notesToShow = ({ notes, filter }) => {
  if (filter === 'ALL') {
    return notes;
  }

  return filter === 'IMPORTANT'
    ? notes.filter(note => note.important)
    : notes.filter(note => !note.important);
};

const mapStateToProps = state => {
  return {
    visibleNotes: notesToShow(state)
  };
};

const mapDispatchToProps = {
  toggleImportanceOf
};

const ConnectedNotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);
export default ConnectedNotes;
