import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tracks } from "../data/tracks";
import { setTrackIndex, setCurrentTrack, setTimeProgress, setDuration } from '../redux/actions';
import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";

//récupère les props pour le background
const AudioPlayer = ({ backgroundColor }) => {

  // states
  const { trackIndex, currentTrack, timeProgress, duration } = useSelector(state => state);
const dispatch = useDispatch();

  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  //appelle directement le backgroundcolor
  useEffect(() => {
}, [backgroundColor]);

 

const handleNext = () => {
  const nextIndex = trackIndex >= tracks.length - 1 ? 0 : trackIndex + 1;
  dispatch(setTrackIndex(nextIndex));
  // No need to call setCurrentTrack as the reducer handles updating the currentTrack
};

  

  return (
    <>
      <div className="audio-player" style={{ backgroundColor: currentTrack.color }}>
        <div className="inner">
          <div className="upperInner">
            <DisplayTrack
              {...{
                currentTrack,
                audioRef,
                setDuration,
                progressBarRef,
                handleNext,
              }}
            />
            <Controls
              {...{
                audioRef,
                progressBarRef,
                duration,
                setTimeProgress,
                tracks,
                trackIndex,
                setTrackIndex,
                setCurrentTrack,
                handleNext,
              }}
            />
          </div>
          <ProgressBar
            {...{ progressBarRef, audioRef, timeProgress, duration }}
          />
        </div>
      </div>
    </>
  );
};
export default AudioPlayer;