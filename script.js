const submitBtn = document.getElementById("submit");
const restartBtn = document.getElementById("restart");
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const playerInputDiv = document.getElementById("player-input");
const gameBoardDiv = document.getElementById("game-board");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1, player2;
let currentPlayer;
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Winning Combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Start Game after entering player names
submitBtn.addEventListener("click", () => {
    player1 = player1Input.value.trim() || "Player 1";
    player2 = player2Input.value.trim() || "Player 2";
    currentPlayer = player1;

    playerInputDiv.style.display = "none";
    gameBoardDiv.style.display = "block";
    messageDiv.textContent = `${currentPlayer}, you're up!`;
});

// Cell Click Event
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (!board[index] && gameActive) {
            board[index] = currentPlayer === player1 ? "X" : "O";
            cell.textContent = board[index];

            if (checkWin()) {
                messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
                gameActive = false;
                return;
            }

            if (board.every(cell => cell !== "")) {
                messageDiv.textContent = "It's a draw!";
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === player1 ? player2 : player1;
            messageDiv.textContent = `${currentPlayer}, you're up!`;
        }
    });
});

// Check Win Function
function checkWin() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Restart Game
restartBtn.addEventListener("click", () => {
    board.fill("");
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = player1;
    gameActive = true;
    messageDiv.textContent = `${currentPlayer}, you're up!`;
});

