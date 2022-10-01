/* eslint-disable default-case */
import AI from "./ai";
import Player from "./player";
import GameBoard from "./gameboard";
import Ship from "./ship";

const modalOne = document.querySelector(".modal-one");
const modalTwo = document.querySelector(".modal-two");
const formOne = document.querySelector(".form-one");
const formTwo = document.querySelector(".form-two");
const nameInput = document.querySelector(".player-name-input");
const playerName = document.querySelector(".player-name");
const computerName = document.querySelector(".computer-name");
const playerBoardDisplay = document.querySelector(".playerBoard");
const computerBoardDisplay = document.querySelector(".computerBoard");
const addShips = document.querySelector(".addShips");
const battleshipHTML = document.querySelector("#battleship");
const carrierHTML = document.querySelector("#carrier");
const submarineHTML = document.querySelector("#submarine");
const destroyerHTML = document.querySelector("#destroyer");
const patrolboatHTML = document.querySelector("#patrolboat");
const aiSide = document.querySelector(".aiSide");
const winnerText = document.querySelector(".winner-text");

// ADD GRID DRAG STYLE
// ADD PAWS AND CATS ON GRID
// FINISH WINNERS MODAL AND ADD RESTART BTN
// TOUCH UP

// Player Ships
const carrier = new Ship(5);
const battleship = new Ship(4);
const destroyer = new Ship(3);
const submarine = new Ship(3);
const patrolboat = new Ship(2);
// AI Ships
const carrierAI = new Ship(5);
const battleshipAI = new Ship(4);
const destroyerAI = new Ship(3);
const submarineAI = new Ship(3);
const patrolboatAI = new Ship(2);

// create players
const playerBoard = new GameBoard();
const computerBoard = new GameBoard();
const player = new Player("ScardyCat");
const ai = new AI("COMPUTER", player, playerBoard);

window.addEventListener("load", () => {
  modalOne.showModal();
});

formOne.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value;
  player.setName(name);
  playerName.textContent = `${player.getName()}'s Board`;
  modalOne.close();
});

const addPlayerToDisplay = (name) => {
  playerName.textContent = name;
};

const addComputerToDisplay = (name) => {
  computerName.textContent = name;
};

const dragStarter = (element) => {
  element.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
  });
};

function placeAIShip(ship) {
  while (true) {
    let numberArray = [];
    const firstNumber = Math.floor(Math.random() * 10);
    const secondNumber = Math.floor(Math.random() * 10);
    numberArray = [firstNumber, secondNumber];
    if (
      computerBoard.checkIfShipPlacementIsValid(
        ship.getLength(),
        numberArray[0],
        numberArray[1]
      )
    ) {
      computerBoard.placeShip(ship, numberArray[0], numberArray[1], "v");
      break;
    }
  }
}

const createBoard = (boardName) => {
  const boardClass = document.querySelector(`.${boardName}`);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-x", j);
      cell.setAttribute("data-y", i);
      if (boardName === "computerBoard") {
        cell.addEventListener("click", (e) => {
          attackEvent(e.target);
        });
      } else if (boardName === "playerBoard") {
        cell.addEventListener("dragover", (e) => {
          e.preventDefault();
        });
        cell.addEventListener("drop", (e) => {
          e.preventDefault();
          dropShip(e);
        });
      }
      boardClass.appendChild(cell);
    }
  }
};

const attackEvent = (element) => {
  const x = element.getAttribute("data-x");
  const y = element.getAttribute("data-y");
  player.attack(x, y, ai, computerBoard);
  updateDisplay("computerBoard", computerBoard);
  element.style.pointerEvents = "none";
  if (computerBoard.checkIfAllShipSunk()) {
    endGame(player.getName());
  }
  ai.generateRandomAttack();
  updateDisplay("playerBoard", playerBoard);
  if (playerBoard.checkIfAllShipSunk()) {
    endGame("AI");
  }
};

