export class Robot { 
    constructor(x, y, v, maxX, maxY) {
        this.x = x;
        this.y = y;
        this.v = v;
        this.maxX = maxX || 101;
        this.maxY = maxY || 103;
    }
    move() {
        this.x += this.v.x;
        this.y += this.v.y;
        if(this.x < 0) {
            this.x = this.maxX + this.x;
        } else if(this.x >= this.maxX) {
            this.x = this.x - this.maxX; 
        }
        if(this.y < 0) {
            this.y = this.maxY + this.y;
        } else if(this.y >= this.maxY) {
            this.y = this.y - this.maxY;
        }
    }
    printNextMove() {
        let nx = this.x + this.v.x;
        let ny = this.y + this.v.y;
        if(nx < 0) {
            nx = this.maxX + nx;
        } else if(nx >= this.maxX) {
            nx = nx - this.maxX; 
        }
        if(ny < 0) {
            ny = this.maxY + ny;
        } else if(ny >= this.maxY) {
            ny = ny - this.maxY;
        }
        console.log(`Robot(${this.x},${this.y},(${this.v.x},${this.v.y}))`, '->', `Robot(${nx},${ny})`);
    }   
    toString() {
        return `Robot(${this.x},${this.y},${this.v})`;
    }
}