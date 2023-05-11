import { useState, useEffect, useContext } from "react";
import classes from "./Movie.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { MovieContext } from "../../../store/movieContext/MovieContext";
import uploadFiles from "../../../filesUpload";
import { Publish } from "@mui/icons-material";
import axios from "axios";
import { updateMovie } from "../../../store/movieContext/apiCalls";

const Movie = () => {
  const { movieId, isSeries } = useParams();
  const [movie, setMovie] = useState({});
  const [movieInfo, setMovieInfo] = useState({});
  const [mainImg, setMainImg] = useState("");
  const [titleImg, setTitleImg] = useState("");
  const [listImg, setListImg] = useState("");
  const [trailer, setTrailer] = useState("");
  const [video, setVideo] = useState("");
  const [validUpload, setValidUpload] = useState(5);
  const { dispatch } = useContext(MovieContext);
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(baseUrl + "movies/" + movieId, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data);
        const { _id, ...movieData } = res.data;
        setMovieInfo({ ...movieData });
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [movieId, baseUrl]);

  const handleMovieInfo = (e) => {
    const { value } = e.target;
    setMovieInfo((previousInfo) => {
      if (e.target.name === "ageLimit")
        return { ...previousInfo, ageLimit: +value };
      return { ...previousInfo, [e.target.name]: value };
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovie(movie._id, movieInfo, dispatch);
    const type = isSeries === "true" ? "series" : "movie";
    navigate(`/movies/${type}`);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    let uploads = [];
    if (mainImg) uploads.push({ file: mainImg, label: "mainImg" });
    if (titleImg) uploads.push({ file: titleImg, label: "titleImg" });
    if (listImg) uploads.push({ file: listImg, label: "listImg" });
    if (trailer) uploads.push({ file: trailer, label: "trailer" });
    if (video) uploads.push({ file: video, label: "video" });
    uploadFiles(uploads, setMovieInfo, setValidUpload);
  };

  const validateForm = () => {
    const { title, description, year, duration, ageLimit, genre } = movieInfo;

    if (!title || !description || !year || !duration || !ageLimit || !genre) {
      return true;
    }
    return false;
  };
  return (
    <div className={classes.movie}>
      <div className={classes.movieTopContainer}>
        <h2 className={classes.movieTitle}>
          {isSeries === "true" ? "Series" : "Movie"}
        </h2>
      </div>
      <div className={classes.movieMain}>
        <div className={classes.movieMainRight}>
          <div className={classes.movieInfoTop}>
            <span className={classes.movieName}>{movie.title}</span>
          </div>
          <div className={classes.movieInfoBottom}>
            <div className={classes.movieInfoItem}>
              <span className={classes.movieInfoKey}>id:</span>
              <span className={classes.movieInfoValue}>{movie._id}</span>
            </div>
            <div className={classes.movieInfoItem}>
              <span className={classes.movieInfoKey}>Year:</span>
              <span className={classes.movieInfoValue}>{movie.year}</span>
            </div>
            <div className={classes.movieInfoItem}>
              <span className={classes.movieInfoKey}>Genre:</span>
              <span className={classes.movieInfoValue}>{movie.genre}</span>
            </div>
            <div className={classes.movieInfoItem}>
              <span className={classes.movieInfoKey}>Age Limit:</span>
              <span className={classes.movieInfoValue}>{movie.ageLimit}</span>
            </div>
            <div className={classes.movieInfoItem}>
              <span className={classes.movieInfoKey}>Duration:</span>
              <span className={classes.movieInfoValue}>{movie.duration}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.movieBottom}>
        <form className={classes.movieForm}>
          <div className={classes.movieFormLeft}>
            <label>{isSeries === "true" ? "Series" : "Movie"} Name:</label>
            <input
              name="title"
              type="text"
              defaultValue={movie.title}
              onChange={handleMovieInfo}
            />
            <label>Year:</label>
            <input
              name="year"
              type="text"
              defaultValue={movie.year}
              onChange={handleMovieInfo}
            />
            <label>Genre:</label>
            <input
              name="genre"
              type="text"
              defaultValue={movie.genre}
              onChange={handleMovieInfo}
            />
            <label>Age Limit:</label>
            <input
              name="ageLimit"
              type="text"
              defaultValue={movie.ageLimit}
              onChange={handleMovieInfo}
            />
            <label>Duration:</label>
            <input
              name="duration"
              type="text"
              defaultValue={movie.duration}
              onChange={handleMovieInfo}
            />
            <label>Description:</label>
            <input
              name="description"
              type="text"
              defaultValue={movie.description}
              onChange={handleMovieInfo}
            />
            <label>Trailer:</label>
            <input
              type="file"
              placeholder={movie.trailer}
              onChange={(event) => {
                setTrailer(event.target.files[0]);
                setValidUpload((prev) => prev - 1);
              }}
            />
            <label>Video:</label>
            <input
              type="file"
              placeholder={movie.video}
              onChange={(event) => {
                setVideo(event.target.files[0]);
                setValidUpload((prev) => prev - 1);
              }}
            />
          </div>
          <div className={classes.movieFormRight}>
            <div className={classes.movieFormRightImgs}>
              <div className={classes.movieUpload}>
                <span className={classes.movieInfoImg}>Main Image:</span>
                <img
                  className={classes.movieImg}
                  src={movie.mainImg}
                  alt="Main"
                />
                <label htmlFor="mainImg">
                  <Publish />
                </label>
                <input
                  type="file"
                  id="mainImg"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    setMainImg(event.target.files[0]);
                    setValidUpload((prev) => prev - 1);
                  }}
                />
              </div>

              <div className={classes.movieUpload}>
                <span className={classes.movieInfoImg}>Title Image:</span>
                <img
                  className={classes.movieImg}
                  src={movie.titleImg}
                  alt="Title"
                />
                <label htmlFor="titleImg">
                  <Publish />
                </label>
                <input
                  type="file"
                  id="titleImg"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    setTitleImg(event.target.files[0]);
                    setValidUpload((prev) => prev - 1);
                  }}
                />
              </div>

              <div className={classes.movieUpload}>
                <span className={classes.movieInfoImg}>List Image:</span>
                <img
                  className={classes.movieImg}
                  src={movie.listImg}
                  alt="movie"
                />
                <label htmlFor="listImg">
                  <Publish />
                </label>
                <input
                  type="file"
                  id="listImg"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    setListImg(event.target.files[0]);
                    setValidUpload((prev) => prev - 1);
                  }}
                />
              </div>
            </div>
            <div className={classes.movieFormRightBtn}>
              {validUpload === 5 ? (
                <button
                  disabled={validateForm()}
                  className={classes.movieBtn}
                  onClick={handleSubmit}
                >
                  Update
                </button>
              ) : (
                <button className={classes.movieBtn} onClick={handleUpload}>
                  Upload
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Movie;
