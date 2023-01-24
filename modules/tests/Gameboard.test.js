import Gameboard from "../Gameboard";
import Ship from "../Ship";

describe("Gameboard", () => {
    test("gameboard array elements with valid object", () => {
        const board = new Gameboard();
        const object = { shipName: undefined, shipIndex: undefined };
        expect(board.getGameBoard()[0][0]).toEqual(object);
    });
    test("gameboard valid vertical ship placement", () => {
        const board = new Gameboard();
        const carrier = new Ship(5)
        const x = 1;
        const y = 2;
        board.placeShip(carrier, x, y, "vertical");
        expect(board.getGameBoard()[2][1]).toEqual({
            shipName: carrier,
            shipIndex: 0,
        });
        expect(board.getGameBoard()[3][1]).toEqual({
            shipName: carrier,
            shipIndex: 1
        });
        expect(board.getGameBoard()[4][1]).toEqual({
            shipName: carrier,
            shipIndex: 2
        });
        expect(board.getGameBoard()[5][1]).toEqual({
            shipName: carrier,
            shipIndex: 3
        });
        expect(board.getGameBoard()[6][1]).toEqual({
            shipName: carrier,
            shipIndex: 4
        });
    });
    test("gameboard valid horizontal ship placement", () => {
        const board = new Gameboard();
        const carrier = new Ship(5);
        const x = 1;
        const y = 2;
        board.placeShip(carrier, x, y, "horizontal");
        expect(board.getGameBoard()[2][1]).toEqual({
            shipName: carrier,
            shipIndex: 0,
        });
        expect(board.getGameBoard()[2][2]).toEqual({
            shipName: carrier,
            shipIndex: 1,
        });
        expect(board.getGameBoard()[2][3]).toEqual({
            shipName: carrier,
            shipIndex: 2,
        });
        expect(board.getGameBoard()[2][4]).toEqual({
            shipName: carrier,
            shipIndex: 3,
        });
        expect(board.getGameBoard()[2][5]).toEqual({
            shipName: carrier,
            shipIndex: 4,
        });
    });
    test("invalid ship placement", () => {
        const board = new Gameboard();
        const carrier = new Ship(5);
        const x = 1;
        const y = 9;
        board.placeShip(carrier, x, y, "vertical");
        expect(board.getGameBoard()[9][1]).toEqual({
            shipName: undefined,
            shipIndex: undefined,
        });
    });
    test("invalid placement when occupied", () => {
        const board = new Gameboard();
        const patrolBoat = new Ship(2);
        const submarine = new Ship(3);
        board.placeShip(patrolBoat, 0, 0, "vertical");
        board.placeShip(submarine, 0, 1, "vertical");
        expect(board.getGameBoard()[1][0]).toEqual({
            shipName: patrolBoat,
            shipIndex: 1,
        });
        expect(board.getGameBoard()[2][0]).toEqual({
            shipName: undefined,
            shipIndex: undefined,
        });
    });
    test("gameboard can receive attack for vertical ship", () => {
        const board = new Gameboard();
        const patrolBoat = new Ship(2);
        board.placeShip(patrolBoat, 0, 0, "vertical");
        board.receiveAttack(0,0);
        expect(patrolBoat.hits).toBe(1);
    });
    test("gameboard can receive attack for horizontal ship", () => {
        const board = new Gameboard();
        const submarine = new Ship(3);
        board.placeShip(submarine, 0, 0, "horizontal");
        board.receiveAttack(1,0);
        expect(submarine.hits).toBe(1);
    });
    test("gameboard tracks missed attacks", () => {
        const board = new Gameboard();
        const object = { x: 0, y: 0 };
        board.receiveAttack(0, 0);
        expect(board.getMissedAttacks()[0]).toEqual(object);
    });
    test("gameboard returns false if all ships not sunk", () => {
        const board = new Gameboard();
        const submarine = new Ship(3);
        const patrolBoat = new Ship(2);
        board.placeShip(submarine, 0, 0, "vertical");
        board.placeShip(patrolBoat, 3, 4, "vertical");
        board.receiveAttack(0, 0);
        board.receiveAttack(0, 1);
        board.receiveAttack(0, 2);
        expect(board.allShipsSunk()).toBeFalsy;
    });
    test("gameboard returns true if all ships sunk", () => {
        const board = new Gameboard();
        const submarine = new Ship(3);
        const patrolBoat = new Ship(2);
        board.placeShip(submarine, 0, 0, "vertical");
        board.placeShip(patrolBoat, 3, 4, "vertical");
        board.receiveAttack(0, 0);
        board.receiveAttack(0, 1);
        board.receiveAttack(0, 2);
        board.receiveAttack(3, 4);
        board.receiveAttack(3, 5);
        expect(board.allShipsSunk()).toBeTruthy;
    });

})