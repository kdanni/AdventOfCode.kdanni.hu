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

import { Map16, dirs, dirOffset, turnLeft, turnRight } from './map.mjs';

let map;
let end = {x: 0, y: 0};
let start = {x: 0, y: 0}; 

async function main() {
    console.log(`[day${DAY}]`);
    
    const input = await gotInput(DAY);   
    // const input = await getInputFile(DAY, 'example.txt');
    const  lines = toLines(input);
    map = new Map16(lines);
    end =  { x: map.endPosition.x, y : map.endPosition.y};
    start = { x: map.startPosition.x, y : map.startPosition.y};
       
    map.printMap();

    findPath(start.x, start.y, 'E');

    map.printMap(path);

    console.log('solution', solution, 'part2', part2, 'maxDepth', maxDepth);
    // await neo.driver.close();
    process.emit('exit_event');
}

main();

// let seenSteps = {};

function findNextSteps(x,y,dir) {
    let lkey = `${x},${y}`;
    let os = dirOffset(dir);
    let steps = [];
    if (end.x === x && end.y === y) {
        return null;
    }

    for(let d of dirs) {
        let o = dirOffset(d);
        if(!(`${d}` === `${dir}` || `${d}` === `${turnLeft(dir)}` || `${d}` === `${turnRight(dir)}`)) {
            continue;
        }
        let nextStepScore = Number.MAX_SAFE_INTEGER;
        let nkey = `${x + o.x},${y + o.y}`;
        // if(seenSteps[`${lkey};${nkey}`]) {
        //     continue;
        // }
        if(`${map.get(x + o.x, y + o.y)}` !== '#') {            
            if(o.x === os.x && o.y === os.y) {
                nextStepScore = 1;
            } else {
                nextStepScore = 1001;
            }
            steps.push({x: x + o.x, y: y + o.y, score: nextStepScore, dir: d});
            // seenSteps[`${lkey};${nkey}`] = true;
        }
    }
    steps.sort((a,b) => a.score - b.score);
    return steps;
}

let path =  {};

function findPath(x,y,dir) {
    let ss = doStep(x,y,dir, 3600);
    console.log('ss', ss);
    solution = ss.score;
}


let cache = {};


function doStep(x,y,dir,i) {
    console.log('doStep()', x, y, dir, i, map.get(x,y));
    let cacheKey = `${x},${y},${dir}`;
    if(cache[cacheKey]) {
        console.log('cache hit', cacheKey, cache[cacheKey]);
        return cache[cacheKey];
    }
    let score = NaN;
    let end = false;
    let dead = true;
    maxDepth = Math.min(maxDepth, i);
    if(i < 0) {
        console.log('depth limit reached');
        cache[cacheKey] = null;
        return null;
    }
    let steps = findNextSteps(x,y,dir);
    if(!steps) {
        console.log('found end', i);
        cache[cacheKey] = {x,y,end: true, score: 0};
        return {x,y,end: true, score: 0};
    }
    if(Array.isArray(steps) && steps.length === 0) {
        console.log('dead end');
        cache[cacheKey] = {x,y,dead: true};
        return {x,y,dead: true};
    }
    // console.dir(steps, {depth: null});

    for(let step of steps) {
        let tmpScore;
        let s = doStep(step.x, step.y, step.dir, i-1);
        if(s === null) {
            continue;            
        }
        if(s.end) {
            end = true;
        }
        if(!isNaN(s.score) && !isNaN(step.score)) {
            tmpScore = s.score + step.score;
            // console.log('tmpScore', tmpScore);
        }
        if(tmpScore && isNaN(score)) {
            score = tmpScore;
        }
        if(tmpScore && tmpScore < score) {
            score = tmpScore;            
        }
        if(!s.dead) {
            dead = false;
        }
        // console.log('next step + s', step, s, tmpScore, score);        
    }
    let ret = {x,y,score};
    if(end) {
        ret.end = true;  
        path[`${x},${y}`] = dir;
    }
    if(dead === true && end === false) {
        ret.dead = true;
    }
    console.log('ret', ret);
    cache[cacheKey] = ret;
    return ret;
}