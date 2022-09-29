class GameBoard {
  constructor() {
    this.gameBoardArray = this.createGameBoard();
    this.missedAttacks = [];
  }

  createGameBoard = () => {
    const array = [];
    let arrayItem = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        arrayItem.push({ shipName: undefined, shipIndex: undefined });
      }
      array.push(arrayItem);
      arrayItem = [];
    }
    return array;
  };

  getGameBoard = () => this.gameBoardArray;

  checkIfShipPlacementIsValid(length, x, y) {
    if (x > 10 || x < 0 || y > 10 || y < 0 || y + length > 10) {
      return false;
    }
    for (let i = y; i < y + length; i++) {
      if (this.gameBoardArray[i][x].shipName !== undefined) {
        return false;
      }
    }
    return true;
  }

  placeShip = (ship, x, y) => {
    if (this.checkIfShipPlacementIsValid(ship.getLength(), x, y)) {
      for (let i = 0; i < ship.getLength(); i++) {
        this.gameBoardArray[y + i][x].shipName = ship;
        this.gameBoardArray[y + i][x].shipIndex = i;
      }
    }
  };

  receiveAttack = (x, y) => {
    if (this.gameBoardArray[y][x].shipName === undefined) {
      this.missedAttacks.push({ x, y });
    } else {
      this.gameBoardArray[y][x].shipName.hit(
        this.gameBoardArray[y][x].shipIndex
      );
    }
  };

  getMissedAttacksArray = () => this.missedAttacks;

  checkIfAllShipSunk = () => {
    let key = true;
    this.gameBoardArray.forEach((item) => {
      item.forEach((element) => {
        if (element.shipName) {
          if (element.shipName.isSunk() === false) {
            key = false;
          }
        }
      });
    });
    return key;
  };
}

export default GameBoard;
