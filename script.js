function Gameboard() {
  const rows = 3;
  const columns = 3;
  board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const addMarker = (row, column, player) => {
    const availableCells = board[row].filter((item) => item.getValue() === 1);

    if (!availableCells.length) return;
    board[row][column].markValue(player);
  };
}

function Cell() {
  let value = 1;

  const getValue = () => value;

  const markValue = (player) => (value = player);

  return {
    getValue,
    markValue,
  };
}

function GameController() {
  const Players = [
    {
      name: "Player 1",
      marker: "X",
    },
    {
      name: "Player 2",
      marker: "O",
    },
  ];
}
