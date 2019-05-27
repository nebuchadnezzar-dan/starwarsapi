import React from 'react';
import Card from '../card/Card';
import List from '../list/List';
import './gallery.css';

const Gallery = ({
  isEmpty,
  people,
  next,
  previous,
  onClicked,
  loading,
  active,
  onDisplay,
  children,
  species
}) => {
  let finalOutput = '';
  if (active === 'people') {
    finalOutput = people.map((person, i) => (
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
        onDisplay={onDisplay}
      />
    ));
  } else if (active === 'species') {
    finalOutput = species.map((spec, i) => (
      <List key={i} id={i} name={spec.name} onDisplay={onDisplay} />
    ));
  }
  return (
    <div className="gallery">
      {isEmpty ? (
        ''
      ) : (
        <div className="galleryContainer">
          {' '}
          {loading ? (
            <div className="lds-ripple">
              <div />
              <div />
            </div>
          ) : (
            finalOutput
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default Gallery;
