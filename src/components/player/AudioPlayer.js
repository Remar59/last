import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tracks } from "../../data/tracks";
import { setTrackIndex, setTimeProgress, setDuration } from '../../redux/actions';
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