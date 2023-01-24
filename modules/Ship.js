export default class Ship {
    hits = 0;
    constructor(length, position, ship) {
        this.length = length;
        this.position = position;
        this.ship = ship
        this.sunk = false;       
    }

    hit() {
        this.hits++
    }

    isSunk() {
       if (this.hits >= this.length) {
            return this.sunk = true;
       }    
    }
}

