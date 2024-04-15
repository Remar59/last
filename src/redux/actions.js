export const setTrackIndex = index => ({
    type: SET_TRACK_INDEX,
    payload: index,
  });
  
  export const setCurrentTrack = track => ({
    type: SET_CURRENT_TRACK,
    payload: track,
  });
  
  export const setTimeProgress = time => ({
    type: SET_TIME_PROGRESS,
    payload: time,
  });
  
  export const setDuration = duration => ({
    type: SET_DURATION,
    payload: duration,
  });

export const SET_TRACK_INDEX = 'SET_TRACK_INDEX';
export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';
export const SET_TIME_PROGRESS = 'SET_TIME_PROGRESS';
export const SET_DURATION = 'SET_DURATION';