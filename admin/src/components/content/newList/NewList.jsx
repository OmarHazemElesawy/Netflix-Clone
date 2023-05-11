import classes from "./NewList.module.css";
import { useState, useContext, useEffect } from "react";
import { createList } from "../../../store/listContext/apiCalls";
import { ListContext } from "../../../store/listContext/ListContext";
import { MovieContext } from "../../../store/movieContext/MovieContext";
import { getMovies } from "../../../store/movieContext/apiCalls";
import { useNavigate } from "react-router-dom";

export default function NewList() {
  
  const [listInfo, setListInfo] = useState("");
  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: movieDispatch } = useContext(MovieContext);
  const navigate = useNavigate();

  useEffect(() => {
    getMovies(movieDispatch);
  }, [movieDispatch]);

  const handleListInfo = (e) => {
    const { value } = e.target;
    setListInfo((previousInfo) => {
      return { ...previousInfo, [e.target.name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(listInfo, dispatch);
    navigate("/lists");
  };
  const handleSelect = (e) => {
    let content = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setListInfo((prevInfo) => {
      return {
        ...prevInfo,
        [e.target.name]: content,
      };
    });
  };
  
  return (
    <div className={classes.newList}>
      <h1 className={classes.addListTitle}>New List</h1>
      <form className={classes.addListForm}>
        <div className={classes.addListItem}>
          <label htmlFor="title">Title:</label>
          <input
            onChange={handleListInfo}
            id="title"
            name="title"
            type="text"
            placeholder="Title"
          />
        </div>
        <div className={classes.addListItem}>
          <label htmlFor="genre">Genre:</label>
          <input
            onChange={handleListInfo}
            id="genre"
            name="genre"
            type="text"
            placeholder="Genre"
          />
        </div>
        <div className={classes.addListItem}>
          <label htmlFor="type">Type</label>
          <select onChange={handleListInfo} name="type" id="type">
            <option>Type</option>
            <option value="">Both</option>
            <option value="series">Series</option>
            <option value="movies">Movies</option>
          </select>
        </div>
        <div className={classes.addListItem}>
          <label htmlFor="content">Content</label>
          <select
            className={classes.addListSelect}
            multiple
            onChange={handleSelect}
            name="content"
            id="content"
          >
            {movies.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>
        <button className={classes.addListButton} onClick={handleSubmit}>
          Add List
        </button>
      </form>
    </div>
  );
}
