import GameBoard from "../gameboard";
import Ship from "../ship";

describe("gameboard", () => {
  test("gameboard array elements with valid object", () => {
    const board = new GameBoard();
    const object = { shipName: undefined, shipIndex: undefined };
    expect(board.getGameBoard()[0][0]).toEqual(object);
  });
  test("gameboard valid vertical ship placement", () => {
    const board = new GameBoard();
    const admiral = new Ship(2);
    const x = 1;
    const y = 2;
    board.placeShip(admiral, x, y, "v");
    expect(board.getGameBoard()[2][1]).toEqual({
      shipName: admiral,
      shipIndex: 0,
    });
    expect(board.getGameBoard()[3][1]).toEqual({
      shipName: admiral,
      shipIndex: 1,
    });
  });
  test("gameboard valid horizontal ship placement", () => {
    const board = new GameBoard();
    const admiral = new Ship(2);
    const x = 1;
    const y = 2;
    board.placeShip(admiral, x, y, "h");
    expect(board.getGameBoard()[2][1]).toEqual({
      shipName: admiral,
      shipIndex: 0,
    });
    expect(board.getGameBoard()[2][2]).toEqual({
      shipName: admiral,
      shipIndex: 1,
    });
  });
  test("gameboard invalid ship placement", () => {
    const board = new GameBoard();
    const admiral = new Ship(2);
    const x = 1;
    const y = 9;
    board.placeShip(admiral, x, y, "v");
    expect(board.getGameBoard()[9][1]).toEqual({
      shipName: undefined,
      shipIndex: undefined,
    });
  });
  test("gameBoard invalid placement if occupied", () => {
    const board = new GameBoard();
    const admiral = new Ship(2);
    const catShip = new Ship(3);
    board.placeShip(admiral, 0, 0, "v");
    board.placeShip(catShip, 0, 1, "v");
    expect(board.getGameBoard()[1][0]).toEqual({
      shipName: admiral,
      shipIndex: 1,
    });
    expect(board.getGameBoard()[2][0]).toEqual({
      shipName: undefined,
      shipIndex: undefined,
    });
  });
  test("gameboard can receive attack when there is a vertical ship", () => {
    const board = new GameBoard();
    const admiral = new Ship(2);
    board.placeShip(admiral, 0, 0, "v");
    board.receiveAttack(0, 1);
    expect(admiral.getShip()[1].hit).toBe(true);
  });
  test("gameboard can receive attack when there is a horizontal ship", () => {
    const board = new GameBoard();
    const admiral = new Ship(2);
    board.placeShip(admiral, 0, 0, "h");
    board.receiveAttack(1, 0);
    expect(admiral.getShip()[1].hit).toBe(true);
  });
  test("gameboard keeps track of missed attacks", () => {
    const board = new GameBoard();
    const object = { x: 0, y: 0 };
    board.receiveAttack(0, 0);
    expect(board.getMissedAttacksArray()[0]).toEqual(object);
  });
  test("gameboard can check if every ship is sunk", () => {
    const board = new GameBoard();
    const admiral = new Ship(1);
    const cat = new Ship(1);
    board.placeShip(admiral, 0, 0, "v");
    board.placeShip(cat, 3, 4, "v");
    board.receiveAttack(0, 0);
    expect(board.checkIfAllShipSunk()).toBe(false);
  });
});
