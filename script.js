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

    // Lets us know player one is the current active player
    let activePlayer = playerOne;
    //Displays the active player
    const getActivePlayer = () => activePlayer;
    // Switches between active players, which playerOne and playerTwo
    const playRound = (index) => {

        if (activePlayer === playerOne) {
            activePlayer = playerTwo;
        } else {      
            activePlayer = playerOne;
        }
    };
    // Returns playRound and the active player, so the rest of the application can interact with it.
    return { playRound, getActivePlayer };
})();