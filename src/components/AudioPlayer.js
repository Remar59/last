import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tracks } from "../data/tracks";
import { setTrackIndex, setCurrentTrack, setTimeProgress, setDuration } from '../redux/actions';
import { IoPlayBackSharp, IoPlayForwardSharp, IoPlaySkipBackSharp, IoPlaySkipForwardSharp, IoPlaySharp, IoPauseSharp} from 'react-icons/io5';
import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from 'react-icons/io';
import { TiArrowLoop } from "react-icons/ti";
import { BsMusicNoteBeamed } from 'react-icons/bs';
import '../styles/_player.scss';
import '../styles/_progressBar.scss';

//displaytrack
const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,
}) => {
  // permet de charger les données de la musique, 
  //notamment la barre de progression en récupérant la durée
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };


  return (
    <div>
      <audio
        src={currentTrack.src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />
      <div className="audio-info">
        <div className="audio-image">
          {currentTrack.thumbnail ? (
            <img src={currentTrack.thumbnail} alt="audio avatar" />
          ) : (
            <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed />
              </span>
            </div>
          )}
        </div>
        <div className="text">
          <p className="title">{currentTrack.title}</p>
          <p>{currentTrack.author}</p>
        </div>
      </div>
    </div>
  );
};


//controls
const Controls = ({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack,
  handleNext,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);
  const [looping, setLooping] = useState(false);

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
  if (trackIndex === 0) {
    let lastTrackIndex = tracks.length - 1;
    setTrackIndex(lastTrackIndex);
    setCurrentTrack(tracks[lastTrackIndex]);
  } else {
    setTrackIndex((prev) => prev - 1);
    setCurrentTrack(tracks[trackIndex - 1]);
  }
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

//progressbar
const ProgressBar = ({ progressBarRef, audioRef, timeProgress, duration }) => {

  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };

  //Permet de modifier le format du temps de la musique
  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes =
        minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds =
        seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return '00:00';
  };

  return (
    <div className="progress">
      <span className="time current">{formatTime(timeProgress)}</span>
      <input
        type="range"
        ref={progressBarRef}
        defaultValue="0"
        onChange={handleProgressChange}
      />
      <span className="time">{formatTime(duration)}</span>
    </div>
  );
};

//récupère les props pour la musique
const AudioPlayer = ({ backgroundColor }) => {
  // states
  const [background, setBackground] = useState('transparent');
  const { trackIndex, currentTrack, timeProgress, duration } = useSelector(state => state);
  const dispatch = useDispatch();

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