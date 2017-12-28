import React, { Component } from 'react';
import styles from '../../public/styles.css';

const Score = (props) => {
  return (
    <div className="table">
        <tr>
          <th className="word">Word</th>
          <th className="score">Score</th>
        </tr>

        { props.validWords ? props.validWords.map((word, i) => {
          return (
            <tr key={ i }>
              <th className="words">{ word }</th>
              <th className="scores">{ props.points[i] }</th>
            </tr>
          );}) :
            <tr>
              <th className="words" key={ i }>{ word }</th>
            </tr>
        }
      <tr>
        <th className="totalWord">Total: </th>
        <th className="total">{ props.totalScore }</th>
      </tr>
    </div>
  );
}

export default Score;