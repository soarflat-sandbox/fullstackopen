import filterReducer, { filterChange } from './filterReducer';

describe('filterReducer', () => {
  test('returns new state with action SET_FILTER', () => {
    const state = [];
    const action = filterChange('IMPORTANT');
    const newState = filterReducer(state, action);

    expect(newState).toBe('IMPORTANT');
  });
});
