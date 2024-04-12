import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { tracks } from "../data/tracks";
import { setTrackIndex, setCurrentTrack, setTimeProgress, setDuration } from '../redux/actions';
import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";

//récupère les props pour la musique
const AudioPlayer = ({ backgroundColor }) => {
  // states
  const [background, setBackground] = useState('transparent');
  const { trackIndex, currentTrack, timeProgress, duration } = useSelector(state => state);


  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    setBackground(backgroundColor);
  }, [backgroundColor]);

 

// Gère la musique suivante
  const handleNext = () => {
    //vérifie que ça ne soit pas la dernière musique de la liste
    if (trackIndex >= tracks.length - 1) {
      //si c'est le cas, retourne à la première musique de la liste
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      // sinon joue la suivante
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
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