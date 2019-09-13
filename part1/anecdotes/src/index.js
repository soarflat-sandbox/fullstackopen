import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const [mostVotes, setMostVotes] = useState(0);

  const handleClickNext = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleClickVote = selected => () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
    setMostVotes(
      // 配列から最大値のインデックスを取得する
      newPoints.findIndex(point => point === Math.max(...newPoints))
    );
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={handleClickVote(selected)}>vote</button>
      <button onClick={handleClickNext}>next anecdote</button>
      <h1>Anecdote with most vote</h1>
      <p>{anecdotes[mostVotes]}</p>
      <p>has {points[mostVotes]} votes</p>
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
