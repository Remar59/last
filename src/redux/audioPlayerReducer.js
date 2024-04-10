import { tracks } from "../data/tracks";

const initialState = {
  playing: false,
  currentTrackIndex: 0,
  volume: 1,
  repeat: false,
  playlist: tracks,
};

function audioPlayerReducer(state = initialState, action) {
  switch (action.type) {
    case "PLAY_TRACK":
      return { ...state, playing: true };
    case "SET_CURRENT_TRACK":
      return { ...state, currentTrackIndex: action.payload };
    case "PAUSE_TRACK":
      return { ...state, playing: false };
    case "NEXT_TRACK":
      return {
        ...state,
        currentTrackIndex: (state.currentTrackIndex + 1) % tracks.length, // Loop back to 0 at the end
        playing: true, // Optionally auto-play the next track
      };

    case "PREVIOUS_TRACK":
      return {
        ...state,
        currentTrackIndex:
          (state.currentTrackIndex - 1 + tracks.length) % tracks.length, // Loop to the end if at 0
        playing: true, // Optionally auto-play the previous track
      };
    case "SET_VOLUME":
      return { ...state, volume: action.payload };
    case "TOGGLE_REPEAT":
      return { ...state, repeat: !state.repeat };
    default:
      return state;
    case "STOP_PLAYBACK":
      return {
        ...state,
        playing: false,
      };
  }
}

export default audioPlayerReducer;
