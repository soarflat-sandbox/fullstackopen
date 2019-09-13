import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

const Statistic = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = all > 0 ? (good * 1 + bad * -1) / all : 0;
  const positive = all > 0 ? good / all : 0;

  if (all === 0) {
    return <h3>No feedback given</h3>;
  }

  return (
    <>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={all} />
      <Statistic text="average" value={average} />
      <Statistic text="positive" value={positive} />
    </>
  );
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => {
    setGood(good + 1);
  };
  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleClickBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button text="good" handleClick={handleClickGood} />
        <Button text="neutral" handleClick={handleClickNeutral} />
        <Button text="bad" handleClick={handleClickBad} />
      </div>
      <div>
        <h2>statistics</h2>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
