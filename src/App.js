// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AudioPlayer from './components/AudioPlayer';

function App() {
  return (
    <Router>
      <AudioPlayer />
        <Routes>
          <Route  path="/" element={<Home />} />
        </Routes>
    </Router>
  );
}

export default App;