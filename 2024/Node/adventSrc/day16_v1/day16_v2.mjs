import { gotInput, toLines, toArray, getInputFile } from '../../src/puzzle-input/got-puzzle-input.mjs';
import emitter from '../../src/event-emitter.mjs';

const DAY = 16;

let solution = 0;
let part2 = 0;

emitter.on(`2024-day${DAY}`, (msg) => {
    console.log(`2024-day${DAY} eventListener` , msg);

    // part2 = part2 + msg.value;
});

import { Map16, dirs, dirOffset, turnLeft, turnRight } from './map.mjs';
import { A_Star, Node } from './a-star.mjs';

let map;
let aStar;

async function main() {
    console.log(`[day${DAY}]`);
    
    const input = await gotInput(DAY);   
    const  lines = toLines(input);
    map = new Map16(lines);
    
    let start = new Node(map.start.x, map.start.y, 'E', distance, neighbors);
    let goal = new Node(map.start.x, map.start.y, null, distance, neighbors);
    
    
    aStar = new A_Star(map.start, map.end, h);
    map.printMap();

    console.log('solution', solution, 'part2', part2);
    // await neo.driver.close();
    process.emit('exit_event');
}

main();

function h() {
    return 0;
}

function distance(a, b) {
    a    
}

function neighbors(node) {
    
}