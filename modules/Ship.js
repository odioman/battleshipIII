export default class Ship {
    hits = 0;
    constructor(length) {
        this.length = length;
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

