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

[toc](#toc)

## Properties On Actions & In Reducers

[toc](#toc)

## Adding Redux to Our React App

[toc](#toc)

## Writing a Root Reducer

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
