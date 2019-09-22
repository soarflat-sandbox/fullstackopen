import React from 'react';

const Counter = ({ counter }) => (
  <>
    <div>{counter.value}</div>
    <button onClick={counter.increse}>plus</button>
    <button onClick={counter.decrese}>minus</button>
    <button onClick={counter.zero}>zero</button>
  </>
);

export default Counter;
