import { gotInput, toLines, toArray, getInputFile } from '../../src/puzzle-input/got-puzzle-input.mjs';

let xMax = 0;
let yMax = 0;

const dirOffset = (dir) => {
    if(dir === 'N') return {x: 0, y: -1};
    if(dir === 'E') return {x: 1, y: 0};
    if(dir === 'S') return {x: 0, y: 1};
    if(dir === 'W') return {x: -1, y: 0};
}
const dirLeft = (dir) => {
    if(dir === 'N') return 'W';
    if(dir === 'E') return 'N';
    if(dir === 'S') return 'E';
    if(dir === 'W') return 'S';
}
const dirRight = (dir) => {
    if(dir === 'N') return 'E';
    if(dir === 'E') return 'S';
    if(dir === 'S') return 'W';
    if(dir === 'W') return 'N';
}

let map = {};
let guard = {};
let route = [];
let possibleXY = {};
let possibleXYOptimal = [];
let O = {};
let origGuard = {};

async function main() {
    console.log('[day6]');

    const input = await gotInput(6);
    // const input = await getInputFile(6, 'example.txt');
    // const input = await getInputFile(6, 'input2.txt');
    const lines = toLines(input);
        
    let solution = 0;
    let part2 = 0;
    yMax = lines.length - 1;
    xMax = lines[0].length - 1;
    for(let y = 0 ; y < lines.length ; y++) {
        for(let x = 0 ; x < lines[y].length ; x++) {
            map[`${x},${y}`] = lines[y][x];
            // cycles[`${x},${y}`] = {};
            if(map[`${x},${y}`] === '^') {
                map[`${x},${y}`] = '.';
                guard = {pos: {x, y}, dir: 'N', off: false, origPos: {x, y}};
                route.push({x, y});
            }
        }
    }
    origGuard = JSON.parse(JSON.stringify(guard));    
    // console.log('xMax', xMax, 'yMax', yMax, map[`${xMax},${yMax}`]);
    
    // printMap(map);
    // printGuard(map, guard);
    printRoute(map, route);
    
    // console.log('\n\n**************************************\n');

    for(let i = 0 ; i < 10000 ; i++) {
        if(guard.off) {
            break;
        }
        moveGuard();
    }
    
    let dedup = {};
    for(let steps of route) { 
        dedup[`${steps.x},${steps.y}`] = true;
        // possibleXY[`${steps.x},${steps.y}`] = true;
    }
    solution = Object.keys(dedup).length;

    
    // for(let y = 0 ; y < lines.length ; y++) {
    //     for(let x = 0 ; x < lines[y].length ; x++) {
    //         possibleXY[`${x},${y}`] = true;
    //     }
    // }
    

    // for(let key in dedup) {
    //     possibleXY[key] = true;
    //     let x = Number.parseInt(key.split(',')[0]);
    //     let y = Number.parseInt(key.split(',')[1]);
    //     for(let dir of ['N', 'E', 'S', 'W']) {
    //         let newPos = {x: x + dirOffset(dir).x, y: y + dirOffset(dir).y};
    //         if(newPos.x >= 0 && newPos.y >= 0 && newPos.x <= xMax && newPos.y <= yMax) {
    //             possibleXY[`${newPos.x},${newPos.y}`] = true;
    //         }
    //     }        
    // }

    let promises = [];
    // let falseCount = 0;    
    
    // for(let key in possibleXY) {
    //     let x = Number.parseInt(key.split(',')[0]);
    //     let y = Number.parseInt(key.split(',')[1]);
    //     let func = async () => {
    //         if(await v3(x,y) === true) {
    //             O[`${x},${y}`] = true;
    //             // console.log('O', x, y);
    //         }
    //         // console.log('not O', x, y);
    //     }
    //     promises.push(func());
    // }

    let dedupOptimal = {};
    for(let xyg of possibleXYOptimal) {
        if(dedupOptimal[`${xyg.xy.x},${xyg.xy.y}`]) {
            continue;
        }
        let x = xyg.xy.x;
        let y = xyg.xy.y;
        dedupOptimal[`${x},${y}`] = true;
        let func = async () => {
            if(await v3(x,y,xyg.guard) === true) {
                O[`${x},${y}`] = true;
                // console.log('O', x, y);
            }
            // console.log('not O', x, y);
        }
        promises.push(func());
    }

    
    await Promise.all(promises);
    await new Promise((resolve) => { setTimeout(resolve, 1000); });
    part2 = Object.keys(O).length;

    
    console.log('\n\n************* Final *************\n');
    printRoute(map, route);


    // console.log('\nsolution', solution, 'part2', part2 - correction, 'cycles.length', cycles.length - correction);
    console.log('\nsolution', solution, 'part2', part2 , 'possibleXY', Object.keys(possibleXYOptimal).length, 'dedupOptimal', Object.keys(dedupOptimal).length);

    process.emit('exit_event');
}

main();


