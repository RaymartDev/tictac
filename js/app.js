let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let scores = { X: 0, O: 0, tie: 0 };

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6] // diagonals
];

const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const gameStatus = document.getElementById('gameStatus');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const scoreTie = document.getElementById('scoreTie');
const themeToggle = document.querySelector('.theme-toggle');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️';
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');

  // Update button icon
  themeToggle.textContent = isDark ? '☀️' : '🌙';

  // Save theme preference
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Add click event listeners to all cells
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
});

function handleCellClick(index) {
  if (board[index] !== '' || !gameActive) {
    return;
  }

  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  cells[index].classList.add(currentPlayer.toLowerCase());
  cells[index].disabled = true;

  if (checkWinner()) {
    gameActive = false;
    gameStatus.textContent = `Player ${currentPlayer} wins!`;
    gameStatus.classList.add('winner');
    scores[currentPlayer]++;
    updateScoreboard();
    highlightWinningCells();
    return;
  }

  if (checkTie()) {
    gameActive = false;
    gameStatus.textContent = "It's a tie!";
    gameStatus.classList.add('tie');
    scores.tie++;
    updateScoreboard();
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  currentPlayerDisplay.textContent = currentPlayer;
}

function checkWinner() {
  return winningConditions.some(condition => {
    return condition.every(index => {
      return board[index] === currentPlayer;
    });
  });
}

function checkTie() {
  return board.every(cell => cell !== '');
}

function highlightWinningCells() {
  winningConditions.forEach(condition => {
    if (condition.every(index => board[index] === currentPlayer)) {
      condition.forEach(index => {
        cells[index].classList.add('winning-cell');
      });
    }
  });
}

function updateScoreboard() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
  scoreTie.textContent = scores.tie;
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;

  currentPlayerDisplay.textContent = currentPlayer;
  gameStatus.textContent = '';
  gameStatus.classList.remove('winner', 'tie');

  cells.forEach(cell => {
    cell.textContent = '';
    cell.disabled = false;
    cell.classList.remove('x', 'o', 'winning-cell');
  });
}

// Initialize the game
updateScoreboard();
