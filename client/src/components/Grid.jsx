import React, { Component } from 'react';
import styles from '../../public/styles.css';
import Cube from './Cube.jsx';

const Grid = (props) => {
  return (
    <div className="board">
      { props.board.map((row, i) => {
          return (
            <div className="row" key={ i }>
              { row.map((cube, j) => {
                return (
                  <div className="col" key={ j }>
                    <Cube
                      cube={ cube }
                      currentWord={ props.currentWord }
                      selected={ cube.selected }
                      letter={ cube.letter }
                      key={ cube.columnId }
                      handleClick={ props.handleClick.bind(
                        this,
                        cube.rowId,
                        cube.columnId
                      )}
                    />
                  </div>
                );
              })}
            </div>
          );
      })}
    </div>
  );
}

export default Grid;