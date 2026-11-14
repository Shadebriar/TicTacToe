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
const gameController = (() => {
    // Creates the players needed for a game of Tic Tac Toe and the symbols needed.
    const playerOne = createPlayer("Player 1", "X");
    const playerTwo = createPlayer("Player 2", "O");

    let gameOver = false;

    // Lets us know player one is the current active player
    let activePlayer = playerOne;
    // Lets us know a message is on the page.
    let message = "";

    // Resets the game to a clear grid, game over isn't active, and player 1 is going.
    const resetGame = () => {
        gameboard.grid = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        gameOver = false;
        activePlayer = playerOne;

    }

    //Displays the active player
    const getActivePlayer = () => activePlayer;
    const getMessage = () => message;

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
            message = `Winner is:  ${activePlayer.player}`;
        // If not checks if there's a tie by checking if the entire board is filled.
        } else if (gameboard.grid.every(cell => cell !== " ")) {
            gameOver = true;
            message = "There was a tie";
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
    return { playRound, getActivePlayer, resetGame, getMessage };
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

const message = document.querySelector("#message");

function renderBoard() {
    // Makes the gameboard clear
    board.innerHTML = "";

message.textContent = gameController.getMessage();

    // Cell lets us know if we have (" ", "X", or "O") and index lets us know where on the board.
    gameboard.grid.forEach((cell, index) => {
        // Creates a new div called panel
        const panel = document.createElement("div");
            // An event listener so when an empty index is clicked it fills with the active player's symbol
            panel.addEventListener("click", () => {
                if (gameboard.grid[index] === " ") {
                    gameController.playRound(index);
                
                    renderBoard();
                }
            });
        panel.textContent = cell; 
            board.append(panel)
    });
}

// Creates a restart button
const restartButton = document.createElement("button");
    // Added text to that button.
    restartButton.textContent = "Restart";
        // When restart button is clicked the game restarts and is cleared.
        restartButton.addEventListener("click", ()=> {
            gameController.resetGame();
            renderBoard();
        });
        // Button still shows up on the page after the board is cleared.
        document.body.append(restartButton);

renderBoard();