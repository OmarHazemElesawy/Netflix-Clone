import React from "react";
import "./videoPlayer.scss";
import { ArrowBackOutlined } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
const VideoPlayer = () => {
  const location = useLocation();
  const { movie } = location.state;

  return (
    <div className="videoPlayer">
      <Link to="/">
        <div className="backBtn">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video
        className="videoWindow"
        src={movie.video}
        autoPlay
        progress="true"
        controls
      />
    </div>
  );
};
export default VideoPlayer;
