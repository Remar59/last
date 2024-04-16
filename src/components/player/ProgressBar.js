import { useDispatch } from 'react-redux';
import { setTimeProgress, setDuration } from '../../redux/actions';
import '../../styles/_player.scss';
import '../../styles/_progressBar.scss';
import { useEffect } from 'react';

const ProgressBar = ({ progressBarRef, audioRef, timeProgress, duration }) => {

  const dispatch = useDispatch();

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

  useEffect(() => {
    const updateProgress = () => {
      const currentTime = audioRef.current.currentTime;
      const totalDuration = audioRef.current.duration;

      // Dispatch des actions pour mettre à jour le store Redux
      dispatch(setTimeProgress(currentTime));
      dispatch(setDuration(totalDuration));

      console.log(currentTime);
      console.log('Durée de la piste:', totalDuration);
    };

    const intervalId = setInterval(updateProgress, 1000); // Met à jour chaque seconde

    // Nettoyage du setInterval lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, [audioRef, dispatch]);

  return (
    <div className="progress">
      <span className="time current">{formatTime(timeProgress)}</span>
      <input
        type="range"
        ref={progressBarRef}
        defaultValue="0"
        onChange={handleProgressChange}
      />
      
      {/* Permet de vérifier la durée joué par la piste*/}
      {console.log('Durée de la piste affichée dans le composant ProgressBar:', duration)}
      <span className="time">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;