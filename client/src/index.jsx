import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.png';
import styles from '../public/styles.css';

import { generateBoard, duplicateBoard, areEqualDice,
       isAdjacent, calculateScore, checkWord } from './util.js';
import Grid from './components/Grid.jsx';
import CurrentWord from './components/CurrentWord.jsx';
import Score from './components/Score.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.makeBoard = generateBoard();
    this.state = {
      board: this.makeBoard,
      currentWord: '',
      currentWordIndex: [],
      validWords: [],
      points: [],
      totalScore: 0
    };

    this.resetBoard = this.resetBoard.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(rowId, columnId) {
    const current = this.state.board[rowId][columnId];
    const previous = this.state.currentWordIndex[this.state.currentWordIndex.length - 1]

    if (current.selected) {
      if (areEqualDice(current, previous)) {
        const newBoard = duplicateBoard(this.state.board);
        newBoard[rowId][columnId].selected = false;

        this.setState({
          currentWord: this.state.currentWord.slice(0, -1),
          board: newBoard,
          currentWordIndex: this.state.currentWordIndex.slice(0, -1)
        });
      }
    } else {
      if (isAdjacent(current, previous) || !previous) {
        const newBoard = duplicateBoard(this.state.board);
        newBoard[rowId][columnId].selected = true;

        this.setState({
          currentWord: this.state.currentWord.concat(newBoard[rowId][columnId].letter),
          board: newBoard,
          currentWordIndex: this.state.currentWordIndex.concat({
            rowId: rowId,
            columnId: columnId
          })
        });
      }
    }
  }

  resetBoard() {
    const word = this.state.currentWord;
    const score = calculateScore(word);
    const emptyBoard = this.makeBoard;

    if (checkWord(word)) {
      const total = score + this.state.totalScore;

      this.setState({
        board: emptyBoard,
        validWords: this.state.validWords.concat([word]),
        points: this.state.points.concat([score]),
        totalScore: total,
        currentWordIndex: [],
        currentWord: ''
      });
    }
  }

  render() {
    return (
      <div className="main">
        <img className="logo" src={ logo }/>
        <Grid
          generateBoard={ generateBoard }
          board={ this.state.board }
          currentWord={ this.state.currentWord }
          handleClick={ this.handleClick }
        />
        <CurrentWord
          currentWord={ this.state.currentWord }
          resetBoard={ this.resetBoard }
        />
        <Score
          validWords={ this.state.validWords }
          points={ this.state.points }
          totalScore={ this.state.totalScore }
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));