async function v3(x,y, newGuardPos) {
    // console.log('v3()', x, y);
    if(guard.origPos.x === x && guard.origPos.y === y) {
        return false;
    }
    if(map[`${x},${y}`] !== '.') {
        return false;
    }
    let newMap = JSON.parse(JSON.stringify(map));
    newMap[`${x},${y}`] = 'O';
    // printMap(newMap);
    let newGuard = JSON.parse(JSON.stringify(origGuard));
    if(newGuardPos) {
        newGuard.pos = newGuardPos.pos;
        newGuard.dir = newGuardPos.dir;
    }
    let newRoute = [];
    newRoute.push({x:newGuard.pos.x,y:newGuard.pos.y, dir: newGuard.dir});
    for(let i = 0 ; i < 100000 ; i++) {
        if(newGuard.off) {
            return false;
        }
        for(let r = 0 ; r < newRoute.length - 1 ; r++) {
            let oldPos = newRoute[r];
            if(oldPos.x === newGuard.pos.x && oldPos.y === newGuard.pos.y && oldPos.dir === newGuard.dir) {
                return true;
            }
        }
        let dir = newGuard.dir;
        let pos = newGuard.pos;
        let newPos = {x: pos.x + dirOffset(dir).x, y: pos.y + dirOffset(dir).y};    
        if(newPos.x < 0 || newPos.y < 0 || newPos.x > xMax || newPos.y > yMax) {
            newGuard.off = true;
            return false;
        }
        if(newMap[`${newPos.x},${newPos.y}`] === '.') {
            newRoute.push({x: newPos.x, y: newPos.y, dir: newGuard.dir});
            newGuard.pos = {x: newPos.x, y: newPos.y};
            continue;
        }
        let newDir = dir;
        while (newMap[`${newPos.x},${newPos.y}`] === '#' || newMap[`${newPos.x},${newPos.y}`] === 'O') {
            newDir = dirRight(newDir);
            newPos = {x: pos.x + dirOffset(newDir).x, y: pos.y + dirOffset(newDir).y};
            if(newPos.x < 0 || newPos.y < 0 || newPos.x > xMax || newPos.y > yMax) {
                newGuard.off = true;
                return false;
            }
            if(newMap[`${newPos.x},${newPos.y}`] === '.') {
                newGuard.dir = newDir;
                newRoute.push({x: newGuard.pos.x, y: newGuard.pos.y, dir: newGuard.dir});
                break;
            }
            // 360°
            if(newDir === newGuard.dir) {
                newGuard.off = true;
                return false;
            }
        }
    } // for simulation
}


function moveGuard() {
    let dir = guard.dir;
    let pos = guard.pos;
    let newPos = {x: pos.x + dirOffset(dir).x, y: pos.y + dirOffset(dir).y};
    if(newPos.x < 0 || newPos.y < 0 || newPos.x > xMax || newPos.y > yMax) {
        guard.off = true;
        return;
    }
    if(map[`${newPos.x},${newPos.y}`] === '.') {
        possibleXYOptimal.push({xy: {x: newPos.x, y: newPos.y}, guard: { pos: {x: pos.x, y: pos.y}, dir}});
        route.push({x: newPos.x, y: newPos.y});
        guard.pos = {x: newPos.x, y: newPos.y};
        return;
    }
    let newDir = dir;
    while (map[`${newPos.x},${newPos.y}`] === '#') {
        newDir = dirRight(newDir);
        newPos = {x: pos.x + dirOffset(newDir).x, y: pos.y + dirOffset(newDir).y};
        if(newPos.x < 0 || newPos.y < 0 || newPos.x > xMax || newPos.y > yMax) {
            guard.off = true;
            return;
        }
        if(map[`${newPos.x},${newPos.y}`] === '.') {
            guard.dir = newDir;
            return;
        }
        if(newDir === guard.dir) {
            guard.off = true;
            return;
        }
    }
}

function printMap(map) {
    printHeader();
    for(let y = 0 ; y <= yMax ; y++) {
        let line = `${y}`.padStart(3).padEnd(4);
        for(let x = 0 ; x <= xMax ; x++) {
            line += `${map[`${x},${y}`]}`;
        }
        console.log(line);
    }
}
function printRoute(map, route) {
    printHeader();
    let routeMap = {};
    for(let i = 1 ; i < route.length ; i++) {
        routeMap[`${route[i].x},${route[i].y}`] = 'X';
    }
    if(route.length > 0) {
        routeMap[`${route[route.length-1].x},${route[route.length-1].y}`] = '$';
    }
    routeMap[`${route[0].x},${route[0].y}`] = '^';
    for(let y = 0 ; y <= yMax ; y++) {
        let line = `${y}`.padStart(3).padEnd(4);
        for(let x = 0 ; x <= xMax ; x++) {
            if(routeMap[`${x},${y}`]) {
                line += `${routeMap[`${x},${y}`]}`;
            } else {
                line += `${map[`${x},${y}`]}`;
            }
        }
        console.log(line);
    }
}

function printGuard(map, guard) {
    printHeader();
    for(let y = 0 ; y <= yMax ; y++) {
        let line = `${y}`.padStart(3).padEnd(4);
        for(let x = 0 ; x <= xMax ; x++) {
            if(x === guard.pos.x && y === guard.pos.y) {
                line += guard.dir;
            } else {
                line += `${map[`${x},${y}`]}`;
            }
        }
        console.log(line);
    }
}

function printHeader() {
    let headerLines = '\n    ';
    for(let x = 0 ; x <= xMax ; x++) {
        headerLines += `${x}`.padStart(3,'0')[0];
    }
    console.log(headerLines);
    headerLines = '    ';
    for(let x = 0 ; x <= xMax ; x++) {
        headerLines += `${x}`.padStart(3,'0')[1];
    }
    console.log(headerLines);
    headerLines = '    ';
    for(let x = 0 ; x <= xMax ; x++) {
        headerLines += `${x%10}`;
    }
    console.log(headerLines);
}