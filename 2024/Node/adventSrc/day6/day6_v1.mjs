import { gotInput, toLines, toArray, getInputFile } from '../../src/puzzle-input/got-puzzle-input.mjs';

async function main() {
    console.log('[day6]');

    const input = await gotInput(6);
    // const input = await getInputFile(6, 'example.txt');
    // const input = await getInputFile(6, 'input2.txt');
    const lines = toLines(input);

    let solution = 0;
    let part2 = 0;
    let map = {map : {}, guard : { pos: {}, origPos: {}}, turningPoints: [], O: [], route : {}, yMax: lines.length, xMax: lines[0].length};
    for(let i = 0 ; i < lines.length ; i++) {
        // console.log(`#${i}`, lines[i]);
        map.map[i] = {};
        for(let j = 0 ; j < lines[i].length ; j++) {
            map.map[i][j] = lines[i][j];
            if(lines[i][j] === '^') {
                map.guard.pos = {x: j, y: i};
                map.guard.origPos = {x: j, y: i};
                map.guard.dir = 'N';
                map.route[`${j},${i}`] = map.route[`${j},${i}`] || {};
                map.route[`${j},${i}`].N = true;
            }
        }
    }

    // console.log('map', map);
    
    let i = 0;
    let done = false;

    while(true) {
        map = simulate(map);
        if(map.guard.off) {
            console.log('Guard is off map');
            done = true;
            break;
        }
        if(map.guard.pos.x === map.guard.origPos.x && map.guard.pos.y === map.guard.origPos.y && map.guard.dir === 'N') {
            console.log('Guard is back to start', i, 'Direction: ', map.guard.dir);
            done = true;
            break;
        }
        i++;
    }

    let oCount = 0;
    let Os = {};
    for(let o of map.O) {
        // console.log('O', o);
        Os[o.x] = Os[o.x] || {};
        Os[o.x][o.y] = true;
        oCount++;
    }

    let headerLines = '    ';
    for(let x in map.map[0]) {
        headerLines += `${x}`.padStart(3,'0')[0];
    }
    console.log(headerLines);
    headerLines = '    ';
    for(let x in map.map[0]) {
        headerLines += `${x}`.padStart(3,'0')[1];
    }
    console.log(headerLines);
    headerLines = '    ';
    for(let x in map.map[0]) {
        headerLines += `${x%10}`;
    }
    console.log(headerLines);
    for(let y in map.map) {
        let line = `${y}`.padStart(3).padEnd(4);
        for(let x in map.map[y]) {
            if(`${map.map[y][x]}` !== '#' && Os[x] && Os[x][y]) {                
                if(map.guard.origPos.x == Number.parseInt(x) && map.guard.origPos.y == Number.parseInt(y)) {
                    line += `0`;
                } else {
                    line += `O`;                
                    part2++;
                }
            } else {
                if(map.guard.origPos.x == Number.parseInt(x) && map.guard.origPos.y == Number.parseInt(y)) {
                    line += `0`;
                } else {
                    line += `${map.map[y][x]}`;
                }
            }
            if(map.map[y][x] !== '.' && map.map[y][x] !== '#') {
                solution++;
            }
        }
        console.log(line);
    }

    // for(let tp of map.turningPoints) {
    //     console.log('Turning point', tp);
    // }
    // for(let x in Os) {
    //     for(let y in Os[x]) {
    //         console.log('O', x, y);
    //         part2++;
    //     }
    // }

    
    console.log('solution', solution, 'part2', part2, 'oCount', oCount, 'iterations', i);

    process.emit('exit_event');
}

main();

function osimulate(omap, map){
    let map1 = JSON.parse(JSON.stringify(omap));
    let reto = false;
    let i = 0;
    while(true) {
        omap = simulate(omap, true);
        if(map.yMax < Number.parseInt(omap.guard.pos.y) || map.xMax < Number.parseInt(omap.guard.pos.x)
            || omap.guard.pos.x < 0 || omap.guard.pos.y < 0            
        ) {
            // console.log('[O]!! Guard is off map');
            omap.guard.off = true;
            // printMap(omap);
            break;
        }
        if(omap.guard.off) {
            // console.log('[O] Guard is off map');
            // printMap(omap);
            break;
        }
        if(omap.guard.pos.x === map1.guard.pos.x && omap.guard.pos.y === map1.guard.pos.y && omap.guard.dir === map1.guard.dir) {
            reto = true;
            printMap(omap);
            break;
        }
        i++;
        if(i > 5140 * 16) {
        // if(i > 44) {
            // console.log('Guard is stuck');
            // printMap(omap);
            break;
        }
    }
    // printMap(omap);
    return reto;
}

