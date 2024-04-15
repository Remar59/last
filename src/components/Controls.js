import { useState, useEffect, useRef, useCallback } from 'react';

// icônes
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from 'react-icons/io5';

import {
  IoMdVolumeHigh,
  IoMdVolumeOff,
  IoMdVolumeLow,
} from 'react-icons/io';

import {
  TiArrowLoop,
} from "react-icons/ti";
import { useDispatch } from 'react-redux';

const Controls = ({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  tracks,
  trackIndex,
  setTrackIndex,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);
  const [looping, setLooping] = useState(false);
  const dispatch = useDispatch();

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleLooping = () => {
    setLooping((prev) => !prev);
  };

  const playAnimationRef = useRef();

  
  const repeat = useCallback(() => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      setTimeProgress(currentTime);
      progressBarRef.current.value = currentTime;
      progressBarRef.current.style.setProperty(
        '--range-progress',
        `${(progressBarRef.current.value / duration) * 100}%`
      );
  playAnimationRef.current = requestAnimationFrame(repeat);
}
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

useEffect(() => {
  if (isPlaying) {
    audioRef.current.play();
  } else {
    audioRef.current.pause();
  }
  playAnimationRef.current = requestAnimationFrame(repeat);
}, [isPlaying, audioRef, repeat]);

useEffect(() => {
  if (looping) {
    audioRef.current.loop = true;
  } else {
    audioRef.current.loop = false;
  }
}, [looping, audioRef]);

const skipForward = () => {
  audioRef.current.currentTime += 10;
};

const skipBackward = () => {
  audioRef.current.currentTime -= 10;
};

const handlePrevious = () => {
  const prevIndex = trackIndex >= tracks.length - 1 ? 0 : trackIndex - 1;
  dispatch(setTrackIndex(prevIndex));
  // No need to call setCurrentTrack as the reducer handles updating the currentTrack
};

const handleNext = () => {
  const nextIndex = trackIndex >= tracks.length - 1 ? 0 : trackIndex + 1;
  dispatch(setTrackIndex(nextIndex));
  // No need to call setCurrentTrack as the reducer handles updating the currentTrack
};

useEffect(() => {
  if (audioRef) {
    audioRef.current.volume = volume / 100;
    audioRef.current.muted = muteVolume;
  }
}, [volume, audioRef, muteVolume]);

return (
  <div className="controls-wrapper">
    <div className="controls">
      <button className='button' onClick={handlePrevious}>
        <IoPlaySkipBackSharp />
      </button>
      <button className='button' onClick={skipBackward}>
        <IoPlayBackSharp />
      </button>

      <button className='playButton' onClick={togglePlayPause}>
        {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
      </button>
      <button className='button' onClick={skipForward}>
        <IoPlayForwardSharp />
      </button>
      <button className='button' onClick={handleNext}>
        <IoPlaySkipForwardSharp />
      </button>
      <button className={`button ${looping ? 'loop-active' : ''}`} onClick={toggleLooping}>
        <TiArrowLoop />
      </button>
    </div>
    <div className="volume">
      <button className='button' onClick={() => setMuteVolume((prev) => !prev)}>
        {muteVolume || volume < 5 ? (
          <IoMdVolumeOff />
        ) : volume < 40 ? (
          <IoMdVolumeLow />
        ) : (
          <IoMdVolumeHigh />
        )}
      </button>
      <input
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
        style={{
          background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
        }}
      />
    </div>
  </div>
);
};

export default Controls;