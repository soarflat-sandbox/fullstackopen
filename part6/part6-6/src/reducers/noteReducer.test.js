import noteReducer from './noteReducer';
import deepFreeze from 'deep-freeze';

describe('noteReducer', () => {
  test('returns new state with action NEW_NOTE', () => {
    const state = [];
    const action = {
      type: 'NEW_NOTE',
      data: {
        content: 'the app state is in redux store',
        important: true,
        id: 1
      }
    };

    deepFreeze(state);
    const newState = noteReducer(state, action);
    console.log('newState', newState);

    expect(newState.length).toBe(1);
    // newState 配列に action.data が含まれているかどうか
    expect(newState).toContainEqual(action.data);
  });

  test('returns new state with action INIT_NOTES', () => {
    const state = [];
    const action = {
      type: 'INIT_NOTES',
      data: [
        {
          content: 'the app state is in redux store',
          important: true,
          id: 1
        },
        {
          content: 'state changes are made with actions',
          important: false,
          id: 2
        }
      ]
    };

    deepFreeze(state);
    const newState = noteReducer(state, action);

    expect(newState.length).toBe(2);
    expect(newState).toEqual(action.data);
  });

  test('returns new state with action TOGGLE_IMPORTANCE', () => {
    const state = [
      {
        content: 'the app state is in redux store',
        important: true,
        id: 1
      },
      {
        content: 'state changes are made with actions',
        important: false,
        id: 2
      }
    ];
    const action = {
      type: 'TOGGLE_IMPORTANCE',
      data: {
        id: 2
      }
    };

    deepFreeze(state);
    const newState = noteReducer(state, action);

    expect(newState.length).toBe(2);
    // newState 配列に state[0] が含まれているかどうか
    expect(newState).toContainEqual(state[0]);

    expect(newState).toContainEqual({
      content: 'state changes are made with actions',
      important: true,
      id: 2
    });
  });
});