const dropShip = (e) => {
  const data = e.dataTransfer.getData("text");
  const x = parseInt(e.target.getAttribute("data-x"));
  const y = parseInt(e.target.getAttribute("data-y"));
  switch (data) {
    case "battleship":
      if (playerBoard.checkIfShipPlacementIsValid(battleship.length, x, y)) {
        playerBoard.placeShip(battleship, x, y, "v");
        updateDisplay("playerBoard", playerBoard);
        const ship = document.querySelector(`#${data}`);
        addShips.removeChild(ship);
        if (addShips.childNodes.length <= 6) {
          addShips.style.display = "none";
          aiSide.style.display = "flex";
        }
      }
      break;
    case "carrier":
      if (playerBoard.checkIfShipPlacementIsValid(carrier.length, x, y)) {
        playerBoard.placeShip(carrier, x, y, "v");
        updateDisplay("playerBoard", playerBoard);
        const ship = document.querySelector(`#${data}`);
        addShips.removeChild(ship);
        if (addShips.childNodes.length <= 6) {
          addShips.style.display = "none";
          aiSide.style.display = "flex";
        }
      }
      break;
    case "submarine":
      if (playerBoard.checkIfShipPlacementIsValid(submarine.length, x, y)) {
        playerBoard.placeShip(submarine, x, y, "v");
        updateDisplay("playerBoard", playerBoard);
        const ship = document.querySelector(`#${data}`);
        addShips.removeChild(ship);
        if (addShips.childNodes.length <= 6) {
          addShips.style.display = "none";
          aiSide.style.display = "flex";
        }
      }
      break;
    case "destroyer":
      if (playerBoard.checkIfShipPlacementIsValid(destroyer.length, x, y)) {
        playerBoard.placeShip(destroyer, x, y, "v");
        updateDisplay("playerBoard", playerBoard);
        const ship = document.querySelector(`#${data}`);
        addShips.removeChild(ship);
        if (addShips.childNodes.length <= 6) {
          addShips.style.display = "none";
          aiSide.style.display = "flex";
        }
      }
      break;
    case "patrolboat":
      if (playerBoard.checkIfShipPlacementIsValid(patrolboat.length, x, y)) {
        playerBoard.placeShip(patrolboat, x, y, "v");
        updateDisplay("playerBoard", playerBoard);
        const ship = document.querySelector(`#${data}`);
        addShips.removeChild(ship);
        if (addShips.childNodes.length <= 6) {
          addShips.style.display = "none";
          aiSide.style.display = "flex";
        }
      }
      break;
  }
};

const updateDisplay = (boardName, board) => {
  const boardArray = board.getGameBoard();
  const missedAttacksArray = board.getMissedAttacksArray();

  boardArray.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.shipName) {
        if (
          cell.shipName.checkHit(cell.shipName.getShip()[cell.shipIndex]) ===
          true
        ) {
          const selectedCell = document.querySelector(
            `.${boardName} [data-x="${x}"][data-y ="${y}"]`
          );
          selectedCell.textContent = "X";
          selectedCell.classList.add("hit");
          selectedCell.classList.remove("occupied");
        } else if (
          cell.shipName.checkHit(cell.shipName.getShip()[cell.shipIndex]) ===
          false
        ) {
          if (boardName === "playerBoard") {
            const selectedCell = document.querySelector(
              `.${boardName} [data-x="${x}"][data-y ="${y}"]`
            );
            selectedCell.classList.add("occupied");
          }
        }
      }
    });
  });
  missedAttacksArray.forEach((attack) => {
    const selectedCell = document.querySelector(
      `.${boardName} [data-x="${attack.x}"][data-y ="${attack.y}"]`
    );
    selectedCell.textContent = "X";
    selectedCell.classList.add("missed");
  });
};

const endGame = (winner) => {
  modalTwo.showModal();
  winnerText.textContent = `${winner} is the winner!!`;
};

// make player ships draggable
dragStarter(battleshipHTML);
dragStarter(carrierHTML);
dragStarter(submarineHTML);
dragStarter(destroyerHTML);
dragStarter(patrolboatHTML);
// randomly place ai ships
placeAIShip(carrierAI);
placeAIShip(battleshipAI);
placeAIShip(destroyerAI);
placeAIShip(submarineAI);
placeAIShip(patrolboatAI);
// create html boards
createBoard("playerBoard");
createBoard("computerBoard");
updateDisplay("playerBoard", playerBoard);
updateDisplay("computerBoard", computerBoard);
