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

  const checkMarkValidity = (row, column, player) =>{
    const cell = board[row][column];
    const available = cell.getValue() === 1 ? true : false ;
    return available;
  }

  const addMarker = (row, column, player) => {
      board[row][column].markValue(player);
  };

  const printBoard = () => {
    const boardValues = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(boardValues);
  };

  return {
    addMarker,
    getBoard,
    printBoard,
    checkMarkValidity
  };
}

function Cell() {
  let value = 1;

  const getValue = () => value;

  const markValue = (player) => value = player;

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
  let gameOver = false;

  const checkWin =  ()=>{
    if(board.getBoard()[0][0].getValue() === board.getBoard()[0][1].getValue() === board.getBoard()[0][2].getValue() || board.getBoard()[0][0].getValue() === board.getBoard()[1][0].getValue() === board.getBoard()[2][0].getValue() || board.getBoard()[0][0].getValue() === board.getBoard()[1][1].getValue() === board.getBoard()[2][2].getValue() || board.getBoard()[0][1].getValue() === board.getBoard()[1][1].getValue() === board.getBoard()[2][1].getValue() || board.getBoard()[0][2].getValue() === board.getBoard()[1][2].getValue() === board.getBoard()[2][2].getValue() || board.getBoard()[0][2].getValue() === board.getBoard()[1][1].getValue() === board.getBoard()[2][0].getValue() || board.getBoard()[1][0].getValue() === board.getBoard()[1][1].getValue() === board.getBoard()[1][2].getValue() || board.getBoard()[2][0].getValue() === board.getBoard()[2][1].getValue() === board.getBoard()[2][2].getValue())
      {
        console.log(`${getActivePlayer().name} WINS!!!`);
        gameOver = true;
        return ;
    }
  }
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === Players[0] ? Players[1] : Players[0];
  };

  const getActivePlayer = () => activePlayer;

  const PlayRound = (row, column) => {

    if (gameOver){
      console.log("Game Over");
      return;
    }

    console.log(
      `${getActivePlayer().name} wants to mark ${
        getActivePlayer().marker
      } at Row ${row} and Column ${column}`
    );

    if(board.checkMarkValidity(row, column, getActivePlayer().marker)){
    console.log("Valid move!");    
    board.addMarker(row, column, getActivePlayer().marker);
    checkWin();

    if(!gameOver)
      switchPlayerTurn();
    board.printBoard();
  }
    else{
      console.log("Invalid mark, Please try again!");
      board.printBoard();
    }
  };

  return {
    PlayRound,
    getActivePlayer,
    checkWin
  };
}

const game = GameController();
