import { useState, useEffect, useContext } from "react";
import classes from "./List.module.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ListContext } from "../../../store/listContext/ListContext";
import { MovieContext } from "../../../store/movieContext/MovieContext";
import { getMovies } from "../../../store/movieContext/apiCalls";
import { updateList } from "../../../store/listContext/apiCalls";

const List = () => {
  const { listId } = useParams();
  const [list, setList] = useState({});
  const [listInfo, seListInfo] = useState({});
  const [listContentIds, setListContentIds] = useState([]);
  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: movieDispatch } = useContext(MovieContext);
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await axios.get(baseUrl + "lists/" + listId, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setList(res.data);
        seListInfo(res.data);
        setListContentIds(res.data.content.map((movie) => movie._id));
      } catch (err) {
        console.log(err);
      }
    };
    getList();
    getMovies(movieDispatch);
  }, [listId, movieDispatch, baseUrl]);

  const handleListInfo = (e) => {
    const { value } = e.target;
    setList((previousInfo) => {
      return { ...previousInfo, [e.target.name]: value };
    });
  };

  const handleSelect = (e) => {
    let content = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setList((prevInfo) => {
      return {
        ...prevInfo,
        [e.target.name]: content,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateList(listId, list, dispatch);
    navigate("/lists");
  };

  return (
    <div className={classes.list}>
      <div className={classes.listTopContainer}>
        <h2 className={classes.listTitle}>{listInfo.type}</h2>
        <Link to="/newList">
          <button className={classes.listAddbtn}>Add List</button>
        </Link>
      </div>

      <div className={classes.listMain}>
        <div className={classes.listMainRight}>
          <div className={classes.listInfoTop}>
            <span className={classes.listName}>{listInfo.title}</span>
          </div>
          <div className={classes.listInfoBottom}>
            <div className={classes.listInfoItem}>
              <span className={classes.listInfoKey}>id:</span>
              <span className={classes.listInfoValue}>{listInfo._id}</span>
            </div>
            <div className={classes.listInfoItem}>
              <span className={classes.listInfoKey}>Genre:</span>
              <span className={classes.listInfoValue}>{listInfo.genre}</span>
            </div>
            <div className={classes.listInfoItem}>
              <span className={classes.listInfoKey}>Type:</span>
              <span className={classes.listInfoValue}>{listInfo.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.listBottom}>
        <form className={classes.listForm}>
          <div className={classes.listFormLeft}>
            <label>List Name:</label>
            <input
              type="text"
              defaultValue={list.title}
              onChange={handleListInfo}
              name="title"
            />
            <label>Genre:</label>
            <input
              type="text"
              defaultValue={list.genre}
              onChange={handleListInfo}
              name="genre"
            />
            <label>Type:</label>
            <input
              type="text"
              defaultValue={list.type}
              onChange={handleListInfo}
              name="type"
            />
          </div>
          <div className={classes.listFormMiddle}>
            <label>Content:</label>
            <div className={classes.addListItem}>
              <select
                className={classes.addListSelect}
                multiple
                name="content"
                id="content"
                onChange={handleSelect}
              >
                {movies.map((movie) => (
                  <option
                    selected={listContentIds.includes(movie._id)}
                    key={movie._id}
                    value={movie._id}
                  >
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={classes.listFormRight}>
            <button className={classes.listBtn} onClick={handleSubmit}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default List;
