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
let endNode = {x: 0, y: 0};
let start = {x: 0, y: 0}; 

async function main() {
    console.log(`[day${DAY}]`);
    
    // const input = await gotInput(DAY);   
    const input = await getInputFile(DAY, 'example.txt');
    const  lines = toLines(input);
    map = new Map16(lines);
    endNode =  { x: map.endPosition.x, y : map.endPosition.y};
    start = { x: map.startPosition.x, y : map.startPosition.y};
       
    map.printMap();

    findPath(start.x, start.y, 'E');

    map.printMap(path);

    console.log('solution', solution, 'part2', part2, 'maxDepth', maxDepth);
    // await neo.driver.close();
    process.emit('exit_event');
}

main();

function findNextSteps(x,y,dir,goal) {
    // let lkey = `${x},${y}`;
    let end = goal || endNode;
    let os = dirOffset(dir);
    let steps = [];
    if (end.x === x && end.y === y) {
        return null;
    }

    let o = dirOffset(dir);
    if(`${map.get(x + o.x, y + o.y)}` !== '#') {
        steps.push({x: x + o.x, y: y + o.y, score: 1, dir});
    }
    o = dirOffset(turnLeft(dir));
    if(`${map.get(x + o.x, y + o.y)}` !== '#') {
        steps.push({x: x + o.x, y: y + o.y, score: 1001, dir: turnLeft(dir)});
    }
    o = dirOffset(turnRight(dir));
    if(`${map.get(x + o.x, y + o.y)}` !== '#') {
        steps.push({x: x + o.x, y: y + o.y, score: 1001, dir: turnRight(dir)});
    }
    // steps.sort((a,b) => a.score - b.score);
    return steps;
}

let path =  {};


let goals = {};

function findPath(x,y,dir) {
    doStep(x,y,'E', null, 36, {x: 1, y: 12});
    doStep(x,y,'E', null, 36, {x: 2, y: 13});
    // let ss = doStep(11,1, 'E', 36);
    // let ss = doStep(11,1, 'N', 36);
    // let ss = doStep(4,11, 'N', 36, {x: 4, y: 7});
    // console.log('ss', ss);
    // solution = ss.score;
    


    // let steps = findNextSteps(x,y,dir);    
    // console.log('steps', steps);
    // for(let step of steps) {
    //     goals[`${step.x},${step.y}`] = true;
    // }
    // for(let goal in goals) {
    //     let [gx,gy] = goal.split(',');
    //     console.log('goal', goal, {x: parseInt(gx), y: parseInt(gy)});
    //     // let ss = doStep(x,y,dir, 36, {x: parseInt(gx), y: parseInt(gy)});
    //     // if(ss) {
    //     //     console.log( goal, 'ss', ss);
    //     // }
    // }
}





function doStep(x,y,dir, minscore, i, goal) {
    goal = goal || endNode;
    console.log('doStep()', x, y, dir, i, map.get(x,y), goal);
    // let cacheKey = `${x},${y},${dir}`;
    let score = NaN;
    let end = false;
    let dead = true;
    maxDepth = Math.min(maxDepth, i);
    if(i < 0) {
        // cache[cacheKey] = null;
        return null;
    }
    let steps = findNextSteps(x,y,dir,goal);
    if(!steps) {
        console.log('found end', i, goal, endNode);
        return {x,y,end: true, score: 0, minscroe: 0};
    }
    if(Array.isArray(steps) && steps.length === 0) {
        // console.log('dead end');
        return {x,y,dead: true};
    }
    // console.dir(steps, {depth: null});

    for(let step of steps) {
        console.log('xy:', x, y, 'step', step);
        let tmpScore;
        let s = doStep(step.x, step.y, step.dir, minscore, i-1, goal);
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
        ret.minscroe = minscore;
        path[`${x},${y}`] = dir;
    }
    if(dead === true && end === false) {
        ret.dead = true;
    }
    // console.log('ret', ret);
    return ret;
}