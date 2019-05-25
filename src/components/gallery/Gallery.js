import React from 'react';
import Card from '../card/Card';
import './gallery.css';

const Gallery = ({
  isEmpty,
  people,
  next,
  previous,
  onClicked,
  loading,
  active
}) => {
  return (
    <div className="gallery">
      {isEmpty ? (
        ''
      ) : (
        <div>
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
              />
            ))
          )}
          {previous ? (
            <button
              onClick={onClicked}
              data-url={previous}
              data-active={active}
              className="btn btn-previous"
            >
              Previous
            </button>
          ) : (
            ''
          )}
          {next ? (
            <button
              onClick={onClicked}
              data-url={next}
              data-active={active}
              className="btn btn-next"
            >
              Next
            </button>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  );
};

export default Gallery;
