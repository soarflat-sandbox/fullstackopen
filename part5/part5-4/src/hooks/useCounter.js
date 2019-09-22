import { useState } from 'react';

const useCounter = () => {
  const [value, setValue] = useState(0);

  const increse = () => {
    setValue(value + 1);
  };

  const decrese = () => {
    setValue(value - 1);
  };

  const zero = () => {
    setValue(0);
  };

  return {
    value,
    increse,
    decrese,
    zero
  };
};

export default useCounter;
