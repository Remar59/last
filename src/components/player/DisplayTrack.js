import { BsMusicNoteBeamed } from 'react-icons/bs';
import { useDispatch } from "react-redux";

const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,
}) => {
    const dispatch = useDispatch();
  // permet de charger les données de la musique, 
  //notamment la barre de progression en récupérant la durée
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    dispatch(setDuration(seconds));
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
export default DisplayTrack;