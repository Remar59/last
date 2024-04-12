// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Category from "./components/Category";
import Categories from "./components/Categories";

function App() {
  return (
    <Router>
        <Routes>
          <Route  path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categoryId" element={<Category />} />
        </Routes>
    </Router>
  );
}

export default App;