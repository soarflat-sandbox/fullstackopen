# [GraphQL-server](https://fullstackopen.com/en/part8/graph_ql_server)

Appolo Server を利用して GraphQL を実行するサンプル。

## Usage

```shell
$ npm i
$ npm start
```

## 今回のサンプルコードでやっていること

### レスポンスデータの定義

```js
let persons = [
  {
    name: 'Arto Hellas',
    phone: '040-123543',
    street: 'Tapiolankatu 5 A',
    city: 'Espoo',
    id: '3d594650-3436-11e9-bc57-8b80ba54c431'
  },
  {
    name: 'Matti Luukkainen',
    phone: '040-432342',
    street: 'Malminkaari 10 A',
    city: 'Helsinki',
    id: '3d599470-3436-11e9-bc57-8b80ba54c431'
  },
  {
    name: 'Venla Ruuska',
    street: 'Nallemäentie 22 C',
    city: 'Helsinki',
    id: '3d599471-3436-11e9-bc57-8b80ba54c431'
  }
];
```

### スキーマの定義

```js
const typeDefs = gql`
  enum YesNo {
    YES
    NO
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(name: String!, phone: String!): Person
  }

  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }
`;
```

### リゾルバの定義

リゾルバはクエリに対して、対応するデータを返す関数。以下はリゾルバの例。

```js
const resolvers = {
  Query: {
    findPerson: (root, args) => persons.find(p => p.name === args.name)
  }
}
```

クエリは以下のようになる。

```gql
query {
  findPerson(name: 'Venla Ruuska') {
    phone
    city
    street
    id
  }
}
```

### Apollo Server を起動

```js
const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
```
