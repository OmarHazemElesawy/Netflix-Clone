import { useContext } from "react";
import { AuthContext } from "./store/authContext/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/content/home/Home";
import UserList from "./components/content/userList/UserList";
import User from "./components/content/user/User";
import NewUser from "./components/content/newUser/NewUser";
import MovieList from "./components/content/movieList/MovieList";
import Movie from "./components/content/movie/Movie";
import NewMovie from "./components/content/newMovie/NewMovie";
import ListOfLists from "./components/content/listOfLists/ListOfLists";
import List from "./components/content/list/List";
import NewList from "./components/content/newList/NewList";
import Login from "./components/content/login/Login";
import { Layout } from "./components/layout/Layout";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Layout><Home /></Layout>}/>
            <Route path="/users" element={<Layout><UserList /></Layout>}/>
            <Route path="/user/:userId" element={<Layout><User /></Layout>}/>
            <Route path="/newUser" element={<Layout><NewUser /></Layout>}/>
            <Route path="/movies/:type" element={<Layout><MovieList /></Layout>}/>
            <Route 
            path="/movie/:movieId/:isSeries"
             element={<Layout><Movie /></Layout>}
             />
            <Route path="/newMovie/:type" element={<Layout><NewMovie /></Layout>}/>
            <Route path="/lists" element={<Layout><ListOfLists /></Layout>}/>
            <Route path="/list/:listId/" element={<Layout><List /></Layout>}/>
            <Route path="/newList" element={<Layout><NewList /></Layout>}/>
            <Route path="/login" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/users" element={<Navigate to="/login" />} />
            <Route path="/user/:userId" element={<Navigate to="/login" />} />
            <Route path="newUser" element={<Navigate to="/login" />} />
            <Route path="/movies/:type" element={<Navigate to="/login" />} />
            <Route
              path="/movie/:movieId/:isSeries"
              element={<Navigate to="/login" />}
            />
            <Route path="/newMovie/:type" element={<Navigate to="/login" />} />
            <Route path="/lists" element={<Navigate to="/login" />} />
            <Route path="/list/:listId/" element={<Navigate to="/login" />} />
            <Route path="/newList" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
