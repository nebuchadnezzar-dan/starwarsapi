import React from 'react';
import Card from '../card/Card';
import './gallery.css';

const Gallery = ({ isEmpty, people }) => {
  return (
    <div className="gallery">
      {isEmpty
        ? ''
        : people.map((person, i) => (
            <Card
              key={i}
              id={i}
              name={person.name}
              height={person.height}
              mass={person.mass}
              hairColor={person.hair_color}
              skinColor={person.hair_color}
              gender={person.gender}
              birthYear={person.birth_year}
              homeWorld={person.homeworld}
              species={person.species}
            />
          ))}
    </div>
  );
};

export default Gallery;
