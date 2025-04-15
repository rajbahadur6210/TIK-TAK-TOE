let currentPlayer = 'X';
let board = Array(9).fill(null);
let status = document.getElementById("status");

function createBoard() {
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = '';
    board.forEach((_, i) => {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.index = i;
        cell.addEventListener("click", () => makeMove(i));
        boardDiv.appendChild(cell);
    });
}

function makeMove(index) {
    if (!board[index]) {
        board[index] = currentPlayer;
        document.querySelectorAll('.cell')[index].innerText = currentPlayer;
        if (checkWin()) {
            status.innerText = `Player ${currentPlayer} wins!`;
            disableBoard();
        } else if (board.every(cell => cell)) {
            status.innerText = "It's a tie!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    const wins = [
        [0,1,2], [3,4,5], [6,7,8], // rows
        [0,3,6], [1,4,7], [2,5,8], // cols
        [0,4,8], [2,4,6]           // diagonals
    ];
    return wins.some(comb => 
        board[comb[0]] === currentPlayer &&
        board[comb[1]] === currentPlayer &&
        board[comb[2]] === currentPlayer
    );
}

function disableBoard() {
    document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener("click", makeMove));
}

function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    status.innerText = '';
    createBoard();
}

createBoard();
