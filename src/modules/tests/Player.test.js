import Player from "../Player";
import Ship from "../Ship";
import Gameboard from "../Gameboard";
import { expect } from "@jest/globals";

describe("player", () => {
    test("return name", () => {
        const player1 = new Player("Human");
        expect(player1.getName()).toBe("Human");
    });
    test("change player name", () => {
        const player1 = new Player("Human");
        player1.setName("Manny");
        expect(player1.getName()).toBe("Manny");
    });
    test("ending turn starts enemy's turn", () => {
        const player1 = new Player("Human");
        const player2 = new Player("AI");
        player1.endTurn(player2);
        expect(player1.checkTurn()).toBeFalsy;
        expect(player2.checkTurn()).toBeTruthy;
    });
    test("player can attack when it's their turn", () => {
        const enemyBoard = new Gameboard();
        const player1 = new Player("Human");
        const player2 = new Player("AI");
        const patrolBoat = new Ship(2);
        enemyBoard.placeShip(patrolBoat, 0, 0, "vertical");
        player1.attack(0, 0, player2, enemyBoard);
        expect(patrolBoat.hits).toBe(1);
    })
    test("turn ends after attack", () => {
        const enemyBoard = new Gameboard();
        const player1 = new Player("Human");
        const player2 = new Player("AI");
        const patrolBoat = new Ship(2);
        enemyBoard.placeShip(patrolBoat, 0, 0, "vertical");
        player1.attack(0, 0, player2, enemyBoard);
        expect(player1.checkTurn()).toBeFalsy;
        expect(player2.checkTurn()).toBeTruthy;
    })
})