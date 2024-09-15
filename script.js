function Gameboard() {
  const rows = 3;
  const columns = 3;
  let board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const checkMarkValidity = (row, column, player) => {
    const cell = board[row][column];
    const available = cell.getValue() === ""; // '' indicates an available cell
    return available;
  };

  const addMarker = (row, column, player) => {
    board[row][column].markValue(player);
  };

  return {
    addMarker,
    getBoard,
    checkMarkValidity,
  };
}

function Cell() {
  let value = "";

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
    { name: "Player 1", marker: "X" },
    { name: "Player 2", marker: "O" },
  ];

  let activePlayer = Players[0];
  let gameOver = false;
  let headerContent = document.querySelector(".turn");

  const checkWin = () => {
    const b = board.getBoard();

    if (
      // Row checks
      (b[0][0].getValue() !== "" &&
        b[0][0].getValue() === b[0][1].getValue() &&
        b[0][1].getValue() === b[0][2].getValue()) ||
      (b[1][0].getValue() !== "" &&
        b[1][0].getValue() === b[1][1].getValue() &&
        b[1][1].getValue() === b[1][2].getValue()) ||
      (b[2][0].getValue() !== "" &&
        b[2][0].getValue() === b[2][1].getValue() &&
        b[2][1].getValue() === b[2][2].getValue()) ||
      // Column checks
      (b[0][0].getValue() !== "" &&
        b[0][0].getValue() === b[1][0].getValue() &&
        b[1][0].getValue() === b[2][0].getValue()) ||
      (b[0][1].getValue() !== "" &&
        b[0][1].getValue() === b[1][1].getValue() &&
        b[1][1].getValue() === b[2][1].getValue()) ||
      (b[0][2].getValue() !== "" &&
        b[0][2].getValue() === b[1][2].getValue() &&
        b[1][2].getValue() === b[2][2].getValue()) ||
      // Diagonal checks
      (b[0][0].getValue() !== "" &&
        b[0][0].getValue() === b[1][1].getValue() &&
        b[1][1].getValue() === b[2][2].getValue()) ||
      (b[0][2].getValue() !== "" &&
        b[0][2].getValue() === b[1][1].getValue() &&
        b[1][1].getValue() === b[2][0].getValue())
    ) {
      console.log(`${getActivePlayer().name} WINS!!!`);
      gameOver = true;
      headerContent.textContent = `${getActivePlayer().name} WINS!!!`;
      return;
    }
  };

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === Players[0] ? Players[1] : Players[0];
  };

  const getActivePlayer = () => activePlayer;

  const PlayRound = (row, column) => {
    // headerContent.textContent = `${activePlayer.name}'s turn`;
    if (gameOver) {
      console.log("Game Over");
      return;
    }

    const activePlayer = getActivePlayer();
    console.log(
      `${activePlayer.name} wants to mark ${activePlayer.marker} at Row ${row} and Column ${column}`
    );

    if (board.checkMarkValidity(row, column, activePlayer.marker)) {
      console.log("Valid move!");
      board.addMarker(row, column, activePlayer.marker);
      checkWin();

      if (!gameOver) switchPlayerTurn();
    } else {
      console.log("Invalid mark, please try again!");
    }
  };

  return {
    PlayRound,
    getActivePlayer,
    checkWin,
    getBoard: board.getBoard,
  };
}

function ScreenController() {
  const game = GameController();
  const playerTurn = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");
  const activePlayer = game.getActivePlayer();

  
  playerTurn.textContent = `${activePlayer.name}'s turn!`;

  const updateScreen = () => {
    boardDiv.textContent = "";

    const board = game.getBoard();
    // const activePlayer = game.getActivePlayer();

    // playerTurn.textContent = `${activePlayer.name}'s turn!`;

    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");

        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = columnIndex;
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      });
    });
  };

  function clickHandler(e) {
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;

    if (!selectedColumn || !selectedRow) return;

    game.PlayRound(selectedRow, selectedColumn);
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandler);

  updateScreen();
}

ScreenController();