function simulate(map, o){
    let nextStep = false;
    if(map.yMax < Number.parseInt(map.guard.pos.y) || map.xMax < Number.parseInt(map.guard.pos.x)
        || map.guard.pos.x < 0 || map.guard.pos.y < 0            
    ) {
        // console.log('!! Guard is off map');
        map.guard.off = true;
        return map;
    }
    while(!nextStep) {        
        if(map.guard.dir === 'N') {
            if(!o){
                try {
                    if(/\./.test(`${map.map[Number.parseInt(map.guard.pos.y)-1][Number.parseInt(map.guard.pos.x)]}`)) {
                        let omap = JSON.parse(JSON.stringify(map));
                        omap.map[Number.parseInt(map.guard.pos.y)-1][Number.parseInt(map.guard.pos.x)] = '#';
                        if(osimulate(omap, map)) {
                            map.O.push({x: map.guard.pos.x, y: Number.parseInt(map.guard.pos.y)-1});
                        }
                    }
                } catch(e) {
                    console.log(e);
                }
            }
            map.route[`${map.guard.pos.x},${map.guard.pos.y}`] = map.route[`${map.guard.pos.x},${map.guard.pos.y}`] || {};
            map.route[`${map.guard.pos.x},${map.guard.pos.y}`].N = true;
            map.guard.pos.y--;
            if(map.yMax < map.guard.pos.y || map.xMax < map.guard.pos.x
                || map.guard.pos.x < 0 || map.guard.pos.y < 0            
            ) {
                // console.log('!! Guard is off map');
                map.guard.off = true;
                return map;
            }            
            try {
                if(map.map[map.guard.pos.y][map.guard.pos.x] === '#') {
                    map.turningPoints.push({x: map.guard.pos.x, y: map.guard.pos.y, dir: map.guard.dir});
                    map.guard.dir = 'E';
                    map.guard.pos.y++;
                } else if(/[^#]/.test(`${map.map[map.guard.pos.y][map.guard.pos.x]}`)) {
                    map.map[map.guard.pos.y][map.guard.pos.x] = map.guard.dir;
                    nextStep = true;
                } else {
                    console.log('WTF?', map.map[map.guard.pos.y][map.guard.pos.x]);
                }                
            } catch(e) {
                // console.log('Guard is off map', map.guard.pos, e);
                map.guard.off = true;
                return map;
            }
        } else if(map.guard.dir === 'E') {
            if(!o){
                try {
                    if(/\./.test(`${map.map[Number.parseInt(map.guard.pos.y)][Number.parseInt(map.guard.pos.x)+1]}`)) {
                        let omap = JSON.parse(JSON.stringify(map));
                        omap.map[Number.parseInt(map.guard.pos.y)][Number.parseInt(map.guard.pos.x)+1] = '#';
                        if(osimulate(omap, map)) {
                            map.O.push({x: Number.parseInt(map.guard.pos.x)+1, y: map.guard.pos.y});
                        }
                    }
                } catch(e) {
                    console.log(e);
                }
            }
            map.route[`${map.guard.pos.x},${map.guard.pos.y}`] = map.route[`${map.guard.pos.x},${map.guard.pos.y}`] || {};
            map.route[`${map.guard.pos.x},${map.guard.pos.y}`].E = true;
            map.guard.pos.x++;
            if(map.yMax < map.guard.pos.y || map.xMax < map.guard.pos.x
                || map.guard.pos.x < 0 || map.guard.pos.y < 0            
            ) {
                // console.log('!! Guard is off map');
                map.guard.off = true;
                return map;
            }            
            try {
                if(map.map[map.guard.pos.y][map.guard.pos.x] === '#') {
                    map.turningPoints.push({x: map.guard.pos.x, y: map.guard.pos.y, dir: map.guard.dir});
                    map.guard.dir = 'S';
                    map.guard.pos.x--;
                } else if(/[^#]/.test(`${map.map[map.guard.pos.y][map.guard.pos.x]}`)) {
                    map.map[map.guard.pos.y][map.guard.pos.x] = map.guard.dir;
                    nextStep = true;
                } else {
                    console.log('WTF?', map.map[map.guard.pos.y][map.guard.pos.x]);
                }
            } catch(e) {
                // console.log('Guard is off map', map.guard.pos, e);
                map.guard.off = true;
                return map;
            }
        } else if(map.guard.dir === 'S') {
            if(!o){
                try {
                    if(/\./.test(`${map.map[Number.parseInt(map.guard.pos.y)+1][Number.parseInt(map.guard.pos.x)]}`)) {
                        let omap = JSON.parse(JSON.stringify(map));
                        omap.map[Number.parseInt(map.guard.pos.y)+1][Number.parseInt(map.guard.pos.x)] = '#';
                        if(osimulate(omap, map)) {
                            map.O.push({x: map.guard.pos.x, y: Number.parseInt(map.guard.pos.y)+1});
                        }
                    }
                } catch(e) {
                    console.log(e);
                }
            }
            map.route[`${map.guard.pos.x},${map.guard.pos.y}`] = map.route[`${map.guard.pos.x},${map.guard.pos.y}`] || {};
            map.route[`${map.guard.pos.x},${map.guard.pos.y}`].S = true;
            map.guard.pos.y++;
            if(map.yMax < map.guard.pos.y || map.xMax < map.guard.pos.x
                || map.guard.pos.x < 0 || map.guard.pos.y < 0            
            ) {
                // console.log('!! Guard is off map');
                map.guard.off = true;
                return map;
            }            
            try {
                if(map.map[map.guard.pos.y][map.guard.pos.x] === '#') {
                    map.turningPoints.push({x: map.guard.pos.x, y: map.guard.pos.y, dir: map.guard.dir});
                    map.guard.dir = 'W';
                    map.guard.pos.y--;
                } else if(/[^#]/.test(`${map.map[map.guard.pos.y][map.guard.pos.x]}`)) {
                    map.map[map.guard.pos.y][map.guard.pos.x] = map.guard.dir;
                    nextStep = true;
                } else {
                    console.log('WTF?', map.map[map.guard.pos.y][map.guard.pos.x]);
                }
            } catch(e) {
                // console.log('Guard is off map', map.guard.pos, e);
                map.guard.off = true;
                return map;
            }
        } else if(map.guard.dir === 'W') {
            if(!o){
                try {
                    if(/\./.test(`${map.map[Number.parseInt(map.guard.pos.y)][Number.parseInt(map.guard.pos.x)-1]}`)) {
                        let omap = JSON.parse(JSON.stringify(map));
                        omap.map[Number.parseInt(map.guard.pos.y)][Number.parseInt(map.guard.pos.x)-1] = '#';
                        if(osimulate(omap, map)) {
                            map.O.push({x: Number.parseInt(map.guard.pos.x)-1, y: map.guard.pos.y});
                        }
                    }
                } catch(e) {
                    console.log(e);
                }
            }
            map.route[`${map.guard.pos.x},${map.guard.pos.y}`] = map.route[`${map.guard.pos.x},${map.guard.pos.y}`] || {};
            map.route[`${map.guard.pos.x},${map.guard.pos.y}`].W = true;
            map.guard.pos.x--;
            if(map.yMax < map.guard.pos.y || map.xMax < map.guard.pos.x
                || map.guard.pos.x < 0 || map.guard.pos.y < 0            
            ) {
                // console.log('!! Guard is off map');
                map.guard.off = true;
                return map;
            }            
            try {
                if(map.map[map.guard.pos.y][map.guard.pos.x] === '#') {
                    map.turningPoints.push({x: map.guard.pos.x, y: map.guard.pos.y, dir: map.guard.dir});
                    map.guard.dir = 'N';
                    map.guard.pos.x++;
                } else if(/[^#]/.test(`${map.map[map.guard.pos.y][map.guard.pos.x]}`)) {
                    map.map[map.guard.pos.y][map.guard.pos.x] = map.guard.dir;
                    nextStep = true;
                } else {
                    console.log('WTF?', map.map[map.guard.pos.y][map.guard.pos.x]);
                }
            } catch(e) {
                // console.log('Guard is off map', map.guard.pos, e);
                map.guard.off = true;
                return map;
            }
        }
    }
    return map;
}

function printMap(map) {
    let headerLines = '    ';
    for(let x in map.map[0]) {
        headerLines += `${x}`.padStart(3,'0')[0];
    }
    console.log(headerLines);
    headerLines = '    ';
    for(let x in map.map[0]) {
        headerLines += `${x}`.padStart(3,'0')[1];
    }
    console.log(headerLines);
    headerLines = '    ';
    for(let x in map.map[0]) {
        headerLines += `${x%10}`;
    }
    console.log(headerLines);
    for(let y in map.map) {
        let line = `${y}`.padStart(3).padEnd(4);
        for(let x in map.map[y]) {
            line += `${map.map[y][x]}`;
        }
        console.log(line);
    }
}