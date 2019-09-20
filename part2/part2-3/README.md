# [Fullstack part2 | Getting data from server](https://fullstackopen.com/en/part2/getting_data_from_server)

`useEffect`を利用したサンプル。`App.js`で利用している。

```js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './components/Note';

const App = () => {
  const [notes, setNotes] = useState([]);

  const hook = () => {
    console.log('effect');
    axios.get('http://localhost:3001/notes').then(response => {
      console.log('promise fulfilled');
      setNotes(response.data);
    });
  };
  useEffect(hook, []);
  console.log('render', notes.length, 'notes');

  const rows = notes => notes.map(note => <Note key={note.id} note={note} />);

  return (
    <div>
      <h1>Notes</h1>
      <ul>{rows(notes)}</ul>
    </div>
  );
};

export default App;
```

上記のコードで`useEffect`に関連するコードは以下の通り。

```js
const hook = () => {
  console.log('effect');
  axios.get('http://localhost:3001/notes').then(response => {
    console.log('promise fulfilled');
    setNotes(response.data);
  });
};
useEffect(hook, []);
console.log('render', notes.length, 'notes');
```

`useEffect`を利用することで、レンダリング後に第１引数に渡した関数（`hook`）が実行される。

今回の場合、非同期処理でデータを取得し、それを`setNotes(response.data)`で`notes`に代入しているため、再レンダリングがされる。

第２引数に`[]`を渡しているが、こうすることで初回レンダリング時のみ、第１引数に渡した関数が実行される。

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
