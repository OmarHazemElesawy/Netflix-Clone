import React, { useContext, useEffect } from "react";
import classes from "./ListOfLists.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { ListContext } from "../../../store/listContext/ListContext";
import { getLists, deleteList } from "../../../store/listContext/apiCalls";

const ListOfLists = () => {
  const { lists, dispatch } = useContext(ListContext);
  useEffect(() => {
    getLists(dispatch);
  }, [dispatch]);

  const handleDeleteList = (id) => {
    deleteList(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 300 },
    { field: "title", headerName: "Title", width: 235 },
    { field: "genre", headerName: "Genre", width: 235 },
    { field: "type", headerName: "Type", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 210,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/list/" + params.row._id}>
              <button className={classes.listOfListEdit}>Edit</button>
            </Link>
            <Delete
              className={classes.listOfListDelete}
              onClick={() => handleDeleteList(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div
      className={classes.listOfList}
      style={{ height: "100%", width: "100%" }}
    >
      <DataGrid
        disableRowSelectionOnClick
        rows={lists}
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

export default ListOfLists;
