import AI from "../ai";
import Player from "../player";
import GameBoard from "../gameboard";

describe("ai", () => {
  test("ai, named bob, turn false", () => {
    const ai = new AI("bob");
    expect(ai.checkTurn()).toBe(false);
    expect(ai.getName()).toBe("bob");
  });
  test("ai attacks when turn true", () => {
    const board = new GameBoard();
    const board2 = new GameBoard();
    const player1 = new Player("Rob");
    const player2 = new AI("Bobby", player1, board);
    player1.attack(3, 4, player2, board2);
    player2.generateRandomAttack();
    expect(board.getMissedAttacksArray().length).toBe(1);
  });
  test("ai puts attack in array only when turn is true", () => {
    const board = new GameBoard();
    const board2 = new GameBoard();
    const player1 = new Player("Rob");
    const player2 = new AI("Bobby", player1, board);
    player1.attack(3, 4, player2, board2);
    player2.generateRandomAttack();
    player2.generateRandomAttack();
    player2.generateRandomAttack();
    expect(player2.getAttackArray().length).toBe(1);
  });
});
