# Redux & React for Everyone

![reactjs](assets/images/reactjs.png)

[Levelup Tutorials](https://leveluptutorials.com/) |
[Reactjs Docs](https://reactjs.org/docs/getting-started.html) |
[Reduxjs Docs](https://redux.js.org/introduction/getting-started)

## TOC

- [Redux & React for Everyone](#redux--react-for-everyone)
  - [TOC](#toc)
  - [An Introduction to Redux](#an-introduction-to-redux)
  - [Adding Redux & Our First Store](#adding-redux--our-first-store)
  - [Our First Reducer & Actions](#our-first-reducer--actions)
  - [Properties On Actions & In Reducers](#properties-on-actions--in-reducers)
  - [Adding Redux to Our React App](#adding-redux-to-our-react-app)
  - [Writing a Root Reducer](#writing-a-root-reducer)
  - [Redux DevTools](#redux-devtools)
  - [Connecting to React](#connecting-to-react)
  - [Dispatching Actions from Components](#dispatching-actions-from-components)
  - [Action Creators Explained](#action-creators-explained)
  - [Bind Action Creators](#bind-action-creators)
  - [Action Type Constants](#action-type-constants)
  - [Adding Middleware Redux Logger](#adding-middleware-redux-logger)
  - [Redux Thunks and API Calls for Actions](#redux-thunks-and-api-calls-for-actions)
  - [Loading Our Data with componentDidMount](#loading-our-data-with-componentdidmount)
  - [Loading State](#loading-state)
  - [Resetting Our Store & Props in Actions](#resetting-our-store--props-in-actions)
  - [Local Storage](#local-storage)

## An Introduction to Redux

Redux is a predictable state container for JavaScript apps.

It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.

[toc](#toc)

## Adding Redux & Our First Store

_src/App.js_

```JavaScript
import { createStore } from 'redux';
import './App.css';

function App() {
  return <div className='App'></div>;
}

export default App;

const hello = () => ({
  welcome: 'Hello',
});
const store = createStore(hello);

console.log(store.getState());
```

![output1](assets/images/output_1.png)

[toc](#toc)

## Our First Reducer & Actions

_src/App.js_

```javascript
import { createStore } from 'redux';
import './App.css';

function App() {
  return <div className='App'></div>;
}

export default App;

const defaultState = {
  welcome: 'Hi',
  otherState: 'some stuff',
};

// reducer function
const greeting = (state = defaultState, action) => {
  switch (action.type) {
    case 'GREET_ME':
      return { welcome: 'Hello Rick' };
    case 'GREET_WORLD':
      return { welcome: 'Hello World' };
    default:
      return state;
  }
};

const store = createStore(greeting);
console.log(store.getState());

// action object (describer)
store.dispatch({
  type: 'GREET_ME',
});

console.log(store.getState());
```

![first dispatch output](assets/images/first_dispatch_output.png)

- action is an object and describes what the action is supposed to do
- the store then uses its dispatch method to call the action

![before and after](assets/images/before_after_dispatch.png)

- you can see the above image, the reducer function does not modify state, it completely replaces the state tree
- in order to nullify this, you need to spread in the state first in each return from the reducer

_src/App.js_

```javascript
// reducer function
const greeting = (state = defaultState, action) => {
  switch (action.type) {
    case 'GREET_ME':
      return { ...state, welcome: 'Hello Rick' };
    case 'GREET_WORLD':
      return { ...state, welcome: 'Hello World' };
    default:
      return state;
  }
};
```

![modified reducer output](assets/images/spread_state_modified_reducer.png)

[toc](#toc)

## Properties On Actions & In Reducers

_src/App.js_

```javascript
import { createStore } from 'redux';
import './App.css';

function App() {
  return <div className='App'></div>;
}

export default App;

const defaultState = {
  welcome: 'Hi',
  otherState: 'some stuff',
};

// reducer function
const greeting = (state = defaultState, action) => {
  switch (action.type) {
    case 'GREET_NAME':
      return { ...state, welcome: `Hello ${action.name}` };
    case 'GREET_WORLD':
      return { ...state, welcome: 'Hello World' };
    default:
      return state;
  }
};

const store = createStore(greeting);
console.log(store.getState());

const name = 'Rick';

// action object (describer)
store.dispatch({
  type: 'GREET_NAME',
  name,
});

console.log(store.getState());
```

![output](assets/images/output_2.png)

[toc](#toc)

## Adding Redux to Our React App

- `<Provider store={}></Provider>`
  - must wrap your entry point into your app (ex: for this tutorial, `App.js`)
  - this connects Redux to the react app using connect
    - makes grabbing props in and out of your components very easy and dispatching actions
  - has two parameters
    - store
    - children
- create your store and pass it into the provider

_src/App.js_

```javascript
...
import { Provider } from 'react-redux';
import { createStore } from 'redux';
...

//fake store for now
const hello = () => 'hello';
const store = createStore(hello);

const App = () => (
  <Provider store={store}>
    <Router>
      <div className='App'>
        <header className='App-header'>
          <Link to='/'>
            <img src={logo} className='App-logo' alt='logo' />
          </Link>
        </header>
        <Switch>
          <Route exact path='/' component={MoviesList} />
          <Route path='/:id' component={MovieDetail} />
        </Switch>
      </div>
    </Router>
  </Provider>
);
```

[toc](#toc)

## Writing a Root Reducer

- combines all reducers in the app into one reducer
  - `combineReducers`

_src/rootRedcuer.js_

```javascript
import { combineReducers } from 'redux';

import message from './reducer';

const rootReducer = combineReducers({
  message,
});

export default rootReducer;
```

_src/reducer.js_

```javascript
const initialState = {
  messageVisibility: false,
};

export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {
    case 'TOGGLE_MESSAGE':
      return state;

    default:
      return state;
  }
}
```

[toc](#toc)

## Redux DevTools

- download extension for browser
- `npm i redux-devtools-extension`
- in `App.js`
  - `import { composeWithDevTools } from 'redux-devtools-extension';`
  - pass into createStore along with initial state of the store
    - `const store = createStore(rootReducer, {}, composeWithDevTools());`
    - `composeWithDevTools` will not always be the thrid argument passed in `createStore`, if your app will use middleware, then that gets passed in before `composeWithDevTools`

[toc](#toc)

## Connecting to React

- `connect` allows to access your store in any given component easily
  - connects Redux to React

_src/Toggle.js_

```javascript
import React from 'react';
import { connect } from 'react-redux';

const Toggle = ({ messageVisibility }) => (
  <div>
    {messageVisibility && (
      <p>You will be seeing this if redux action is toggled</p>
    )}
    <button>Toggle Me</button>
  </div>
);

const mapStateToProps = (state) => ({
  messageVisibility: state.message.messageVisibility,
});

export default connect(mapStateToProps)(Toggle);
```

- last line connects the component to the Redux store
- now when the app uses the Toggle component, it will be using an enhanced version of it since Toggle has access to the Redux store
- `mapStateToProps()` - allows you to pick which pieces of your store your component will have access to
  - as your app store scales, you don't need every component to access to the entire state tree
  - they should only have access to what they need and nothing more

_src/App.js_

```javascript
/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import logo from './logo.svg';
import './App.css';

import rootReducer from './rootReducer';

import MoviesList from './MoviesList';
import MovieDetail from './MovieDetail';
import Toggle from './Toggle';

const store = createStore(rootReducer, {}, composeWithDevTools());

const App = () => (
  <Provider store={store}>
    <Router>
      <div className='App'>
        <header className='App-header'>
          <Link to='/'>
            <img src={logo} className='App-logo' alt='logo' />
          </Link>
        </header>
        <Toggle />
        <Switch>
          <Route exact path='/' component={MoviesList} />
          <Route path='/:id' component={MovieDetail} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default App;
```

_src/reducer.js_

```javascript
const initialState = {
  messageVisibility: false,
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case 'TOGGLE_MESSAGE':
      return state;
    default:
      return state;
  }
}
```

_src/rootReducer.js_

```javascript
import { combineReducers } from 'redux';

import message from './reducer';

const rootReducer = combineReducers({
  message,
});

export default rootReducer;
```

![react dev tool](assets/images/toggle_reactDevTool.png)![redux dev tool](assets/images/toggle_reduxDevTool.png)

[toc](#toc)

## Dispatching Actions from Components

_src/reducer.js_

```javascript
const initialState = {
  messageVisibility: false,
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case 'TOGGLE_MESSAGE':
      return {
        ...state,
        messageVisibility: !state.messageVisibility,
      };
    default:
      return state;
  }
}
```

_src/Toggle.js_

```javascript
import React from 'react';
import { connect } from 'react-redux';

const Toggle = ({ messageVisibility, dispatch }) => (
  <div>
    {messageVisibility && (
      <p>You will be seeing this if redux action is toggled</p>
    )}
    <button onClick={() => dispatch({ type: 'TOGGLE_MESSAGE' })}>
      Toggle Me
    </button>
  </div>
);

const mapStateToProps = (state) => ({
  messageVisibility: state.message.messageVisibility,
});

export default connect(mapStateToProps)(Toggle);
```

- Toggle has access to dispatch because it is a prop of connect
- in React dev Tools if you select the Toggle component, you will see in the props section `dispatch()`

![react dev tools](assets/images/toggle_reactDevTool.png)

- after adding an `onClick` event to the toggle button, have the arrow function return `dispatch({type: 'TOGGLE_MESSAGE'})`, you will see below in the screen shot, the toggle action fires
  - this tells Redux on this event, dispatch 'TOGGLE_MESSAGE' action
  - the reducer receives an action of 'TOGGLE_MESSAGE'
  - the reducer then looks for that action type
  - once it finds the action type, it will return whatever that type says to return, in this instance initially it just returns state (we will actually have it return new state where it will toggle `messageVisibility` to the opposite of whatever it is currently in state as

![inital toggle action](assets/images/initial_toggle_action.gif)

- modify the reducer to actually return what we want it to return, `{...state, messageVisibility: !state.messageVisibility}`

![update reducer](assets/images/updated_reducer_action.gif)

[toc](#toc)

## Action Creators Explained

[Action Creators](https://redux.js.org/usage/reducing-boilerplate#action-creators)

_src/Toggle.js_

```javascript
import React from 'react';
import { connect } from 'react-redux';

const Toggle = ({ messageVisibility, dispatch }) => (
  <div>
    {messageVisibility && (
      <p>You will be seeing this if redux action is toggled</p>
    )}
    <button onClick={() => dispatch({ type: 'TOGGLE_MESSAGE' })}>
      Toggle Me
    </button>
  </div>
);

const mapStateToProps = (state) => ({
  messageVisibility: state.message.messageVisibility,
});

export default connect(mapStateToProps)(Toggle);
```

- as is right now, Toggle.js does not make much sense because the action and visibility state all live within the toggle component
- the idea behind Redux to save the state in the global store if they are taking place outside the component
  - everytime you need an event to fire, do you want to have to create a function to dispatch the function? (like the `onClick` event in the avoe code)
    - Hint: no
- better to create a function 'toggleMessage' in a separate file, import that function into the component and then call that function instead
  - makes the action reusable

_src/actions.js_

```javascript
export function toggleMessage() {
  return {
    type: 'TOGGLE_MESSAGE',
  };
}
```

_src/Toggle.js_

```javascript
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleMessage } from './actions';

const Toggle = ({ messageVisibility, toggleMessage }) => (
  <div>
    {messageVisibility && (
      <p>You will be seeing this if redux action is toggled</p>
    )}
    <button onClick={toggleMessage}>Toggle Me</button>
  </div>
);

const mapStateToProps = (state) => ({
  messageVisibility: state.message.messageVisibility,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      toggleMessage,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Toggle);
```

[toc](#toc)

## Bind Action Creators

- eliminates the need to use dispatch within component

_src/Toggle.js_

```javascript
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleMessage } from './actions';

const Toggle = ({ messageVisibility, toggleMessage }) => (
  <div className='message'>
    {messageVisibility && (
      <p>You will be seeing this if redux action is toggled</p>
    )}
    <button onClick={toggleMessage}>Toggle Me</button>
  </div>
);

const mapStateToProps = (state) => ({
  messageVisibility: state.message.messageVisibility,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      toggleMessage,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Toggle);
```

`const mapDispatchToProps = (dispatch) => bindActionCreators({ toggleMessage, }, dispatch);` basically takes the function toggleMessage and turns it into a prop - what this does it is bind dispatch (second argument) to the first argument (object of all actions for this particular component) - eliminates the need to pass dispatch into the component - just pass in toggleMessage instead

- In the grand scheme of things, it may add some code, but it is much cleaner and easier to read

[toc](#toc)

## Action Type Constants

_src/actions.js_

```javascript
export const TOGGLE_MESSAGE = 'TOGGLE_MESSAGE';

export function toggleMessage() {
  return {
    type: 'TOGGLE_MESSAGE',
  };
}
```

- used inside of the reducer

_src/reducer.js_

```javascript
import { TOGGLE_MESSAGE } from './actions';

const initialState = {
  messageVisibility: false,
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case TOGGLE_MESSAGE:
      return {
        ...state,
        messageVisibility: !state.messageVisibility,
      };
    default:
      return state;
  }
}
```

- prevent typo bugs and typing errors from going uncaught
- example: if you mistype 'TOGGLE_MESAGE' and did not use an action constant (exactly what we have been doing so far) it would still compile and render your app
- you would not know you have any issue until you tried to use the toggle button
- however, if you use an action constant and then mistype it, it will cause your app to fail instead

[toc](#toc)

## Adding Middleware Redux Logger

`npm i redux-logger`

_src/App.js_

```javascript
/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

import logo from './logo.svg';
import './App.css';

import rootReducer from './rootReducer';

import MoviesList from './MoviesList';
import MovieDetail from './MovieDetail';
import Toggle from './Toggle';

const middleware = [logger];

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

const App = () => (
  <Provider store={store}>
    <Router>
      <div className='App'>
        <header className='App-header'>
          <Link to='/'>
            <img src={logo} className='App-logo' alt='logo' />
          </Link>
        </header>
        <Toggle />
        <Switch>
          <Route exact path='/' component={MoviesList} />
          <Route path='/:id' component={MovieDetail} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default App;
```

![logger output](assets/images/logger_ouput.png)

[toc](#toc)

## Redux Thunks and API Calls for Actions

`npm i redux-thunk`

A thunk is a function that returns a function

Important because it allows us to return a function from an action

_src/actions.js_

```javascript
export const TOGGLE_MESSAGE = 'TOGGLE_MESSAGE';
export const GET_MOVIES = 'GET_MOVIES';

export function toggleMessage() {
  return {
    type: 'TOGGLE_MESSAGE',
  };
}

export function getMovies() {
  return async function (dispatch) {
    const res = await fetch(
      'https://api.themoviedb.org/3/discover/movie?api_key=65e043c24785898be00b4abc12fcdaae&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1'
    );
    const movies = await res.json();
    return dispatch({
      type: 'GET_MOVIES',
      data: movies.results,
    });
  };
}
```

_src/App.js_

```javascript
/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import logo from './logo.svg';
import './App.css';

import rootReducer from './rootReducer';

import MoviesList from './MoviesList';
import MovieDetail from './MovieDetail';
import Toggle from './Toggle';

const middleware = [logger, thunk];

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

const App = () => (
  <Provider store={store}>
    <Router>
      <div className='App'>
        <header className='App-header'>
          <Link to='/'>
            <img src={logo} className='App-logo' alt='logo' />
          </Link>
        </header>
        <Toggle />
        <Switch>
          <Route exact path='/' component={MoviesList} />
          <Route path='/:id' component={MovieDetail} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default App;
```

_src/reducer.js_

```javascript
import { TOGGLE_MESSAGE, GET_MOVIES } from './actions';

const initialState = {
  messageVisibility: false,
  movies: [],
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case TOGGLE_MESSAGE:
      return {
        ...state,
        messageVisibility: !state.messageVisibility,
      };
    case GET_MOVIES:
      return {
        ...state,
        movies: data,
      };
    default:
      return state;
  }
}
```

_src/Toggle.js_

```javascript
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleMessage, getMovies } from './actions';

const Toggle = ({ messageVisibility, toggleMessage, getMovies }) => (
  <div>
    {messageVisibility && (
      <p>You will be seeing this if redux action is toggled</p>
    )}
    <button onClick={toggleMessage}>Toggle Me</button>
    <button onClick={getMovies}>Load Movies</button>
  </div>
);

const mapStateToProps = (state) => ({
  messageVisibility: state.message.messageVisibility,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      toggleMessage,
      getMovies,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Toggle);
```

[toc](#toc)

## Loading Our Data with componentDidMount

_src/features/movies/MoviesList.js_

```javascript
/* eslint react/no-did-mount-set-state: 0 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import Movie from './Movie';
import { getMovies } from './actions';

class MoviesList extends PureComponent {
  componentDidMount() {
    const { getMovies } = this.props;
    getMovies();
    // this.props.getMovies();
  }

  render() {
    const { movies } = this.props;
    return (
      <MovieGrid>
        {movies.map(movie => <Movie key={movie.id} movie={movie} />)}
      </MovieGrid>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies.movies,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getMovies,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;
`;
```

[toc](#toc)

## Loading State

_src/features/movies/reducer.js_

```javascript
import { GET_MOVIES } from './actions';

const initialState = {
  movies: [],
  moviesLoaded: false,
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case GET_MOVIES:
      return { ...state, movies: data, moviesLoaded: true };
    default:
      return state;
  }
}
```

_src/features/movies/MoviesList.js

```javascript
/* eslint react/no-did-mount-set-state: 0 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styled from 'styled-components';
import Movie from './Movie';
import { getMovies } from './actions';

class MoviesList extends PureComponent {
  componentDidMount() {
    const { getMovies, isLoaded } = this.props;
    if (!isLoaded) {
      getMovies();
    }
  }

  render() {
    const { movies, isLoaded } = this.props;
    if (!isLoaded) return <h1 className='loading'>Loading...</h1>;
    return (
      <MovieGrid>
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </MovieGrid>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies.movies,
  isLoaded: state.movies.moviesLoaded,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMovies,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;
`;
```

[toc](#toc)

## Resetting Our Store & Props in Actions

_src/features/movies/reducer.js_

```javascript
import { GET_MOVIES, GET_MOVIE, RESET_MOVIE } from './actions';

const initialState = {
  movies: [],
  movie: {},
  moviesLoaded: false,
  movieLoaded: false,
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case GET_MOVIES:
      return { ...state, movies: data, moviesLoaded: true };
    case GET_MOVIE:
      return { ...state, movie: data, movieLoaded: true };
    case RESET_MOVIE:
      return { ...state, movie: {}, movieLoaded: false };
    default:
      return state;
  }
}
```

_src/features/movies/actions.js_

```javascript
export const GET_MOVIES = 'GET_MOVIES';
export const GET_MOVIE = 'GET_MOVIE';
export const RESET_MOVIE = 'RESET_MOVIE';

export function getMovies() {
  return async function (dispatch) {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
    );
    const movies = await res.json();
    return dispatch({
      type: 'GET_MOVIES',
      data: movies.results,
    });
  };
}
export function getMovie(id) {
  return async function (dispatch) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    const movie = await res.json();
    return dispatch({
      type: 'GET_MOVIE',
      data: movie,
    });
  };
}

export function resetMovie() {
  return {
    type: 'RESET_MOVIE',
  };
}
```

_src/features/movies/MovieDetail.js_

```javascript
/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import { Poster } from './Movie';
import { getMovie, resetMovie } from './actions';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

class MovieDetail extends Component {
  async componentDidMount() {
    const { getMovie, match } = this.props;
    getMovie(match.params.id);
  }

  componentWillUnmount() {
    const { resetMovie } = this.props;
    resetMovie();
  }

  render() {
    const { movie } = this.props;
    if (!movie.id) return null;
    return (
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
        <MovieInfo>
          <Overdrive id={`${movie.id}`}>
            <Poster
              src={`${POSTER_PATH}${movie.poster_path}`}
              alt={movie.title}
            />
          </Overdrive>
          <div>
            <h1>{movie.title}</h1>
            <h3>{movie.release_date}</h3>
            <p>{movie.overview}</p>
          </div>
        </MovieInfo>
      </MovieWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  movie: state.movies.movie,
  isLoaded: state.movies.movieLoaded,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMovie,
      resetMovie,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);

const MovieWrapper = styled.div`
  position: relative;
  padding-top: 50vh;
  background: url(${(props) => props.backdrop}) no-repeat;
  background-size: cover;
`;

const MovieInfo = styled.div`
  background: white;
  text-align: left;
  padding: 2rem 10%;
  display: flex;
  > div {
    margin-left: 20px;
  }
  img {
    position: relative;
    top: -5rem;
  }
`;
```

[toc](#toc)

## Local Storage

`npm i redux-localstorage-simple`

- not the only package that can be used
- persists redux store to local storage

_src/App.js_

```javascript
/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { save, load } from 'redux-localstorage-simple';

import logo from './logo.svg';
import './App.css';

import rootReducer from './rootReducer';

import MoviesList from './features/movies/MoviesList';
import MovieDetail from './features/movies/MovieDetail';
import Toggle from './features/toggle/Toggle';

const middleware = [logger, thunk];

const store = createStore(
  rootReducer,
  load(),
  composeWithDevTools(applyMiddleware(...middleware, save()))
);

const App = () => (
  <Provider store={store}>
    <Router>
      <div className='App'>
        <header className='App-header'>
          <Link to='/'>
            <img src={logo} className='App-logo' alt='logo' />
          </Link>
        </header>
        <Toggle />
        <Switch>
          <Route exact path='/' component={MoviesList} />
          <Route path='/:id' component={MovieDetail} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default App;
```

_src/features/movies/reducer.js_

```javascript
import { GET_MOVIES, GET_MOVIE, RESET_MOVIE } from './actions';

const initialState = {
  movies: [],
  movie: {},
  moviesLoaded: false,
  movieLoaded: false,
  moviesLoadedAt: null,
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: data,
        moviesLoaded: true,
        moviesLoadedAt: new Date(),
      };
    case GET_MOVIE:
      return { ...state, movie: data, movieLoaded: true };
    case RESET_MOVIE:
      return { ...state, movie: {}, movieLoaded: false };
    default:
      return state;
  }
}
```

_src/features/movies/MoviesList.js_

```javascript
/* eslint react/no-did-mount-set-state: 0 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styled from 'styled-components';
import Movie from './Movie';
import { getMovies } from './actions';

class MoviesList extends PureComponent {
  componentDidMount() {
    const { getMovies, isLoaded, moviesLoadedAt } = this.props;
    const oneHour = 60 * 60 * 1000;
    if (!isLoaded || new Date() - new Date(moviesLoadedAt) > oneHour) {
      getMovies();
    }
  }

  render() {
    const { movies, isLoaded } = this.props;
    // TODO: add loading spinner component
    if (!isLoaded) return <h1 className='loading'>Loading...</h1>;
    return (
      <MovieGrid>
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </MovieGrid>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies.movies,
  isLoaded: state.movies.moviesLoaded,
  moviesLoadedAt: state.movies.moviesLoadedAt,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMovies,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;
`;
```

[toc](#toc)
