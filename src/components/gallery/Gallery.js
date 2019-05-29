import React from 'react';
import Card from '../card/Card';
import List from '../list/List';
import Badge from '../badge/Badge';
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
  species,
  failed,
  planets
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
        skinColor={person.skin_color}
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
  } else if (active === 'planets') {
    finalOutput = planets.map((planet, i) => (
      <Badge
        key={i}
        id={i}
        name={planet.name}
        diameter={planet.diameter}
        climate={planet.climate}
        terrain={planet.terrain}
        population={planet.population}
        onDisplay={onDisplay}
      />
    ));
  } else {
    finalOutput = (
      <div className="error">
        <p className="error-text">Failed! please reload and try again</p>
      </div>
    );
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
