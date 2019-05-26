import React from 'react';
import Card from '../card/Card';
// import Display from '../display/Display';
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
  children
}) => {
  // console.log(children);
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
            people.map((person, i) => (
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
            ))
          )}
        </div>
      )}
      {children}
      {/* {disPerson ? <Display /> : ''} */}
    </div>
  );
};

export default Gallery;
