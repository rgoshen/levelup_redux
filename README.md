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

[toc](#toc)

## COnnecting to React

[toc](#toc)

## Dispatching Actions from Components

[toc](#toc)

## Action Creators Explained

[toc](#toc)

## Bind Action Creators

[toc](#toc)

## Action Type Constants

[toc](#toc)

## Adding Middleware Redux Logger

[toc](#toc)

## Redux Thunks and API Calls for Actions

[toc](#toc)

## Project Organization

[toc](#toc)

## Loading Our Data with componentDidMount

[toc](#toc)

## Loading State

[toc](#toc)

## Resetting Our Store & Props in Actions

[toc](#toc)

## Local Storage

[toc](#toc)
