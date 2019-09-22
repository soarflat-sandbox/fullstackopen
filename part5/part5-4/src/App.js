import React, { useState } from 'react';

import Counter from './components/Counter';
import useCounter from './hooks/useCounter';
import useField from './hooks/useField';

const App = () => {
  const counter = useCounter();
  const name = useField('text');
  const born = useField('date');
  const height = useField('number');

  if (counter.value === 0) {
    const [value, setValue] = useState('');
  }

  return (
    <div>
      <Counter counter={counter} />
      <div>
        <form>
          name:
          <input {...name} />
          <br />
          birthdate:
          <input {...born} />
          <br />
          height:
          <input {...height} />
        </form>
      </div>
    </div>
  );
};

export default App;
