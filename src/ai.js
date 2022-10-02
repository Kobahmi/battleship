import Player from "./player";

class AI extends Player {
  constructor(name, enemyPlayer, enemyBoard) {
    super(name);
    this.turn = false;
    this.enemyPlayer = enemyPlayer;
    this.enemyBoard = enemyBoard;
    this.attackArray = [];
  }

  getAttackArray = () => this.attackArray;

  generateRandomAttack = () => {
    if (this.checkTurn()) {
      const numberObject = { x: undefined, y: undefined };
      while (true) {
        const firstNumber = Math.floor(Math.random() * 10);
        const secondNumber = Math.floor(Math.random() * 10);
        numberObject.x = firstNumber;
        numberObject.y = secondNumber;
        if (
          !this.attackArray.some(
            (e) => e.x === numberObject.x && e.y === numberObject.y
          )
        ) {
          this.attackArray.push(numberObject);
          this.attack(
            numberObject.x,
            numberObject.y,
            this.enemyPlayer,
            this.enemyBoard
          );
          break;
        }
      }
    }
  };
}

export default AI;
