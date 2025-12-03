import { gotInput, toLines, toArray, getInputFile } from '../../src/puzzle-input/got-puzzle-input.mjs';

// import {neo} from './neo4.mjs';

import emitter from '../../src/event-emitter.mjs';

const DAY = 16;

let solution = 0;
let part2 = 0;

emitter.on(`2024-day${DAY}`, (msg) => {
    console.log(`2024-day${DAY} eventListener` , msg);

    // part2 = part2 + msg.value;
});

import { Map16, dirs, dirOffset, turnLeft, turnRight } from './map.mjs';

async function main() {
    console.log(`[day${DAY}]`);
    
    const input = await gotInput(DAY);
    
    // const input = await getInputFile(`${DAY}`, 'example.txt');
    
    const  lines = toLines(input);
    
    // for(let y = 0 ; y < lines.length ; y++) {
    //     let line = lines[y];
    //     // console.log(`#${y} `, line);
    // }

    let map = new Map16(lines);

    // map.printMap();

    // const serverInfo = await neo.driver.getServerInfo();
    // console.log('Connection established');
    // console.log(serverInfo);

    // let session;
    // try {
    //     let relations = [];
    //     session = await neo.driver.session();

    //     for(let y = 0 ; y < map.maxY ; y++) {
    //         for(let x = 0 ; x < map.maxX ; x++) {
    //             let c = map.get(x, y);
    //             let id = `${x},${y}`;
    //             console.log(id, c);
    //             if(c === '.' || c === 'S' || c === 'E') {
    //                 await session.run('MERGE (n:Node {id: $id, x: $x, y: $y, c: $c})', {id, x, y, c});
    //                 for( let dir of dirs) {
    //                     let dx = dirOffset(dir).x;
    //                     let dy = dirOffset(dir).y;
    //                     let nx = x + dx;
    //                     let ny = y + dy;
    //                     if(nx >= 0 && nx < map.maxX && ny >= 0 && ny < map.maxY) {
    //                         let nc = map.get(nx, ny);
    //                         if(nc === '.' || c === 'S' || c === 'E') {
    //                             relations.push({id1: `${x},${y}`, id2: `${nx},${ny}`, dir});
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     for(let r of relations) {
    //         console.log('Relation', r);
    //         await session.run('MATCH (n1:Node {id: $id1}), (n2:Node {id: $id2}) MERGE (n1)-[:CONNECTED {dir: $dir}]->(n2)', r);
    //     }
    // } catch(err) { console.log('error', err); }
    // finally {
    //     session.close();
    // }


    map.printMap();

    console.log('solution', solution, 'part2', part2);
    // await neo.driver.close();
    process.emit('exit_event');
}

main();