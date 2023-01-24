export default class Gameboard {
    constructor() {
        this.gameBoardArray = this.createGameBoard()
        this.missedAttacks = [];     
   }

   getGameBoard() {
       return this.gameBoardArray
   }

   getMissedAttacks() {
       return this.missedAttacks;
   }

   createGameBoard() {
       let array = [];
       let arrayItem = [];
       for (let i = 0; i < 10; i++) {
           for (let j = 0; j < 10; j++) {
               arrayItem.push({ shipName: undefined, shipIndex: undefined })
           }
           array.push(arrayItem);
           arrayItem = [];
       }
       return array;
   }

   checkValidShipPlacement(length, x, y, direction) {
       if (direction === "vertical") {
           if (x > 10 || x < 0 || y > 10 || y < 0 || y + length > 10) {
               return false;
           }
           for (let i = y; i < y + length; i++) {
               if (this.gameBoardArray[i][x].shipName !== undefined) {
                   return false;
               }
           }
           return true;
       }

       if (direction === "horizontal") {
           if (x > 10 || x < 0 || y > 10 || y < 0 || x + length > 10) {
               return false;
           }
           for (let i = x; i < x + length; i++) {
               if (this.gameBoardArray[y][i].shipName !== undefined) {
                   return false
               }
           }
           return true;
       }
   }

   placeShip(ship, x, y, direction) {
       if (direction === "vertical") {
           if (this.checkValidShipPlacement(ship.length, x, y, "vertical")) {
               for (let i = 0; i < ship.length; i++) {
                   this.gameBoardArray[y + i][x].shipName = ship;
                   this.gameBoardArray[y + i][x].shipIndex = i
               }
           }
       }
       if (direction === "horizontal") {
           if (this.checkValidShipPlacement(ship.length, x, y, "horizontal")) {
               for (let i = 0; i < ship.length; i++) {
                   this.gameBoardArray[y][x + i].shipName = ship;
                   this.gameBoardArray[y][x + i].shipIndex = i;
               }
           }
       }
   }

   receiveAttack(x,y) {
       if (this.gameBoardArray[y][x].shipName === undefined) {
           this.missedAttacks.push({ x, y });
       } else {
           this.gameBoardArray[y][x].shipName.hit(this.gameBoardArray[y][x].shipPosition)
       }
   }

   allShipsSunk() {
       let key = true;
       this.gameBoardArray.forEach((item) => {
           item.forEach((element) => {
               if (element.shipName) {
                   if (element.shipName.isSunk() === false) {
                    key = false;
                   } 
               }
           })
       })
       return key;
   }
}
