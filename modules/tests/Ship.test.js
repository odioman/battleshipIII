import { expect } from "@jest/globals";
import Ship from "../Ship"

test("return ship's length", () => {
    const ship = new Ship(4);
    expect(ship.length).toEqual(4)
});

test("hits increment", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hits).toEqual(1)
});

test("isSunk() should return false if hits is not length value", () => {
    const ship = new Ship(5);
    ship.hit();
    ship.hit();
    expect(ship.hits).toEqual(2);
    expect(ship.isSunk()).toBeFalsy();
});

test("isSunk() should return true if hits equals length value", () => {
    const ship = new Ship(5);
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.hits).toEqual(5);
    expect(ship.isSunk()).toBeTruthy;
})

