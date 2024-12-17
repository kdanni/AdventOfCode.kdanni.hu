export const dirs = ['N', 'E', 'S', 'W'];
export const dirOffset = (dir) => {
    if(dir === 'N') return {x: 0, y: -1};
    if(dir === 'E') return {x: 1, y: 0};
    if(dir === 'S') return {x: 0, y: 1};
    if(dir === 'W') return {x: -1, y: 0};
}
export const turnLeft = (dir) => {
    let i = dirs.indexOf(dir);
    i = (i + 3) % 4;
    return dirs[i];
}
export const turnRight = (dir) => {
    let i = dirs.indexOf(dir);
    i = (i + 1) % 4;
    return dirs[i];
}

export class Map16 {
    constructor(inputLines) {
        this.map = {};
        this.maxX = 0;
        this.maxY = 0;
        this.maxY = inputLines.length;
        this.startPosition = {x: 0, y: 0};
        this.endPosition = {x: 0, y: 0};
        for(let y = 0 ; y < inputLines.length ; y++) {
            let line = inputLines[y];
            if(line.length > this.maxX) {
                this.maxX = line.length;
            }
            for(let x = 0 ; x < line.length ; x++) {
                let c = line.charAt(x);
                this.map[`${x},${y}`] = c;
                if(c === 'S') {
                    this.startPosition = {x, y};
                    // this.map[`${x},${y}`] = '.';
                }
                if(c === 'E') {
                    this.endPosition = {x, y};
                    this.map[`${x},${y}`] = '$';
                }
            }
        }
    }

    get(x, y) {
        return this.map[`${x},${y}`];
    }

    set(x, y, c) {
        this.map[`${x},${y}`] = c;
    }

    getDeepCopy() {
        let newMap = new Map16([]);
        newMap.maxX = this.maxX;
        newMap.maxY = this.maxY;
        newMap.startPosition = this.startPosition;
        newMap.endPosition = this.endPosition;
        for(let y = 0 ; y < this.maxY ; y++) {
            for(let x = 0 ; x < this.maxX ; x++) {
                newMap.map[`${x},${y}`] = this.map[`${x},${y}`];
            }
        }
        return newMap;
    }

    printMap(path) {
        path = path || {};
        console.log('');
        let header1 = '    ';
        let header2 = '    ';
        let header3 = '    ';
        for(let x = 0 ; x < this.maxX ; x++) {
            header1 += `${x}`.padStart(3,'0').charAt(0);
            header2 += `${x}`.padStart(3,'0').charAt(1);
            header3 += `${x}`.padStart(3,'0').charAt(2);
        }
        console.log(header1);
        console.log(header2);
        console.log(header3);
        for(let y = 0 ; y < this.maxY ; y++) {
            let line = `${y}`.padStart(3, '0') + ' ';
            for(let x = 0 ; x < this.maxX ; x++) {
                let c = this.map[`${x},${y}`];
                if(path[`${x},${y}`]) {
                    c = path[`${x},${y}`];
                }
                line += c;
            }
            console.log(line);
        }
        console.log('');
    }
}