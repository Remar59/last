import React, { useState, useEffect } from "react";
import "../styles/_categories.scss";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

function Categories() {
  const [categories, setCategories] = useState([]);
  const style =  { color: "white",fontSize: "2em"}

//récupère les catégories sur le render, et les affiches.

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("https://api-liremersion-1.onrender.com/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className="bg">
      <div className="bodyCat">
        <Link to={"/"}>
        <FaArrowLeft style={style}/>
          <img className="logoimg" src="../logo.png" alt="" />
        </Link>
        <div className="categories-grid-container">
          <h1>Toutes les catégories</h1>
          <div className="categories-grid">
            {categories.map((category) => (
              <Link to={`/category/${category._id}`}>
                <div key={category.id} className="category-item">
                  <img src={category.image} alt={category.name} />
                  <label htmlFor="img">{category.name}</label>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
