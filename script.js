let board = Array(9).fill(null);
let currentPlayer = "Player1";
let player1 = "";
let player2 = "";

// Start Game
document.getElementById("submit").addEventListener("click", () => {
    player1 = document.getElementById("player1").value || "Player 1";
    player2 = document.getElementById("player2").value || "Player 2";
    currentPlayer = player1;
    document.querySelector(".message").textContent = `${currentPlayer}, you're up!`;
});

// Handle Cell Click
document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", cellClick);
});

function cellClick(event) {
    let cell = event.target;
    let cellIndex = parseInt(cell.id) - 1;

    if (!board[cellIndex]) {
        board[cellIndex] = currentPlayer === player1 ? "X" : "O";
        cell.textContent = board[cellIndex];
        cell.classList.add("taken");

        if (checkWin()) {
            document.querySelector(".message").textContent = `${currentPlayer} congratulations you won!`;
            disableBoard();
            return;
        }

        if (!board.includes(null)) {
            document.querySelector(".message").textContent = "It's a draw!";
            return;
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1;
        document.querySelector(".message").textContent = `${currentPlayer}, you're up`;
    }
}

// Check Win Conditions
function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Disable Board After Win
function disableBoard() {
    document.querySelectorAll(".cell").forEach(cell => {
        cell.classList.add("taken");
    });
}

// Reset Game
document.getElementById("reset").addEventListener("click", () => {
    board.fill(null);
    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
    document.querySelector(".message").textContent = "Enter player names to start!";
});
