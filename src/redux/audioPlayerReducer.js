import { tracks } from "../data/tracks";
import { SET_TRACK_INDEX, SET_CURRENT_TRACK, SET_TIME_PROGRESS, SET_DURATION } from './actions';

const initialState = {
    trackIndex: 0,
    currentTrack: tracks[0], 
    timeProgress: 0,
    duration: 0,
  };
  
  const audioPlayerReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_TRACK_INDEX:
        return {
          ...state,
          trackIndex: action.payload,
          currentTrack: tracks[action.payload],
        };
      case SET_CURRENT_TRACK:
        return {
          ...state,
          currentTrack: action.payload,
        };
      case SET_TIME_PROGRESS:
        return {
          ...state,
          timeProgress: action.payload,
        };
      case SET_DURATION:
        return {
          ...state,
          duration: action.payload,
        };
      default:
        return state;
    }
  };

export default audioPlayerReducer;
