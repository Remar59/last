export const stopPlayback = () => ({
  type: "STOP_PLAYBACK",
});

export const playTrack = () => ({
  type: "PLAY_TRACK",
});

export const setCurrentTrack = (trackIndex) => ({
  type: "SET_CURRENT_TRACK",
  payload: trackIndex,
});
