import { gotInput, toLines, toArray, getInputFile } from '../../src/puzzle-input/got-puzzle-input.mjs';

import emitter from '../../src/event-emitter.mjs';

const DAY = 14;

let solution = 0;
let part2 = 0;

emitter.on(`2024-day${DAY}`, (msg) => {
    console.log(`2024-day${DAY} eventListener` , msg);

    // part2 = part2 + msg.value;
});

let xMax = 101;
let yMax = 103;

import { RobotMap } from './robot-map.mjs';
import { Robot } from './robot.mjs';

let rules = [];

async function main() {
    console.log(`[day${DAY}]`);
    
    const input = await gotInput(DAY);
    
    // const input = await getInputFile(`${DAY}`, 'example.txt');
    // xMax = 11;
    // yMax = 7;
    
    const  lines = toLines(input);
    
    for(let y = 0 ; y < lines.length ; y++) {
        let line = lines[y];
        // console.log(`#${y} `, line);
        let rule = null;
        let m = /p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/.exec(line) || [];
        if(m.length > 4) {
            rule = {
                p: {x: parseInt(m[1]), y: parseInt(m[2])},
                v: {x: parseInt(m[3]), y: parseInt(m[4])}
            }
        }
        rules.push(rule);
    }

    // console.dir(rules, {depth: null});

    let robots = new RobotMap(xMax, yMax);
    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        const {p, v} = rule;        
        robots.push(new Robot(p.x, p.y, v, xMax, yMax));
    }

    robots.printMap();

    
    for (let i = 0; i < 10000; i++) {
        // robots.printNextMove();
        // robots.robots[0].printNextMove();
        robots.move();
        robots.printMap(true);
        // await new Promise((resolve) => setTimeout(resolve, 1000));
    }


    console.log('solution', solution, 'part2', part2);
    process.emit('exit_event');
}

main();