import React from 'react';
import Card from '../card/Card';
import './gallery.css';

const Gallery = ({ isEmpty, people, next, previous, onClicked, loading }) => {
  return (
    <div className="gallery">
      {isEmpty ? (
        ''
      ) : (
        <div>
          {' '}
          <div className={loading ? 'lds-ripple' : 'hide'}>
            <div />
            <div />
          </div>
          {loading
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
          {next ? (
            <button
              onClick={onClicked}
              data-url={next}
              className="btn btn-next"
            >
              Next
            </button>
          ) : (
            ''
          )}
          {previous ? (
            <button
              onClick={onClicked}
              data-url={previous}
              className="btn btn-previous"
            >
              Previous
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
