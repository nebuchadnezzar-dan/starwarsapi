import React from "react";
import "./list.css";
import Container from "../ui/Container";
import ListContainer from "./ListContainer";

const List = ({ id, name, homeWorld, onDisplay }) => {
  return (
    <Container className="list">
      <ListContainer
        name={name}
        set={3}
        id={id}
        callback={() => {
          onDisplay(homeWorld, null, id);
        }}
      />
    </Container>
  );
};

export default List;
