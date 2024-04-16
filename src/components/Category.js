import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import "../styles/_category.scss";
import { tracks } from "../data/tracks";
import { setCurrentTrack } from '../redux/actions';

function Category() {

    const { categoryId } = useParams();
    const [categoryName, setCategoryName] = useState({ soundId: [] });
    const [sounds, setSounds] = useState([]);
    const dispatch = useDispatch();

    const changeSounds = (id) => {
        const selectedSound = sounds.find((sound) => sound.id === id);
        const selectedTrackInfo = tracks.find((track) => track.id === selectedSound.id);
        if (selectedTrackInfo) {
            dispatch(setCurrentTrack(selectedTrackInfo));
        }
    };

    const listSound = categoryName.soundId && categoryName.soundId.map((item) => {
        return (
            <>
                <div className="item">
                    <img src={item.image} alt={item.name} onClick={() => changeSounds(item.id)} />
                    <label htmlFor="img">{item.name}</label>
                </div>
            </>
        )
    })

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

        fetchData("https://api-liremersion-1.onrender.com/sounds", setSounds);
    }, []);

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                const response = await fetch(`https://api-liremersion-1.onrender.com/categories/${categoryId}`);
                const data = await response.json();
                console.log(data);
                setCategoryName(data);
            } catch (error) {
                console.error("Error fetching category details:", error);
            }
        };
        fetchCategoryDetails();
    }, [categoryId]);


    return (
        <div className="categoryPage">
            <Link to={"/"}>
                <img className="logoimg" src="../logo.png" alt="" />
            </Link>
            <div className="categoryContainer">
                <h1>Catégorie {categoryName.name}</h1>
                <div className="sounds-grid">{listSound}</div>
            </div>
        </div>
    );
}

export default Category;
