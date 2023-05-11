import classes from "./Layout.module.css";
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";

export const Layout = ({ children }) => {
  return (
    <>
      <Topbar />
      <Sidebar />
      <div className={classes.main}>{children}</div>
    </>
  );
};
