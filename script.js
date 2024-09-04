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

  const getBoard = () => board;

  const addMarker = (row, column, player) => {
    const availableCells = board[row].filter((item) => item.getValue() === 1);

    if (!availableCells.length) return;
    board[row][column].markValue(player);
  };

  const printBoard = () => {
    boardValues = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(boardValues);
  };

  return {
    addMarker,
    getBoard,
    printBoard,
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
  const board = Gameboard();
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

  let activePlayer = Players[0];

  const switchPlayerTurn = () => {
    activePlayer === Players[0] ? Players[1] : Players[0];
  };

  const getActivePlayer = () => activePlayer;

  const NewRound = () => board.getBoard();

  const PlayRound = (row, column) => {
    console.log(
      `${getActivePlayer().name} marks ${
        getActivePlayer().token
      } at Row ${row} and Column ${column}`
    );
    board.addMarker(row, column, getActivePlayer().token);

    switchPlayerTurn();
  };
  
  return {
    NewRound,
    PlayRound
  };
}
