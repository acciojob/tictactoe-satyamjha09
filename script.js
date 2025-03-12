document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const message = document.querySelector(".message");
  const restartBtn = document.querySelector("#restart");
  let currentPlayer = "X";
  let board = ["", "", "", "", "", "", "", "", ""];
  let gameActive = true;

  // Function to check for a winner
  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        message.innerText = `${currentPlayer} wins!`;
        gameActive = false;
        return;
      }
    }

    // Check for a draw
    if (!board.includes("")) {
      message.innerText = "It's a draw!";
      gameActive = false;
    }
  }

  // Function to handle cell click
  function handleClick(event) {
    const cell = event.target;
    const index = cell.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    cell.innerText = currentPlayer;
    cell.classList.add("taken");

    checkWinner();

    // Switch players
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.innerText = `${currentPlayer}, you're up!`;
  }

  // Reset the game
  function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    message.innerText = "Player X, you're up!";
    cells.forEach(cell => {
      cell.innerText = "";
      cell.classList.remove("taken");
    });
  }

  // Add event listeners to all cells
  cells.forEach((cell, index) => {
    cell.setAttribute("data-index", index);
    cell.addEventListener("click", handleClick);
  });

  // Add event listener for restart button
  restartBtn.addEventListener("click", restartGame);
});
