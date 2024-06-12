import React from "react";
import "./card.css";
import ProfileImage from "../ui/ProfileImage";
import TextDescription from "../ui/TextDescription";
import Container from "../ui/Container";
import CardProfile from "./CardProfile";

const Card = ({
  id,
  name,
  height,
  mass,
  hairColor,
  skinColor,
  birthYear,
  onDisplay,
  species,
  homeWorld,
}) => {
  return (
    <Container className="card">
      <CardProfile
        name={name}
        callback={() => {
          onDisplay(homeWorld, species, id);
        }}
      >
        <TextDescription
          label={[
            { label: "birth Year", labelValue: birthYear },
            { label: "height", labelValue: height },
            { label: "mass", labelValue: mass },
            { label: "hair color", labelValue: hairColor },
            { label: "skin color", labelValue: skinColor },
          ]}
        />

        <ProfileImage set={4} name={name} alt="profile" />
      </CardProfile>
    </Container>
  );
};

export default Card;
