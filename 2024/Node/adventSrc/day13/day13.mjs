import { gotInput, toLines, toArray, getInputFile } from '../../src/puzzle-input/got-puzzle-input.mjs';

import emitter from '../../src/event-emitter.mjs';

const DAY = 13;

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

    let rules = [];
    let rule = null;
    for(let y = 0 ; y < lines.length ; y++) {
        if(y % 3 == 0) {
            rule = [];
        }
        let line = lines[y];
        rule.push(line);
        // console.log(`#${y} `, line);
        if(y % 3 == 2) {
            rules.push(rule);
        }        
    }
    // console.log('map', map);

    // console.dir(rules, {depth: null});

    for(let r = 0 ; r < rules.length ; r++) {
        console.log('Rule', rules[r]);
        rules[r] = rules[r].map((line) => {
            let r1 = /Button (.): X\+(\d+), Y\+(\d+)/;
            let r2 = /Prize: X=(\d+), Y=(\d+)/;
            if(r1.test(line)) {
                let m = line.match(r1);
                return {type: 'button', label: m[1] , x: parseInt(m[2]), y: parseInt(m[3])};
            } else if(r2.test(line)) {
                let m = line.match(r2);
                return {type: 'prize', x: parseInt(m[1]), y: parseInt(m[2])};
            }
        });
    }
    console.dir(rules, {depth: null});

    for (let r = 0; r < rules.length; r++) {    
        let rule = rules[r];
        let ax = rule[0].x;
        let ay = rule[0].y;
        let bx = rule[1].x;
        let by = rule[1].y;
        let cx = rule[2].x;
        let cy = rule[2].y;
        let b1 = (ax * cy) - (cx * ay);
        let b2 = (ax * by) - (bx * ay);
        let b = b1 / b2;
        let a = (cx - (bx * b)) / ax;
        let xx = (a * ax) + (b * bx);
        let yy = (a * ay) + (b * by);
        console.log('a', a, 'b', b, 'xx', xx, 'yy', yy);
        if(xx === cx && yy === cy) {
            if(a > 0 && b > 0 && Number.isInteger(a) && Number.isInteger(b)) {
                console.log('(xx == cx && yy == cy)');
                solution += (3 * a) + b;
            }
        }
    }

    for (let r = 0; r < rules.length; r++) {    
        let rule = rules[r];
        let ax = rule[0].x;
        let ay = rule[0].y;
        let bx = rule[1].x;
        let by = rule[1].y;
        let cx = rule[2].x + 10000000000000;
        let cy = rule[2].y + 10000000000000;
        let b1 = (ax * cy) - (cx * ay);
        let b2 = (ax * by) - (bx * ay);
        let b = b1 / b2;
        let a = (cx - (bx * b)) / ax;
        let xx = (a * ax) + (b * bx);
        let yy = (a * ay) + (b * by);
        console.log('a', a, 'b', b, 'xx', xx, 'yy', yy);
        if(xx === cx && yy === cy) {
            if(a > 0 && b > 0 && Number.isInteger(a) && Number.isInteger(b)) {
                console.log('(xx == cx && yy == cy)');
                part2 += (3 * a) + b;
            }
        }
    }

    console.log('solution', solution, 'part2', part2);
    process.emit('exit_event');
}

main();

