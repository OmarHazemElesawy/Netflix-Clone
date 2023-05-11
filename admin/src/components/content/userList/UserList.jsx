import React, { useEffect, useContext } from "react";
import classes from "./UserList.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { UserContext } from "../../../store/userContext/UserContext";
import { getUsers, deleteUser } from "../../../store/userContext/apiCalls";
const UserList = () => {
  const { users, dispatch } = useContext(UserContext);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDeleteUser = (id) => {
    deleteUser(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "username",
      headerName: "Username",
      width: 250,
      renderCell: (params) => {
        return (
          <div className={classes.userListUser}>
            <img
              className={classes.userListUserImg}
              src={params.row.profileImg}
              alt="avatar"
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "Admin",
      headerName: "Admin",
      width: 250,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className={classes.userListEdit}>Edit</button>
            </Link>
            <Delete
              className={classes.userListDelete}
              onClick={() => handleDeleteUser(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className={classes.userList} style={{ height: "100%", width: "100%" }}>
      <DataGrid
        disableRowSelectionOnClick
        rows={users}
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
export default UserList;
