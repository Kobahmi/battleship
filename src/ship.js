class Ship {
  constructor(length) {
    this.length = length;
    this.ship = this.createShip();
  }

  getLength = () => this.length;

  getShip = () => this.ship;

  createShip = () => {
    const shipArray = [];
    let health = this.length;
    while (health > 0) {
      shipArray.push({ hit: false });
      health -= 1;
    }
    return shipArray;
  };

  hit = (index) => {
    this.ship[index].hit = true;
  };

  isSunk = () => {
    if (this.ship.every(this.checkHit)) {
      return true;
    }
    return false;
  };

  checkHit = (mark) => {
    if (mark.hit === true) {
      return true;
    }
    return false;
  };
}

export default Ship;
