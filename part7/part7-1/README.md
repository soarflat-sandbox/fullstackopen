# [React-router](https://fullstackopen.com/en/part7/react_router)

React Router を利用したサンプル。

## セットアップ

```shell
$ yarn start
```

## アプリケーションを development mode で起動

```shell
$ yarn start
```

## React Router に関するメモ

### withRouter

`withRouter`を利用することで、コンポーネント内のロジックからページ遷移ができる。

以下は利用例。

```jsx
let Login = props => {
  const onSubmit = event => {
    event.preventDefault();
    props.onLogin('mluukkai');
    // <Redirect to="/" /> と同じ
    props.history.push('/');
  };

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username: <input />
        </div>
        <div>
          password: <input type="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

Login = withRouter(Login);
```

`withRouter(Login)`で、`Login`コンポーネントから`props.history`で`history`オブジェクトにアクセスできる。

`history`オブジェクトは直近の`<Route>`のものにアクセスできる。今回の場合、以下のように`<Login>`を描画する`<Route>`のものにアクセスしている。

```jsx
<Route path="/login" render={() => <Login onLogin={login} />} />
```
