const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const result = document.getElementById('result');
const resetBtn = document.getElementById('resetBtn');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let moves = 0;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const handleCellClick = (e) => {
  const cell = e.target;
  const cellIndex = parseInt(cell.getAttribute('data-cell-index'));

  if (gameState[cellIndex] !== '' || !gameActive) return;

  placeMark(cell, cellIndex);
  updateGameState(cellIndex);
  checkResult();
  swapPlayer();
};

const placeMark = (cell, cellIndex) => {
  cell.textContent = currentPlayer;
  gameState[cellIndex] = currentPlayer;
  moves++;
};

const swapPlayer = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const updateGameState = (cellIndex) => {
  gameState[cellIndex] = currentPlayer;
};

const checkResult = () => {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      gameActive = false;
      cells[a].classList.add('crossed');
      cells[b].classList.add('crossed');
      cells[c].classList.add('crossed');
      displayResult(`${currentPlayer} wins!`);
      break;
    }
  }
  if (moves === 9 && gameActive) {
    gameActive = false;
    displayResult("Draw!");
  }
};

const displayResult = (message) => {
  result.textContent = message;
};

const resetGame = () => {
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  moves = 0;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('crossed');
  });
  result.textContent = '';
};

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

resetBtn.addEventListener('click', resetGame);
