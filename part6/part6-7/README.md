# [Asynchronous actions and redux thunk | Communicating with server in a redux application](https://fullstackopen.com/en/part6/communicating_with_server_in_a_redux_application#asynchronous-actions-and-redux-thunk)

React + Redux の利用したシンプルなノートアプリケーション。

[part6-6](../part6-6)に以下の機能を追加したもの。

```jsx
const App = props => {
  useEffect(() => {
    noteService.getAll().then(notes => {
      props.initializeNotes(notes);
    });
  });

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};
```

これだとあまりイケてないため、非同期 Action を作成し、以下のように ActionCreator を呼び出すだけでサーバーとの通信ができるように（コンポーネントと非同期通信のロジックが分離するように）変更する。

```jsx
const App = props => {
  useEffect(() => {
    props.initializeNotes();
  });

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};
```

## セットアップ

```shell
$ yarn start
```

## アプリケーションを development mode で起動

```shell
$ yarn start
```

## テストを実行

```shell
$ yarn test
```

## 非同期 Action を作成するまでの流れ

- `redux-thunk`を読み込む
- 非同期 Action を作成する

### `redux-thunk`を読み込む

非同期 Action を作成するためには、[`redux-thunk`](https://github.com/reduxjs/redux-thunk)という Middleware を利用する。

Middleware なので、Redux の`applyMiddleware`も必要。

以下のように`createStore()`関数に渡せば、非同期 Action を作成できるようになる。

```jsx
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import noteReducer from './reducers/noteReducer';
import filterReducer from './reducers/filterReducer';

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
```

### 非同期 Action を作成する

以下は通常の AcionCreator。

```js
export const initializeNotes = notes => {
  return {
    type: 'INIT_NOTES',
    data: notes
  };
};
```

これは非同期 Action にするためには、以下のようにすれば良い。

```js
export const initializeNotes = dispatch => {
  return async dispatch => {
    const notes = await noteService.getAll();
    dispatch({
      type: 'INIT_NOTES',
      data: notes
    });
  };
};
```

`dispatch`を引数にとり、非同期で`dispatch()`を実行する`async`関数を返す。
