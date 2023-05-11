import React, { useContext, useEffect } from "react";
import classes from "./MovieList.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { MovieContext } from "../../../store/movieContext/MovieContext";
import { getMovies, deleteMovie } from "../../../store/movieContext/apiCalls";
import { useParams } from "react-router-dom";

const MovieList = () => {
  const { movies, dispatch } = useContext(MovieContext);
  const { type } = useParams();
  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);

  const handleDeleteMovie = (id) => {
    deleteMovie(id, dispatch);
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 125 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={classes.movieListUser}>
            <img
              className={classes.movieListMovieImg}
              src={params.row.mainImg}
              alt="movie"
            />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 130 },
    { field: "duration", headerName: "Duration", width: 130 },
    { field: "year", headerName: "Year", width: 130 },
    { field: "ageLimit", headerName: "Age", width: 130 },
    { field: "isSeries", headerName: "isSeries", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/movie/" + params.row._id + "/" + params.row.isSeries}>
              <button className={classes.movieListEdit}>Edit</button>
            </Link>
            <Delete
              className={classes.movieListDelete}
              onClick={() => handleDeleteMovie(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div
      className={classes.movieList}
      style={{ height: "100%", width: "100%" }}
    >
      <DataGrid
        disableRowSelectionOnClick
        rows={
          type === "movie"
            ? movies.filter((movie) => !movie.isSeries)
            : movies.filter((series) => series.isSeries)
        }
        columns={columns}
        checkboxSelection
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default MovieList;
