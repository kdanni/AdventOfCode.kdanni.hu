import { gotInput, toLines, toArray, getInputFile } from '../../src/puzzle-input/got-puzzle-input.mjs';

import emitter from '../../src/event-emitter.mjs';

const DAY = 10;

let map = {};

let solution = 0;
let part2 = 0;

emitter.on(`2024-day${DAY}`, (msg) => {
    console.log(`2024-day${DAY} eventListener` , msg);

    // part2 = part2 + msg.value;
});

let dirs = ['N', 'E', 'S', 'W'];
const dirOffset = (dir) => {
    if(dir === 'N') return {x: 0, y: -1};
    if(dir === 'E') return {x: 1, y: 0};
    if(dir === 'S') return {x: 0, y: 1};
    if(dir === 'W') return {x: -1, y: 0};
}
let trailhead = {};

async function main() {
    console.log(`[day${DAY}]`);

    // const input = await getInputFile(`${DAY}`, 'example.txt');
    
    const input = await gotInput(DAY);
    const lines = toLines(input);
        
    for(let y = 0 ; y < lines.length ; y++) {
        let line = lines[y];
        console.log(`#${y} `, line);
        for(let x = 0; x < line.length; x++) {
            let char = line[x];
            char = Number.isInteger(char) ? Number.parseInt(char) : char;
            map[`${x},${y}`] = char;
            if(char === '0') {
                trailhead[`${x},${y}`] = {x: x, y: y, height: 0};
            }
        }
    }
    // console.log('map', map);

    for (let key in trailhead) {
        await findPaths(trailhead[key]);
    }

    console.log('solution', solution, 'part2', part2);
    process.emit('exit_event');
}

main();

async function findPaths(trailhead) {
    let nines = await evenGradualUphillSlope(trailhead);
    console.log('tralhead', trailhead, 'nines', nines);
    // - ['part2']
    let score = Object.keys(nines).length - 1;
    solution += score;
    part2 += nines['part2'];
}



// {x: x, y: y, height: 0}

async function evenGradualUphillSlope(step) {
    // console.log('step', step);
    let x = step.x;
    let y = step.y;
    let height = step.height;
    let nines = {};
    nines['part2'] = 0;
    if(height == 9) {
        nines[`${x},${y}`] = true
        nines['part2'] = 1;
        console.log('step', step, nines);
        return nines;
    }
    let nextHeight = height + 1;
    for(let dir of dirs) {
        let offset = dirOffset(dir);
        let nextX = x + offset.x;
        let nextY = y + offset.y;
        if(map[`${nextX},${nextY}`] == nextHeight) {            
            let n = await evenGradualUphillSlope({x: nextX, y: nextY, height: nextHeight});
            nines['part2'] += n['part2'];
            for(let key in n) {
                if(key === 'part2') {
                    continue;
                }
                nines[key] = true;
            }
        }
    }
    console.log('step', step, nines);
    return nines;    
}