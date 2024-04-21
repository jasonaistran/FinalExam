/* 
@Author: Tran Minh Triet
*/

const board = document.getElementById("board");
const playerTurnDisplay = document.getElementById("player-turn");
const restartButton = document.getElementById("restart-button");
const startButton = document.getElementById("start-button");
const gameMessage = document.getElementById("game-message");
const messageClick = document.getElementById("message-click"); //Bấm bắt đầu để chơi
const messageFighting = document.getElementById("message-fighting"); // Hãy chiến đấu hết mình

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameStarted = false;

function startGame() {
  gameStarted = true; // Set gameStarted to true when starting the game
  currentPlayer = "X"; // Set current player to X at the start of each game
  playerTurnDisplay.textContent = `Lượt người chơi: ${currentPlayer}`;
  renderBoard();
  hideMessageClick();
  showMessageFighting("Hãy chiến đấu hết mình!"); // Display the message at the start of each game
  startButton.disabled = true; // Disable the Start Game button
}

function renderBoard() {
  playerTurnDisplay.textContent = `Lượt người chơi: ${currentPlayer}`;
  showMessageClick("Bấm bắt đầu để chơi!");
  board.innerHTML = "";
  gameBoard.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = value;
    cell.classList.add(`cell-${value}`); // Add class based on X or O
    cell.addEventListener("click", () => handleMove(index));
    if (!gameStarted || value !== "") {
      cell.classList.add("inactive");
    }
    board.appendChild(cell);
  });
}

function handleMove(index) {
  if (gameStarted && gameBoard[index] === "" && !isGameOver()) {
    gameBoard[index] = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    renderBoard();
    if (isGameOver()) {
      board.classList.add("game-over");
      const winnerCells = getWinnerCells();
      highlightWinnerCells(winnerCells); // Highlight the cells that contributed to the win
      setTimeout(() => {
        showGameMessage(getGameResult()); // Show game message with result when game is over
      }, 100);
    }
  }
}

function isGameOver() {
  hideMessageClick();
  // Check for winning conditions
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check for a win
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return true; // Return true if there's a winner
    }
  }

  // Check for a tie
  if (gameBoard.every((cell) => cell !== "")) {
    return true; // Return true if all cells are filled
  }

  return false; // Return false if the game is not over
}

function isWinner() {
  // Check for winning conditions
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Iterate through win conditions
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return true; // Return true if there's a winner
    }
  }

  return false; // Return false if no winner found
}

function getWinnerCells() {
  // Check for winning conditions
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check if any winning condition is met
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return [a, b, c]; // Return the winning cells
    }
  }
  return null; // Return null if no winning condition is met
}

function highlightWinnerCells(cells) {
  if (!cells) return; // Exit if there are no winning cells

  // Add a CSS class to each winning cell to highlight it
  cells.forEach((index) => {
    const cell = board.children[index];
    cell.classList.add("winner-cell");
  });
}

function restartGame() {
  showMessageFighting();
  hideGameMessage();
  hideMessageClick();
  // Reset game variables and board
  gameStarted = false;
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  renderBoard();
  startGame(); // Automatically start the game after restarting
}

function showGameMessage(message) {
  gameMessage.textContent = message;
  gameMessage.style.display = "block";
}

function showMessageClick(message) {
  messageClick.textContent = message;
  messageClick.style.display = "block";
}

function showMessageFighting(message) {
  messageFighting.textContent = message;
  messageFighting.style.display = "block";
}

function hideGameMessage() {
  gameMessage.style.display = "none";
}

function hideMessageClick() {
  messageClick.style.display = "none";
}

function hideMessageFighting() {
  messageFighting.style.display = "none";
}

function getGameResult() {
  hideGameMessage();
  hideMessageClick();
  hideMessageFighting();

  if (isGameOver()) {
    if (isWinner()) {
      const winningPlayer = currentPlayer === "X" ? "O" : "X";
      return `Người ${winningPlayer} đã chiến thắng! Bấm chơi lại để chơi lại!`;
    } else {
      return "Hòa! Bấm chơi lại để thử lại lần nữa!";
    }
  } else {
    return "Chưa có người chiến thắng";
  }
}

// Call renderBoard initially to set up the initial game board
renderBoard();
