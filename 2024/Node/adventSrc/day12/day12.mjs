import { gotInput, toLines, toArray, getInputFile } from '../../src/puzzle-input/got-puzzle-input.mjs';

import emitter from '../../src/event-emitter.mjs';

const DAY = 12;

let solution = 0;
let part2 = 0;

emitter.on(`2024-day${DAY}`, (msg) => {
    console.log(`2024-day${DAY} eventListener` , msg);

    // part2 = part2 + msg.value;
});

let map = {};
let maxX = 0;
let maxY = 0;
let dirs = ['N', 'E', 'S', 'W'];
const dirOffset = (dir) => {
    if(dir === 'N') return {x: 0, y: -1};
    if(dir === 'E') return {x: 1, y: 0};
    if(dir === 'S') return {x: 0, y: 1};
    if(dir === 'W') return {x: -1, y: 0};
}

async function main() {
    console.log(`[day${DAY}]`);

    // const input = await getInputFile(`${DAY}`, 'example.txt');
    
    const input = await gotInput(DAY);
    
    const lines = toLines(input);

    maxY = lines.length-1;
    for(let y = 0 ; y < lines.length ; y++) {
        let line = lines[y];
        maxX = line.length-1;
        console.log(`#${y} `, line);
        for(let x = 0; x < line.length; x++) {
            let char = line[x];
            char = Number.isInteger(char) ? Number.parseInt(char) : char;
            map[`${x},${y}`] = char;            
        }
    }
    // console.log('map', map);

    let regions = [];
    let mapCovered = {};
    for(let y = 0 ; y <= maxY ; y++) {
        for(let x = 0; x <= maxX; x++) {
           if( mapCovered[`${x},${y}`] ) {
               continue;
           }
           let region = findRegion(x, y);
           regions.push( region );
           for( let k in region || {} ) {
               mapCovered[k] = true;
           }
        }
    }
    
    let regionSizes = {};
    for(let region of regions) {
        // console.log('Object.keys(region).length', Object.keys(region).length);
        regionSizes[Object.keys(region).length] = regionSizes[Object.keys(region).length] || 0;
        regionSizes[Object.keys(region).length]++;
        if( Object.keys(region).length > 155 ) {
            console.log('');
            for(let y = 0 ; y <= maxY ; y++) {
                let line = '';
                for(let x = 0; x <= maxX; x++) {
                    if( region[`${x},${y}`] ) {
                        line += map[`${x},${y}`];
                    } else {
                        line += ' ';
                    }
                }
                console.log(`#${y} `, line);
            }
            console.log('');
        }
    }


    for(let region of regions) {
        let sides = 0;
        let perimeter = 0;
        let regionSize = Object.keys(region).length;
        let rminy = maxY;
        let rminx = maxX;
        let rmaxy = 0;
        let rmaxx = 0;
        for(let k in region) {
            let [x, y] = k.split(',').map(Number);
            if( x < rminx ) {
                rminx = x;
            }
            if( x > rmaxx ) {
                rmaxx = x;
            }
            if( y < rminy ) {
                rminy = y;
            }
            if( y > rmaxy ) {
                rmaxy = y;
            }
            for(let dir of dirs) {
                let offset = dirOffset(dir);
                let nx = x + offset.x;
                let ny = y + offset.y;
                if( !region[`${nx},${ny}`]) {
                    perimeter++;
                }
            }            
        }
        for(let y = rminy ; y <= rmaxy ; y++) {
            let northSide = {};
            let southSide = {};
            for(let x = rminx; x <= rmaxx; x++) {
                if( !region[`${x},${y}`] ) {
                    northSide[`${x},${y}`] = false;
                    southSide[`${x},${y}`] = false;
                    continue;
                } else {
                    if( !region[`${x},${y-1}`] ) {
                        northSide[`${x},${y}`] = true;
                        if( !northSide[`${x-1},${y}`] ) {
                            sides++;
                        }
                    }
                    if( !region[`${x},${y+1}`] ) {
                        southSide[`${x},${y}`] = true;
                        if( !southSide[`${x-1},${y}`] ) {
                            sides++;
                        }
                    }
                }
            }
        }
        for(let x = rminx; x <= rmaxx; x++) {
            let westSide = {};
            let eastSide = {};
            for(let y = rminy ; y <= rmaxy ; y++) {
                if( !region[`${x},${y}`] ) {
                    westSide[`${x},${y}`] = false;
                    eastSide[`${x},${y}`] = false;
                    continue;
                } else {
                    if( !region[`${x-1},${y}`] ) {
                        westSide[`${x},${y}`] = true;
                        if( !westSide[`${x},${y-1}`] ) {
                            sides++;
                        }
                    }
                    if( !region[`${x+1},${y}`] ) {
                        eastSide[`${x},${y}`] = true;
                        if( !eastSide[`${x},${y-1}`] ) {
                            sides++;
                        }
                    }
                }
            }
        }
        let totalPrice = regionSize * perimeter;
        let part2Price = regionSize * sides;
        solution += totalPrice;
        part2 += part2Price;
    }

    // console.log('regionSizes', regionSizes);
    console.log('regions', regions.length);


    console.log('solution', solution, 'part2', part2);
    process.emit('exit_event');
}

main();

function findRegion(x, y, plant, region) {
    if( x < 0 || y < 0 || x > maxX || y > maxY ) {
        return region;
    }
    plant = plant || map[`${x},${y}`];
    region = region || {};
    region[`${x},${y}`] = true;
    // console.log('findRegion', x, y, plant, region);
    for(let dir of dirs) {
        let offset = dirOffset(dir);
        let nx = x + offset.x;
        let ny = y + offset.y;
        if( region[`${nx},${ny}`]) {
            continue;
        }
        if( map[`${nx},${ny}`] && map[`${nx},${ny}`] == plant ) {
            region[`${nx},${ny}`] = true;
            region = findRegion(nx, ny, plant, region);
        }
    }
    return region;
}
