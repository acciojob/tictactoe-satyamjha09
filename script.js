// Get the necessary elements from the HTML
const submitBtn = document.getElementById('submit');
const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const playerNamesDiv = document.getElementById('player-names');
const boardContainer = document.getElementById('board-container');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

let currentPlayer = 'Player 1';
let player1Name = '';
let player2Name = '';
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Tracks the game state
let isGameOver = false;

// Event listener for submitting player names
submitBtn.addEventListener('click', () => {
  player1Name = player1Input.value.trim() || 'Player 1';
  player2Name = player2Input.value.trim() || 'Player 2';

  if (!player1Name || !player2Name) return;

  // Hide the input screen and show the game board
  playerNamesDiv.classList.add('hidden');
  boardContainer.classList.remove('hidden');

  // Set the message based on the first player
  messageDiv.textContent = `${player1Name}, you're up!`;
});

// Event listener for each cell in the board
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (isGameOver) return;
    const cellIndex = cell.id - 1;

    // If the cell is already clicked, do nothing
    if (gameBoard[cellIndex] !== '') return;

    // Mark the cell with X or O
    gameBoard[cellIndex] = currentPlayer === 'Player 1' ? 'X' : 'O';
    cell.textContent = gameBoard[cellIndex];

    // Check if the current player won
    if (checkWin()) {
      messageDiv.textContent = `${currentPlayer === 'Player 1' ? player1Name : player2Name}, congratulations you won!`;
      isGameOver = true;
      return;
    }

    // Check for draw
    if (gameBoard.every(cell => cell !== '')) {
      messageDiv.textContent = "It's a draw!";
      isGameOver = true;
      return;
    }

    // Switch players
    currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
    messageDiv.textContent = `${currentPlayer === 'Player 1' ? player1Name : player2Name}, you're up!`;
  });
});

// Function to check for a winner
function checkWin() {
  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombination.some(combination => {
    const [a, b, c] = combination;
    return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
  });
}

