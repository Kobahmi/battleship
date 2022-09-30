class Player {
  constructor(name) {
    this.name = name;
    this.turn = true;
  }

  getName = () => this.name;

  checkTurn = () => this.turn;

  setName = (name) => {
    this.name = name;
  };

  startTurn = () => {
    if (this.turn === false) {
      this.turn = true;
    }
  };

  endTurn = (player2) => {
    if (this.turn === true) {
      this.turn = false;
    }
    player2.startTurn();
  };

  attack(x, y, enemyPlayer, enemyBoard) {
    if (this.checkTurn) {
      enemyBoard.receiveAttack(x, y);
      this.endTurn(enemyPlayer);
    }
  }
}

export default Player;
