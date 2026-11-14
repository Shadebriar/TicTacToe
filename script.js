// Gameboard module (IIFE)
const gameboard = (() => {
    // Blank array for the 3x3 grid
    const grid = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    // Returns the grid, so the rest of the application can interact with it.
    return { grid };
})();

// A function for creating any player. Player should have a name and symbol.
function createPlayer(player, symbol) {
  return { player, symbol };
}
const GameController = (() => {
    // Creates the players needed for a game of Tic Tac Toe and the symbols needed.
    const playerOne = createPlayer("Player 1", "X");
    const playerTwo = createPlayer("Player 2", "O");

    let gameOver = false;

    // Lets us know player one is the current active player
    let activePlayer = playerOne;

    //Displays the active player
    const getActivePlayer = () => activePlayer;

    // Switches between active players, which playerOne and playerTwo
    const playRound = (index) => {

        if (gameOver === true) 
            return;

        // Enters the active player's symbol into one of the squares on the grid.
        gameboard.grid[index] = activePlayer.symbol;

    // Winner declared
    const playerHasWon = winner(activePlayer);
        if (playerHasWon === true) {
            gameOver = true;
            console.log(`Winner is:  ${activePlayer.player}`)
        // If not checks if there's a tie by checking if the entire board is filled.
        } else if (gameboard.grid.every(cell => cell !== " ")) {
            gameOver = true;
            console.log("There was a tie")
        // If not a win or tie switch to player swapping.
        } else {
        if (activePlayer === playerOne) {
            activePlayer = playerTwo;
        } else {      
            activePlayer = playerOne;
            }
        }

    };
    // Returns playRound and the active player, so the rest of the application can interact with it.
    return { playRound, getActivePlayer };
})();

// All the winning array combinations in Tic Tac Toe
const waysToWin = [
    //Rows
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    //Columns
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    //Diagonials
    [0, 4, 8], [2, 4, 6]
];

function winner(activePlayer) {
// Checks if any of the winning combinations have be acheived.
return waysToWin.some(combination =>
    // Checks if every index spot in a specific winning line matches the active players symbol on the grid. 
    combination.every(index => gameboard.grid[index] === activePlayer.symbol)
    );
}
// Selects the board div on index.html
const board = document.querySelector("#board");

function renderBoard() {
    // Makes the gameboard clear
    board.innerHTML = "";
    // Cell lets us know if we have (" ", "X", or "O") and index lets us know where on the board.
    gameboard.grid.forEach((cell, index) => {
        // Creates a new div called panel
        const panel = document.createElement("div");
            // An event listener so when an empty index is clicked it fills with the active player's symbol
            panel.addEventListener("click", () => {
                if (gameboard.grid[index] === " ") {
                    GameController.playRound(index);
                
                    renderBoard();
                }
            });
        panel.textContent = cell; 
            board.append(panel)
    });
}

renderBoard();