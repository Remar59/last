import { createStore  } from 'redux';
import audioPlayerReducer from './audioPlayerReducer';


// création du store
const store = createStore (audioPlayerReducer, window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
