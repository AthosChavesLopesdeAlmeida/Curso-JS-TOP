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
    afterWin(); // Atualiza a pontuação
    return; // Não troca de jogador após vitória
  }

  // Verifica empate
  if (board.every(cell => cell !== "")) {
    roundWinner.innerHTML = "Empate!";
    afterWin()
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





function afterWin() {
  const winner = checkWinner()
  const p1scoreEl = document.getElementById('p1score')
  const p2scoreEl = document.getElementById('p2score')
  let roundsNumber = document.getElementById('rounds').value
  const endScreenEl = document.getElementById('endScreen')
  const gameScreen = document.getElementById('gameScreen')


  if(winner) {
    if(winner === 'X'){
      p1score++
      p1scoreEl.innerHTML = `Jogador 1 (X) - ${p1score} `
      resetGame()
    } else if(winner === 'O') {
      p2score++
      p2scoreEl.innerHTML = `Jogador 2 (O) - ${p2score}`
      resetGame()
    } else {
      return;
      resetGame()
    }
  }

  if(currentRound >= Number(roundsNumber)) {
    endScreenEl.style.display = 'flex'
    gameScreen.style.display = 'none'
    showEndScreen()
    return;
  } else {
    currentRound++
    roundsEl.innerHTML = `Rodada: ${currentRound}`
  }

}





function showEndScreen() {
  const winnerIs = document.getElementById('winnerIs')
  let player1 = document.getElementById('player1').value
  let player2 = document.getElementById('player2').value
  finalScore = document.getElementById('score')

  if(p1score > p2score) {
    winnerIs.innerHTML = `O(A) vencedor(a) é ${player1}`
  } else if(p2score > p1score) {
    winnerIs.innerHTML = `O(A) vencedor(a) é ${player2}`
  } else {
    winnerIs.innerHTML = 'Empate!'
  }

  finalScore.innerHTML = `Placar final: ${player1} (${p1score}) - ${player2} (${p2score})`
}





function resetGame() {
  board = Array(9).fill("");        
  currentPlayer = 'X';             
  renderBoard();                    

  const roundWinner = document.getElementById('roundWinner');
  if (roundWinner) roundWinner.innerHTML = ''
}





function playAgain(){
  let player1El = document.getElementById('player1')
  let player2El = document.getElementById('player2')
  let roundsNumberEl = document.getElementById('rounds')
  const endScreenEl = document.getElementById('endScreen')
  const setupScreen = document.getElementById('setup')

  endScreenEl.style.display = 'none'
  setupScreen.style.display = 'flex'

  p1score = 0
  p2score = 0 
  currentRound = 1
  
  player1El.value = ''
  player2El.value = ''
  roundsNumberEl.value = ''
}

const playAgainBtn = document.getElementById('playAgainBtn')
playAgainBtn.addEventListener('click', playAgain)