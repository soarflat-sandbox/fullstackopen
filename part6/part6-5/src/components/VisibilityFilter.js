import React from 'react';
import { connect } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

const VisibilityFilter = props => {
  const filterClicked = value => () => {
    props.filterChange(value);
  };

  return (
    <div>
      all
      <input
        type="radio"
        name="filter"
        checked={props.filter === 'ALL'}
        onChange={filterClicked('ALL')}
      />
      important
      <input
        type="radio"
        name="filter"
        checked={props.filter === 'IMPORTANT'}
        onChange={filterClicked('IMPORTANT')}
      />
      nonimportant
      <input
        type="radio"
        name="filter"
        checked={props.filter === 'NONIMPORTANT'}
        onChange={filterClicked('NONIMPORTANT')}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    filter: state.filter
  };
};

const mapDispatchToProps = {
  filterChange
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibilityFilter);
