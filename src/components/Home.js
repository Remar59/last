import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import { Link } from "react-router-dom";
import "../styles/_home.scss";
import { tracks } from '../data/tracks';
import { setCurrentTrack } from '../redux/actions';


function Home() {
  const [modalState, setModalState] = useState({ showRegister: false, showLogin: false });
  const [categories, setCategories] = useState([]);
  const [sounds, setSounds] = useState([]);
  const dispatch = useDispatch();

  // gestion des modales de connexion.

  const toggleModal = (modalName) => {
    const isVisible = modalState[modalName];
    const newState = { showRegister: false, showLogin: false };

    if (!isVisible) {
      newState[modalName] = !isVisible;
    }
    
    setModalState(newState);
  };

  const changeSounds = (id) => {
    const selectedSound = sounds.find((sound) => sound.id === id);
    const selectedTrackInfo = tracks.find((track) => track.id === selectedSound.id);
    if (selectedTrackInfo) {
      dispatch(setCurrentTrack(selectedTrackInfo));
    }
  };

  // permet de grouper l'appel API pour les sons et les catégories.
  useEffect(() => {
    async function fetchData(url, setter) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setter(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData("https://api-liremersion-1.onrender.com/categories", setCategories);
    fetchData("https://api-liremersion-1.onrender.com/sounds", setSounds);
  }, []);

  return (
    <div className="home-container">
      <div className="home-content">
      <div className="header">
      <div className="logoHello">
            <img className="logoimg" src="./logo.png" alt="" />
          </div>
        <div>
      <button onClick={() => toggleModal('showRegister')}>Register</button>
      <button onClick={() => toggleModal('showLogin')}>Login</button>

      {modalState.showRegister && <RegisterModal onClose={() => setModalState({ ...modalState, showRegister: false })} />}
      {modalState.showLogin && <LoginModal onClose={() => setModalState({ ...modalState, showLogin: false })} />}
    </div>
    </div>

        <h2>Catégories</h2>
        <div className="category-scrolling">
          {categories.map((item) => (
              <Link to={`/category/${item._id}`}>
                <div>
                  <img src={item.image} alt={item.name} />
                  <label htmlFor="img">{item.name}</label>
                </div>
              </Link>
          ))}
          <Link to={"/categories"}>
            <div>
              <img src="https://www.iconpacks.net/icons/2/free-arrow-next-icon-2825-thumb.png" alt="Voir autres catégories" style={{ backgroundColor: "rgba(255, 255, 255, 0.555)" }} />
              <label htmlFor="img">Voir toutes</label>
            </div>
          </Link>
        </div>
        
        <h2>Sons populaires</h2>
        <div className="popular-scrolling">
          {sounds.map(sound => (
              <div className="popular">
                <img
                  className="popularimg"
                  src={sound.image}
                  alt={sound.name}
                  onClick={() => changeSounds(sound.id)}
                />
                <label key={sound.id + "_label"} htmlFor="img">
                  {sound.name}
                </label>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;