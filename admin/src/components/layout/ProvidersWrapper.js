import { AuthContextProvider } from "../../store/authContext/AuthContext";
import { MovieContextProvider } from "../../store/movieContext/MovieContext";
import { ListContextProvider } from "../../store/listContext/ListContext";
import { UserContextProvider } from "../../store/userContext/UserContext";

const ProvidersWrapper = ({ children }) => {
  return (
    <UserContextProvider>
      <ListContextProvider>
        <MovieContextProvider>
          <AuthContextProvider>{children}</AuthContextProvider>
        </MovieContextProvider>
      </ListContextProvider>
    </UserContextProvider>
  );
};

export default ProvidersWrapper;
