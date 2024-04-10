import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { tracks } from '../data/tracks';

const AudioPlayer = ({ track }) => {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const { playing, volume, repeat, currentTrackIndex } = useSelector(state => state);
  
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);


  useEffect(() => {
    const audio = audioRef.current;
    const selectedTrack = tracks[currentTrackIndex];
    const src = selectedTrack?.src;

    if (src && src !== audio.src) {
      // Ensure any currently playing audio is stopped before changing the source
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0; // Reset the time
      }
      audio.src = src; // Update the source
      audio.load(); // Reload the audio element to apply the new source
    }
    
    // Essaye de jouer la music suivante si playing:true
    if (playing) {
      audio.play().catch(error => console.error("Playback was prevented:", error));
    }
  }, [track, playing, currentTrackIndex]);

  // gère le volume et la loop repeat
  useEffect(() => {
    const audio = audioRef.current;

    audio.volume = volume;
    audio.loop = repeat;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const updateProgress = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', updateProgress);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, [volume, repeat]);
  useEffect(() => {
    console.log("Current Time:", currentTime);
  }, [currentTime]);

  const ProgressBar = (e) => {
    const newTime = (audioRef.current.duration / 100) * e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#eee', padding: '20px', textAlign: 'center' }}>
      <audio ref={audioRef} preload="auto" />
      <button onClick={() => dispatch({ type: 'PREVIOUS_TRACK' })}>Previous</button>
      <button onClick={() => dispatch(playing ? { type: 'PAUSE_TRACK' } : { type: 'PLAY_TRACK' })}>
        {playing ? 'Pause' : 'Play'}
      </button>
      <button onClick={() => dispatch({ type: 'NEXT_TRACK' })}>Next</button>
      <button onClick={() => dispatch({ type: 'TOGGLE_REPEAT' })}>
        {repeat ? 'Repeat On' : 'Repeat Off'}
      </button>
      <input type="range" min="0" max="100" value={currentTime / duration * 100 || 0} onChange={ProgressBar} />
      <div>
        {Math.floor(currentTime / 60)}:{('0' + Math.floor(currentTime % 60)).slice(-2)} / 
        {Math.floor(duration / 60)}:{('0' + Math.floor(duration % 60)).slice(-2)}
      </div>
      <input type="range" min="0.0" max="1.0" step="0.01" value={volume} onChange={(e) => dispatch({ type: 'SET_VOLUME', payload: parseFloat(e.target.value) })} />
      <div>Volume: {Math.round(volume * 100)}</div>
    </div>
  );
};

export default AudioPlayer;
