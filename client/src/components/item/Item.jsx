import React, { useState } from "react";
import "./item.scss";
import {
  PlayArrow,
  AddCircleOutlineOutlined,
  ThumbUpOutlined,
  ThumbDownOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
const Item = ({ index, item }) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <Link to="/watch" state={{ movie: item }}>
      <div
        className="item"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{ left: isHovering && index * 225 - 50 + index * 3 }}
      >
        <img src={item.listImg} alt="movie" />
        {isHovering && (
          <>
            <video src={item.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="itemIcons">
                <PlayArrow fontSize="small" className="itemIcon" />
                <AddCircleOutlineOutlined
                  fontSize="small"
                  className="itemIcon"
                />
                <ThumbUpOutlined fontSize="small" className="itemIcon" />
                <ThumbDownOutlined fontSize="small" className="itemIcon" />
              </div>
              <div className="itemInfoTop">
                <span>{item.duration}</span>
                <span className="ageLimit">{item.ageLimit}</span>
                <span>{item.year}</span>
              </div>
              <div className="description">{item.description}</div>
              <div className="genre">{item.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default Item;