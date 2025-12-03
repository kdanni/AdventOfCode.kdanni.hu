import { gotInput, toLines, toArray, getInputFile } from '../../src/puzzle-input/got-puzzle-input.mjs';
import emitter from '../../src/event-emitter.mjs';

const DAY = 16;

let solution = Number.MAX_SAFE_INTEGER;
let part2 = Number.MAX_SAFE_INTEGER;
let maxDepth = Number.MAX_SAFE_INTEGER;


emitter.on(`2024-day${DAY}`, (msg) => {
    console.log(`2024-day${DAY} eventListener` , msg);

    // part2 = part2 + msg.value;
});

export const dirs = ['N', 'E', 'S', 'W'];
export const dirOffset = (dir) => {
    if(dir === 'N') return {x: 0, y: -1};
    if(dir === '^') return {x: 0, y: -1};
    if(dir === 'E') return {x: 1, y: 0};
    if(dir === '>') return {x: 1, y: 0};
    if(dir === 'S') return {x: 0, y: 1};
    if(dir === 'v') return {x: 0, y: 1};
    if(dir === 'W') return {x: -1, y: 0};
    if(dir === '<') return {x: -1, y: 0};
}

let dir = 'E';

const map = {};
let start = {x: 0, y: 0};
let end = {x: 0, y: 0};

async function main() {
    console.log(`[day${DAY}]`);
    
    // const input = await gotInput(DAY);   
    const input = await getInputFile(DAY, 'example.txt');
    const  lines = toLines(input);
    
    for (let y = 0; y < lines.length; y++) {
        const line = lines[y];
        let logLine = '';
        for (let x = 0; x < line.length; x++) {
            let c = line.charAt(x);
            if(c === 'S') {
                c = '.';
                start = {x, y};
            }
            if(c === 'E') {
                c = '.';
                end = {x, y};
            }
            map[`${x},${y}`] = c;
            logLine += c;
        }
        console.log('#' + `${y}`.padStart(2,'0'), logLine);        
    }
    
    
    
    console.log('\n\n', map);
    console.log('start', start, 'end', end);

    console.log('solution', solution, 'part2', part2, 'maxDepth', maxDepth);
    // await neo.driver.close();
    process.emit('exit_event');
}

main();
