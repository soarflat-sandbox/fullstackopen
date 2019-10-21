# [connect | Many reducers, connect](https://fullstackopen.com/en/part6/many_reducers_connect#connect)

React + Redux の利用したシンプルなノートアプリケーション。

[part6-4](../part6-4)時点では、以下のようにそれぞれのコンポーネントに props で Redux Store を渡している。

```jsx
const App = props => {
  const store = props.store;

  return (
    <div>
      <NewNote store={store} />
      <VisibilityFilter store={store} />
      <Notes store={store} />
    </div>
  );
};
```

これではイケてないため、[React Redux](https://github.com/reduxjs/react-redux)を利用して、コンポーネントから直接 Redux Store にアクセスするように変更したもの。

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

## コンポーネントから直接 Redux Store にアクセスするまでの流れ

- `Provider`でコンポーネントをネストする
- `connect()`関数で コンポーネント と Redux Store を接続する

### `Provider`でコンポーネントをネストする

まずは[`Provider`](https://github.com/reduxjs/react-redux/blob/master/docs/api/Provider.md#provider)を利用して、コンポーネントをネストする。

```jsx
// ...

import { Provider } from 'react-redux';

// ...

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

このようにすれば、ネストされたコンポーネント（`App`）で、`connect()`関数を利用して Redux Store にアクセスできる。

### `connect()`関数で コンポーネント と Redux Store を接続する

試しに、以下の`Notes.js`を`connect()`関数を利用した記述に変更する。

```jsx
import React from 'react';
import { toggleImportanceOf } from '../reducers/noteReducer';
import Note from './Note';

const Notes = ({ store }) => {
  const { notes, filter } = store.getState();
  const notesToShow = () => {
    if (filter === 'ALL') {
      return notes;
    }
    return filter === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important);
  };
  const toggleImportance = id => () => {
    store.dispatch(toggleImportanceOf(id));
  };

  return (
    <ul>
      {notesToShow().map(note => (
        <Note
          key={note.id}
          note={note}
          handleClick={toggleImportance(note.id)}
        />
      ))}
    </ul>
  );
};

export default Notes;
```

`connect()`関数を利用すると以下のようになる。

```jsx
import React from 'react';
import { connect } from 'react-redux';
import { toggleImportanceOf } from '../reducers/noteReducer';
import Note from './Note';

const Notes = props => {
  const toggleImportance = id => () => {
    props.visibleNotes.toggleImportanceOf(id);
  };

  return (
    <ul>
      {props..map(note => (
        <Note
          key={note.id}
          note={note}
          handleClick={toggleImportance(note.id)}
        />
      ))}
    </ul>
  );
};

const notesToShow = ({ notes, filter }) => {
  if (filter === 'ALL') {
    return notes;
  }
  return filter === 'IMPORTANT'
    ? notes.filter(note => note.important)
    : notes.filter(note => !note.important);
};

const mapStateToProps = state => {
  return {
    visibleNotes: notesToShow(state)
  };
};

const mapDispatchToProps = {
  toggleImportanceOf
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);
```

上記のコードでは、以下の箇所で`connect()`関数を利用し、コンポーネントと Redux Store を接続している。

```jsx
const mapStateToProps = state => {
  return {
    visibleNotes: notesToShow(state)
  };
};

const mapDispatchToProps = {
  toggleImportanceOf
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);
```

`connect()`関数に`mapStateToProps`と`mapDispatchToProps`を渡しているが、それぞれコンポーネントから`props`でアクセスできる。

```jsx
const Notes = props => {
  const toggleImportance = id => () => {
    props.visibleNotes.toggleImportanceOf(id);
  };

  return (
    <ul>
      {props..map(note => (
        <Note
          key={note.id}
          note={note}
          handleClick={toggleImportance(note.id)}
        />
      ))}
    </ul>
  );
};
```
