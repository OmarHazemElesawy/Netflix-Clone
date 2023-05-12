import React, { useRef, useState } from "react";
import "./list.scss";
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import Item from "../item/Item";
const List = ({list}) => {
  const [itemNumber, setItemNumber] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const listRef = useRef();

  const handleClick = (direction) => {
    setIsClicked(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && itemNumber > 0) {
      setItemNumber((previousState) => {
        return previousState - 1;
      });
      listRef.current.style.transform = `translate(${255 + distance}px)`;
    }
    if (direction === "right" && itemNumber < 5) {
      setItemNumber((previousState) => {
        return previousState + 1;
      });
      listRef.current.style.transform = `translate(${-255 + distance}px)`;
    }
  };
  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="container">
        <ArrowBackIosNewOutlined
          className="arrow left"
          onClick={() => {
            handleClick("left");
          }}
          style={{ display: !isClicked && "none" }}
        />
        <div ref={listRef} className="innerContainer">
          {list.content.map((movie, i) => (
            <Item key={movie._id} index={i} item={movie}/>
          ))}
        </div>
        <ArrowForwardIosOutlined
          className="arrow right"
          onClick={() => {
            handleClick("right");
          }}
        />
      </div>
    </div>
  );
};

export default List;
