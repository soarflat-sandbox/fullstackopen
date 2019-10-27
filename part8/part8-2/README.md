# [React and GraphQL](https://fullstackopen.com/en/part8/react_and_graph_ql)

React と GraphQL を利用したサンプル。

## Usage

```shell
$ yarn
$ yarn dev
```

## GraphQL を利用するために必要なパッケージ

- [apollo-boost](apollo-boost): Apollo Client のセットアップに必要なすべてを含むパッケージ
- [graphql](https://github.com/graphql/graphql-js): JavaScript で GraphQL を利用する（GraphQL クエリを解析する）ためのパッケージ

## React と GraphQL を併用するために必要なパッケージ

- [@apollo/react-hooks](https://www.apollographql.com/docs/react/api/react-hooks/): React hooks をベースとして、クライアントとコンポーネントを接続するためのパッケージ
  - [Apollo Client, now with React Hooks](https://blog.apollographql.com/apollo-client-now-with-react-hooks-676d116eeae2)

## サンプルでやっていること

- Apollo クライアント生成し、React に接続
- `useQuery`フックを利用し、GraphQL データをフェッチ
- `useMutation`フックを利用し、GraphQL データを更新

### Apollo クライアント生成し、React に接続

`src/index.js`（一部のコードだけ抜粋）

Apollo クライアント生成する。これで、データのフェッチを開始できる状態になる。

```js
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  // GraphQLサーバーのエンドポイント
  uri: 'http://localhost:4000/graphql'
});
```

そして、`ApolloProvider` を利用し、 Apollo クライアントを React に接続する。

```js
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  // GraphQLサーバーのエンドポイント
  uri: 'http://localhost:4000/graphql'
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
```

こうすることで、`App`コンポーネントツリーのどこからでもクライアントにアクセスできる。

#### クライアントへのアクセス方法

以下のように`useApolloClient`フックを利用すれば、クライアントにアクセスできる。

```js
import { useApolloClient } from '@apollo/react-hooks';

const Component = () => {
  const client = useApolloClient();
};
```

### `useQuery`フックを利用し、GraphQL データをフェッチ

- 参考: [Queries Learn how to fetch data with the useQuery hook](https://www.apollographql.com/docs/react/data/queries/)

`src/App.js`（一部のコードだけ抜粋）

`gql()`関数でラップされた GraphQL クエリを`useQuery()`に渡すことで、コンポーネントがレンダリングしたときに`useQuery`フックが実行され、`persons`には結果のオブジェクトが返却される。

```js
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const ALL_PERSONS = gql`
  {
    allPersons {
      name
      phone
      id
    }
  }
`;

function App() {
  const persons = useQuery(ALL_PERSONS);

  return (
    <div>
      <Persons result={persons} />
    </div>
  );
}
```

そのため、`persons`には[これらのデータ](https://www.apollographql.com/docs/react/api/react-hooks/#result)が含まれる。

`persons`を渡している`Persons`コンポーネントは以下のようになっている。

`persons.loading`と`persons.result`を利用している。

```js
const Persons = ({ result }) => {
  if (result.loading) {
    return <div>loading...</div>;
  }

  const persons = result.data.allPersons;

  return (
    <div>
      <h2>Persons</h2>
      {persons.map(p => (
        // ...
      ))}
    </div>
  );
};
```

### `useMutation`フックを利用し、GraphQL データを更新

Mutation を実行するために、まずは`useMutation()`を実行する。

```js
const CREATE_PERSON = gql`
  mutation createPerson(
    $name: String!
    $street: String!
    $city: String!
    $phone: String
  ) {
    addPerson(name: $name, street: $street, city: $city, phone: $phone) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`;

const Component = () => {
  const [addPerson] = useMutation(CREATE_PERSON, {
    onError: handleError,
    // Mutaion 実行後にALL_PERSONSクエリを再取得する
    refetchQueries: [{ query: ALL_PERSONS }]
  });
};
```

`useMutation()`は以下をタプルで返す。

```js
[
  `Mutaionを実行するためのMutation関数`,
  `現在のミューテーション実行のステータスを表すフィールドを持つオブジェクト`
];
```

そのため、`addPerson`は Mutaion を実行するための Mutation 関数。
