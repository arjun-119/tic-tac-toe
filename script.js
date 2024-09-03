function Gameboard(){
    const rows = 3;
    const columns = 3;
    board = [];

    for (let i = 0;i<rows;i++){
        board[i] = [];
        for (let j = 0; j<columns;j++){
            board[i].push(Cell());
        }
    }
    
}

function GameController(){

    const Players = [
        {
            name: "Player 1",
            marker: "X"
        },
        {
            name: "Player 2",
            marker: "O"
        }
    ];
}