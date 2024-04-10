// src/redux/store.js
import { createStore  } from 'redux';
import audioPlayerReducer from './audioPlayerReducer';


// Create Redux store
const store = createStore (audioPlayerReducer);

export default store;
