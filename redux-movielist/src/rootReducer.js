import { combineReducers } from 'redux';

import toggle from './features/toggle/reducer';
import movies from './features/movies/reducer';

const rootReducer = combineReducers({
  toggle,
  movies,
});

export default rootReducer;
