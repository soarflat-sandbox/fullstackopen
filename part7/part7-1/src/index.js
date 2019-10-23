import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

const Home = () => (
  <div>
    {' '}
    <h2>TKTL notes app</h2>{' '}
  </div>
);

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div>
        <strong>{note.important ? 'important' : ''}</strong>
      </div>
    </div>
  );
};

const Notes = ({ notes }) => {
  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Users = () => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
);

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

// withRouter を利用することで、コンポーネント内のロジックからページ遷移ができる。
// 引数で渡しているコンポーネントから history オブジェクトに props.history でアクセスできる。
Login = withRouter(Login);

function App() {
  const [notes] = useState([
    {
      id: 1,
      content: 'HTML on helppoa',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Selain pystyy suorittamaan vain javascriptiä',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
      important: true,
      user: 'Arto Hellas'
    }
  ]);

  const [user, setUser] = useState(null);

  const login = user => {
    setUser(user);
  };

  const noteById = id => notes.find(note => note.id === Number(id));

  const padding = { padding: 5 };

  return (
    <div>
      <Router>
        <div>
          <div>
            <Link style={padding} to="/">
              home
            </Link>
            <Link style={padding} to="/notes">
              notes
            </Link>
            <Link style={padding} to="/users">
              users
            </Link>
            {user ? <em>{user} logged in</em> : <Link to="/login">login</Link>}
          </div>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/notes" render={() => <Notes notes={notes} />} />
          <Route
            path="/notes/:id"
            render={({ match }) => <Note note={noteById(match.params.id)} />}
          />
          <Route
            path="/users"
            render={() => (user ? <Users /> : <Redirect to="/login" />)}
          />
          <Route path="/login" render={() => <Login onLogin={login} />} />
        </div>
      </Router>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
