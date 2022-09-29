import Ship from "../ship";

describe("ship", () => {
  test("get ship length", () => {
    const length = 3;
    const bobby = new Ship(length);
    expect(bobby.getLength()).toBe(3);
  });

  test("get ship array", () => {
    const bobby = new Ship(2);
    const object = [{ hit: false }, { hit: false }];
    expect(bobby.getShip()).toEqual(object);
  });

  test("ship gets hit", () => {
    const bobby = new Ship(5);
    bobby.hit(0);
    expect(bobby.getShip()[0]).toEqual({ hit: true });
  });

  test("ship sank", () => {
    const bobby = new Ship(1);
    bobby.hit(0);
    expect(bobby.isSunk()).toBe(true);
  });
});
