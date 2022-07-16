import { createStore } from "redux";
import "./App.css";

function App() {
  return <div className="App"></div>;
}

export default App;

const defaultState = {
  welcome: "Hi",
  otherState: "some stuff",
};

// reducer function
const greeting = (state = defaultState, action) => {
  switch (action.type) {
    case "GREET_ME":
      return { ...state, welcome: "Hello Rick" };
    case "GREET_WORLD":
      return { ...state, welcome: "Hello World" };
    default:
      return state;
  }
};

const store = createStore(greeting);
console.log(store.getState());

// action object (describer)
store.dispatch({
  type: "GREET_ME",
});

console.log(store.getState());
