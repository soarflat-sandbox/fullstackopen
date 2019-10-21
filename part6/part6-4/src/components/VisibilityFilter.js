import React from 'react';
import { filterChange } from '../reducers/filterReducer';

const VisibilityFilter = ({ store }) => {
  const { filter } = store.getState();
  const filterClicked = value => () => {
    store.dispatch(filterChange(value));
  };

  return (
    <div>
      all
      <input
        type="radio"
        name="filter"
        checked={filter === 'ALL'}
        onChange={filterClicked('ALL')}
      />
      important
      <input
        type="radio"
        name="filter"
        checked={filter === 'IMPORTANT'}
        onChange={filterClicked('IMPORTANT')}
      />
      nonimportant
      <input
        type="radio"
        name="filter"
        checked={filter === 'NONIMPORTANT'}
        onChange={filterClicked('NONIMPORTANT')}
      />
    </div>
  );
};

export default VisibilityFilter;
