import React from 'react';
import './list.css';

const List = ({ id, name, onDisplay }) => {
  return (
    <div className="list">
      <div className={`listContainer ${id % 2 === 0 ? 'even' : 'odd'}`}>
        <img
          src={`https://robohash.org/${name}?set=set3`}
          className="specie-img"
          alt="specieimage"
        />
        <p
          data-nameid={id}
          onClick={() => {
            onDisplay(id);
          }}
        >
          {name}
        </p>
      </div>
    </div>
  );
};

export default List;
