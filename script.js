document.getElementById("submit").addEventListener("click", startGame);

let player1 = "";
let player2 = "";
let currentPlayer = "";
let board = ["", "", "", "", "", "", "", "", ""];

function startGame() {
    player1 = document.getElementById("player1").value || "Player 1";
    player2 = document.getElementById("player2").value || "Player 2";

    document.getElementById("player-form").style.display = "none";
    document.getElementById("game").style.display = "block";

    currentPlayer = player1;
    document.querySelector(".message").textContent = `${currentPlayer}, you're up`;

    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
        cell.addEventListener("click", cellClick, { once: true });
    });
}

function cellClick(event) {
    let cell = event.target;
    let cellIndex = cell.id - 1;

    if (board[cellIndex] === "") {
        board[cellIndex] = currentPlayer === player1 ? "X" : "O";
        cell.textContent = board[cellIndex];

        if (checkWin()) {
            document.querySelector(".message").textContent = `${currentPlayer} congratulations you won!`;
            disableBoard();
            return;
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1;
        document.querySelector(".message").textContent = `${currentPlayer}, you're up`;
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function disableBoard() {
    document.querySelectorAll(".cell").forEach(cell => cell.removeEventListener("click", cellClick));
}

