import Player from "../player";
import Ship from "../ship";
import GameBoard from "../gameboard";

describe("player", () => {
  test("have name", () => {
    const player1 = new Player("bobby");
    expect(player1.getName()).toBe("bobby");
  });
  test("player can change name", () => {
    const player1 = new Player("bob");
    player1.setName("bobby");
    expect(player1.getName()).toBe("bobby");
  });
  test("ending turn starts enemy turn", () => {
    const player1 = new Player("bobby");
    const player2 = new Player("rocky");
    player1.endTurn(player2);
    expect(player1.checkTurn()).toBe(false);
    expect(player2.checkTurn()).toBe(true);
  });
  test("player can attack when turn is true", () => {
    const enemyBoard = new GameBoard();
    const player1 = new Player("bobby");
    const player2 = new Player("rocky");
    const captain = new Ship(1);
    enemyBoard.placeShip(captain, 0, 0);
    player1.attack(0, 0, player2, enemyBoard);
    expect(captain.getShip()[0].hit).toBe(true);
  });
  test("turn ends after attack", () => {
    const enemyBoard = new GameBoard();
    const player1 = new Player("bobby");
    const player2 = new Player("rocky");
    const captain = new Ship(1);
    enemyBoard.placeShip(captain, 0, 0);
    player1.attack(0, 0, player2, enemyBoard);
    expect(player1.checkTurn()).toBe(false);
    expect(player2.checkTurn()).toBe(true);
  });
});
