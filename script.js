function Gameboard() {
  const rows = 3;
  const columns = 3;
  let board = [];

  const initializeBoard = () => {
    board = [];
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(Cell());
      }
    }
  };

  // Initialize the board at the start
  initializeBoard();

  const getBoard = () => board;

  const checkMarkValidity = (row, column, player) => {
    const cell = board[row][column];
    return cell.getValue() === ""; // '' indicates an available cell
  };

  const addMarker = (row, column, player) => {
    board[row][column].markValue(player);
  };

  const resetBoard = () => {
    initializeBoard();
  };

  return {
    addMarker,
    getBoard,
    checkMarkValidity,
    resetBoard,
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
  let board = Gameboard();
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
      gameOver = true;
      headerContent.textContent = `${getActivePlayer().name} WINS!!!`;
    }
  };

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === Players[0] ? Players[1] : Players[0];
  };

  const getActivePlayer = () => activePlayer;

  const isGameOver = () => gameOver;

  const PlayRound = (row, column) => {
    if (gameOver) return;

    const activePlayer = getActivePlayer();

    if (board.checkMarkValidity(row, column, activePlayer.marker)) {
      board.addMarker(row, column, activePlayer.marker);
      checkWin();
      if (!gameOver) switchPlayerTurn();
    }
  };

  const resetGame = () => {
    activePlayer = Players[0];
    gameOver = false;
    headerContent.textContent = `${activePlayer.name}'s turn!`;
    board.resetBoard();
  };

  return {
    PlayRound,
    getActivePlayer,
    getBoard: board.getBoard,
    isGameOver,
    resetGame,
  };
}

function ScreenController() {
  const game = GameController();
  const playerTurn = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");
  const resetButton = document.querySelector(".resetButton");

  const updateScreen = () => {
    boardDiv.textContent = "";

    const board = game.getBoard();
    let activePlayer = game.getActivePlayer();

    if (!game.isGameOver())
      playerTurn.textContent = `${activePlayer.name}'s turn!`;

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

  const clickHandler = (e) => {
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;

    if (!selectedColumn || !selectedRow) return;

    game.PlayRound(selectedRow, selectedColumn);
    updateScreen();
  };

  boardDiv.addEventListener("click", clickHandler);

  resetButton.addEventListener("click", () => {
    game.resetGame();
    updateScreen();
  });

  updateScreen();
}

ScreenController();
