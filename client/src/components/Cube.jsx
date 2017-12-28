import React, { Component } from 'react';
import styles from '../../public/styles.css';

const Cube = (props) => {
  const cubeRow = props.cube.rowId;
  const cubeCol = props.cube.columnId;
  const index = props.index;

  return (
    <div className={ props.selected ? 'selected' : 'normal' }>
      <div className="letter" onClick={ () => props.handleClick(cubeRow, cubeCol) }>
        { props.cube.letter }
      </div>
    </div>
  );
};

export default Cube;