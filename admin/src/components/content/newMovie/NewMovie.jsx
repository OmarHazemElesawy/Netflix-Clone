import classes from "./NewMovie.module.css";
import { useState, useContext } from "react";
import { createMovie } from "../../../store/movieContext/apiCalls";
import { MovieContext } from "../../../store/movieContext/MovieContext";
import uploadFiles from "../../../filesUpload";
import { useNavigate, useParams } from "react-router-dom";

export default function NewMovie() {
  const { type } = useParams();
  const [movieInfo, setMovieInfo] = useState({ isSeries: type === "series" });
  const [mainImg, setMainImg] = useState("");
  const [titleImg, setTitleImg] = useState("");
  const [listImg, setListImg] = useState("");
  const [trailer, setTrailer] = useState("");
  const [video, setVideo] = useState("");
  const [validUpload, setValidUpload] = useState(0);
  const { dispatch } = useContext(MovieContext);
  const navigate = useNavigate();

  const handleMovieInfo = (e) => {
    const { value } = e.target;
    setMovieInfo((previousInfo) => {
      if (e.target.name === "ageLimit")
        return {
          ...previousInfo,
          ageLimit: +value,
        };
      return {
        ...previousInfo,
        [e.target.name]: value,
      };
    });
  };

  const validateForm = () => {
    const { title, description, year, duration, ageLimit, genre } = movieInfo;
    if (!title || !description || !year || !duration || !ageLimit || !genre) {
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movieInfo, dispatch);
    navigate(`/movies/${type}`);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    uploadFiles(
      [
        { file: mainImg, label: "mainImg" },
        { file: titleImg, label: "titleImg" },
        { file: listImg, label: "listImg" },
        { file: trailer, label: "trailer" },
        { file: video, label: "video" },
      ],
      setMovieInfo,
      setValidUpload
    );
  };

  return (
    <div className={classes.newMovie}>
      <h1 className={classes.addMovieTitle}>New Movie/Series</h1>
      <form className={classes.addMovieForm}>
        <div className={classes.addMovieItem}>
          <label htmlFor="mainImg">Main Image:</label>
          <input
            id="mainImg"
            name="mainImg"
            type="file"
            onChange={(event) => setMainImg(event.target.files[0])}
          />
        </div>
        <div className={classes.addMovieItem}>
          <label htmlFor="titleImg">Title Image:</label>
          <input
            id="titleImg"
            name="titleImg"
            type="file"
            onChange={(event) => setTitleImg(event.target.files[0])}
          />
        </div>
        <div className={classes.addMovieItem}>
          <label htmlFor="listImg">List Image:</label>
          <input
            id="listImg"
            name="listImg"
            type="file"
            onChange={(event) => setListImg(event.target.files[0])}
          />
        </div>
        <div className={classes.addMovieItem}>
          <label htmlFor="title">Title:</label>
          <input
            onChange={handleMovieInfo}
            id="title"
            name="title"
            type="text"
            placeholder="Title"
          />
        </div>
        <div className={classes.addMovieItem}>
          <label htmlFor="description">Description:</label>
          <input
            onChange={handleMovieInfo}
            id="description"
            name="description"
            type="text"
            placeholder="Description"
          />
        </div>
        <div className={classes.addMovieItem}>
          <label htmlFor="year">Year:</label>
          <input
            onChange={handleMovieInfo}
            id="year"
            name="year"
            type="text"
            placeholder="Year"
          />
        </div>
        <div className={classes.addMovieItem}>
          <label htmlFor="genre">Genre:</label>
          <input
            onChange={handleMovieInfo}
            id="genre"
            type="text"
            name="genre"
            placeholder="Genre"
          />
        </div>
        <div className={classes.addMovieItem}>
          <label htmlFor="ageLimit">Age Limit:</label>
          <input
            onChange={handleMovieInfo}
            id="ageLimit"
            name="ageLimit"
            type="text"
            placeholder="Age Limit"
          />
        </div>
        <div className={classes.addMovieItem}>
          <label htmlFor="duration">Duration:</label>
          <input
            onChange={handleMovieInfo}
            id="duration"
            name="duration"
            type="text"
            placeholder="Duration"
          />
        </div>
        <div className={classes.addMovieItem}>
          <label htmlFor="trailer">Trailer:</label>
          <input
            id="trailer"
            name="trailer"
            type="file"
            placeholder="Trailer"
            onChange={(event) => setTrailer(event.target.files[0])}
          />
        </div>
        <div className={classes.addMovieItem}>
          <label htmlFor="video">Video:</label>
          <input
            id="video"
            name="video"
            type="file"
            placeholder="Video"
            onChange={(event) => setVideo(event.target.files[0])}
          />
        </div>
        {validUpload === 5 ? (
          <button
            disabled={validateForm()}
            className={classes.addMovieButton}
            onClick={handleSubmit}
          >
            Create
          </button>
        ) : (
          <button
            disabled={!(mainImg && titleImg && listImg && trailer && video)}
            className={classes.addMovieButton}
            onClick={handleUpload}
          >
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
