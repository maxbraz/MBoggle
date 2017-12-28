let dictionary = {};

class Dice {
  constructor(letter, rowId, columnId, selected = false) {
    this.letter = letter;
    this.rowId = rowId;
    this.columnId = columnId;
    this.selected = selected;
  }

  clone() {
    return new Dice(this.letter, this.rowId, this.columnId, this.selected);
  }
}

export const checkWord = (word) => {
  if (!dictionary.hasOwnProperty(word)) {
    dictionary[word] = 1;
    return true;
  } else {
    return false;
  }
};

const shuffleDice = (dice) => {
  for (let i = dice.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [dice[i], dice[j]] = [dice[j], dice[i]];
  }
  return dice;
};

const rollDie = (die) => {
  let randomIndex = Math.floor(Math.random() * die.length);
  return die[randomIndex];
};

export const generateBoard = () => {
  const board = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ];

  const dice = [
    'AAAFRS',
    'AAEEEE',
    'AAFIRS',
    'ADENNN',
    'AEEEEM',
    'AEEGMU',
    'AEGMNN',
    'AFIRSY',
    'BJKQXZ',
    'CCENST',
    'CEIILT',
    'CEILPT',
    'CEIPST',
    'DDHNOT',
    'DHHLOR',
    'DHLNOR',
    'DHLNOR',
    'EIIITT',
    'EMOTTT',
    'ENSSSU',
    'FIPRSY',
    'GORRVW',
    'IPRRRY',
    'NOOTUW',
    'OOOTTU'
  ];

  const shuffled = shuffleDice(dice);

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      let die = shuffled.shift();
      let face = rollDie(die);
      const dice = new Dice(face, row, col);
      board[row][col] = dice;
    }
  }
  return board;
};

export const duplicateBoard = (board) => {
  const copy = board.map(row => {
    return row.map(box => {
      return box.clone();
    });
  });
  return copy;
};

export const areEqualDice = (die1, die2) => {
  if (!die1 || !die2) return false;
  return die1.rowId === die2.rowId && die1.columnId === die2.columnId;
};

export const isAdjacent = (die1, die2) => {
  if (!die1 || !die2) return false;
  if (areEqualDice(die1, die2)) {
    return false;
  }

  const colDiff = Math.abs(die1.columnId - die2.columnId);
  const rowDiff = Math.abs(die1.rowId - die2.rowId);
  if (colDiff <= 1 && rowDiff <= 1) {
    return true;
  } else {
    return false;
  }
};

export const calculateScore = (word) => {
  let points = 0;
  let length = word.length;

  if (length > 8) return 11;
  if (length === 7) return 5;
  if (length === 6) return 3;
  if (length === 5) return 2;
  if (length === 3 || length === 4) return 1;
  if (length === 1 || length === 2 || length === 0) return 0;
};
