let currentPlayer = 'X'
let board = Array(9).fill("");
let p1score = 0
let p2score = 0
p1Symbol = 'X'
p2Symbol = 'O'
let currentRound = 1 

function startGame() {
  let player1 = document.getElementById('player1').value
  let player2 = document.getElementById('player2').value
  let roundsNumber = document.getElementById('rounds').value
  let errorMessage = document.getElementById('error')
  let gameScreen = document.getElementById('gameScreen')
  let setupScreen = document.getElementById('setup')

  if (player1 === '' || player2 === '' || roundsNumber === '0' || roundsNumber %2 === 0 || roundsNumber < 0 || player1 === player2) {
    errorMessage.innerHTML = 'Preencha todos os campos corretamente. O número de rodadas deve ser ímpar.'
  } else {
    gameScreen.style.display = 'flex'
    setupScreen.style.display = 'none'
  }
}

let startBtn = document.getElementById('startBtn')
startBtn.addEventListener('click', function() {
  startGame()
  renderBoard()
})

function renderBoard() {
  const boardEl = document.getElementById('gameboard')
  boardEl.innerHTML = ''
  
  board.forEach((cell, index) => {
    const cellBtn = document.createElement('button')
    cellBtn.className = 'cell'
    cellBtn.innerHTML = cell
    cellBtn.dataset.index = index
    cellBtn.addEventListener('click', function() {
      handleCellClick(index)
    })
    boardEl.appendChild(cellBtn)
  })
}

function handleCellClick(index) {
  if (board[index] !== '') return;

  // Impede jogadas após vitória
  if (checkWinner()) return;

  board[index] = currentPlayer;
  renderBoard();

  const winner = checkWinner();
  const roundWinner = document.getElementById('roundWinner');
  let player1 = document.getElementById('player1').value;
  let player2 = document.getElementById('player2').value;

  if (winner) {
    roundWinner.innerHTML = `${winner === 'X' ? player1 : player2} é o(a) vencedor(a)`;
    return; // Não troca de jogador após vitória
  }

  // Verifica empate
  if (board.every(cell => cell !== "")) {
    roundWinner.innerHTML = "Empate!";
    return;
  }

  // Troca o jogador
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  // Atualiza o texto do jogador atual
  const nowPlaying = document.getElementById('currentPlayer');
  nowPlaying.innerHTML = currentPlayer === 'X' ? 'Jogador 1' : 'Jogador 2';
}


function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // 'X' ou 'O'
    }
  }
  return null; // Sem vencedor

}