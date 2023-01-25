import Player from "./Player";

class AI extends Player {
    constructor(name, enemyPlayer, enemyBoard) {
        super(name);
        this.turn = false;
        this.enemyPlayer = enemyPlayer;
        this.enemyBoard = enemyBoard;
        this.attackArray = [];
    }

    getAttackArray() {
        return this.attackArray;
    }

    generateRandomAttack() {
        if (this.checkTurn()) {
            const numberObj = { x: undefined, y: undefined };
            while (true) {
                const firstNum = Math.floor(Math.random() * 10);
                const secondNum = Math.floor(Math.random() * 10);
                numberObj.x = firstNum;
                numberObj.y = secondNum;
                if (
                    !this.attackArray.some(
                        (e) => e.x === numberObj.x && e.y === numberObj.y
                    )
                ) {
                    this.attackArray.push(numberObj);
                    this.attack(numberObj.x, numberObj.y, this.enemyPlayer, this.enemyBoard);
                    break;
                }
            }
        }
    }
}

export default AI;