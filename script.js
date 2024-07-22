const Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    let boardHTML = "";
    gameboard.forEach((square, index) => {
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`
    })
    document.querySelector("#gameboard").innerHTML = boardHTML;
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleclick);
      if (square.innerText === "X") {
        square.classList.add("navy");
      } else if (square.innerText === "O") {
        square.classList.add("orange");
      }
    })
  }

  const update = (index, value) => {
    if (gameboard[index] === "") {
      gameboard[index] = value;
      render();
      return true;
    }
    return false;
  }

  const clear = () => {
    gameboard = ["", "", "", "", "", "", "", "", ""];
  }

  const boardStatus = () => gameboard;

  return {
    render,
    clear,
    update,
    boardStatus
  }
})();

const createPlayer = (pseudo, mark, score) => {
  return {
    pseudo,
    mark,
    score
  }
}

const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let otherPlayerIndex;
  let message = document.querySelector("#message");
  let inputs = document.querySelector("#inputs");

  const start = () => {
    players = [
      createPlayer(document.querySelector("#player1").value || "X", "X", 0),
      createPlayer(document.querySelector("#player2").value || "O", "O", 0)
    ]
    currentPlayerIndex = 0;
    otherPlayerIndex = 1;
    inputs.style.display = "none";
    message.innerText = `${players[currentPlayerIndex].pseudo}'s turn`;
    Gameboard.render();
    document.querySelector("#start-button").style.display = "none";
  }

  const restart = () => {
    Gameboard.clear();
    Gameboard.render();
    message.innerText = `${players[currentPlayerIndex].pseudo}'s turn`;
  }

  const handleclick = (event) => {
    let index = parseInt(event.target.id.split("-")[1]);
    if (Gameboard.update(index, players[currentPlayerIndex].mark)) {
      round();
    }
  }

  const round = (() => {
    let board = Gameboard.boardStatus();
    let mark = players[currentPlayerIndex].mark;
    message.innerText = `${players[otherPlayerIndex].pseudo}'s turn`;
    if (board[0] === mark && board[1] === mark && board[2] === mark || board[3] === mark && board[4] === mark && board[5] === mark || board[6] === mark && board[7] === mark && board[8] === mark || board[0] === mark && board[3] === mark && board[6] === mark || board[1] === mark && board[4] === mark && board[7] === mark || board[2] === mark && board[5] === mark && board[8] === mark || board[0] === mark && board[4] === mark && board[8] === mark || board[2] === mark && board[4] === mark && board[6] === mark) {
      players[currentPlayerIndex].score += 1;
      message.innerText = `${players[currentPlayerIndex].pseudo} wins, score : ${players[0].pseudo} - ${players[0].score} / ${players[1].pseudo} - ${players[1].score}`;
      console.log(board);
    } else if (!board.includes("")) {
      message.innerText = `It's a tie, score : ${players[0].pseudo} - ${players[0].score} / ${players[1].pseudo} - ${players[1].score}`
    }
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    otherPlayerIndex = otherPlayerIndex === 1 ? 0 : 1;
  });

  return {
    start,
    restart,
    handleclick
  }
})();

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
  Game.start();
});

const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", () => {
  Game.restart();
});
