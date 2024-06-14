import React from "react";
import "./badge.css";
import BadgeFace from "./BadgeFace";
import TextDescription from "../ui/TextDescription";
import Container from "../ui/Container";

const Badge = ({
  id,
  name,
  diameter,
  climate,
  terrain,
  population,
  onDisplay,
  residents,
}) => {
  return (
    <Container className="badge">
      <BadgeFace position="front" name={name} />
      <BadgeFace
        position="back"
        name={name}
        callback={() => {
          onDisplay(residents, id);
        }}
      >
        <TextDescription
          label={[
            { label: "diameter", labelValue: diameter },
            { label: "climate", labelValue: climate },
            { label: "terrain", labelValue: terrain },
            { label: "population", labelValue: population },
          ]}
          orientation="badge"
        />
      </BadgeFace>
    </Container>
  );
};

export default Badge;
