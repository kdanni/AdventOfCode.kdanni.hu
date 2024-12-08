import { gotInput, toLines, toArray } from '../../src/puzzle-input/got-puzzle-input.mjs';

import emitter from '../../src/event-emitter.mjs';

let solution = 0;
let part2 = 0;

emitter.on('2024-day8', (msg) => {
    console.log('2024-day8 eventListener' , msg);

    // part2 = part2 + msg.value;
});

async function main() {
    console.log('[day8]');

    const input = await gotInput(8);
    const lines = toLines(input);
    let yMin = 0;
    let yMax = lines.length - 1;
    let xMin = 0;
    let xMax = lines[0].length - 1;
    let map = {};
        
    for(let y = 0 ; y < lines.length ; y++) {
        let line = lines[y];
        // console.log(`#${y} `, line);
        for(let x = 0; x < line.length; x++) {
            let char = line[x];
            map[`${x},${y}`] = char;
        }
    }

    // console.log('map', map);

    let frequencyMap = {}; 
    let antinodeMap = {};
    let antinodeMap2 = {};

    for(let y = 0 ; y <= yMax ; y++) {
        for(let x = 0; x <= xMax; x++) {
            if(map[`${x},${y}`] !== '.') {
                frequencyMap[map[`${x},${y}`]] = frequencyMap[map[`${x},${y}`]]+1 || 1;
            }
        }
    }
    for (const key in frequencyMap) {
        // console.log(key, frequencyMap[key]);
        if(frequencyMap[key] > 1) {
            let xy = [];
            for(let y = 0 ; y <= yMax ; y++) {
                for(let x = 0; x <= xMax; x++) {
                    if(map[`${x},${y}`] === key) {
                        xy.push(`${x},${y}`);
                    }
                }
            }
            console.log(key, frequencyMap[key], 'xy', xy);
            let pairs = putInBinCombinationsNoRepetition(xy, frequencyMap[key], 2);
            // console.log('pairs', pairs);
            for(let pair of pairs) {
                let x1 = Number.parseInt(pair[0].split(',')[0]);
                let y1 = Number.parseInt(pair[0].split(',')[1]);
                let x2 = Number.parseInt(pair[1].split(',')[0]);
                let y2 = Number.parseInt(pair[1].split(',')[1]);
                let dx = x1 - x2;
                let dy = y1 - y2;
                console.log('pair', pair, 'dx', dx, 'dy', dy);+
                console.log('xy1:', x1 + dx, y1 + dy , 'xy2:', x2 - dx, y2 - dy);
                
                antinodeMap[`${x1 + dx},${y1 + dy}`] = 1;
                antinodeMap[`${x2 - dx},${y2 - dy}`] = 1;

                for(let i = 1; i <= xMax; i++) {                    
                    antinodeMap2[`${x1 + i* dx},${y1 + i* dy}`] = 1;
                    antinodeMap2[`${x2 - i* dx},${y2 - i* dy}`] = 1;
                }
            }
        }
    }

    for(let y = 0 ; y <= yMax ; y++) {
        let line = '';
        for(let x = 0; x <= xMax; x++) {
            if(antinodeMap[`${x},${y}`] === 1) {
                solution++;   
                if(map[`${x},${y}`] === '.') {
                    line += '#';
                } else {
                    line += map[`${x},${y}`];
                }
            } else {
                line += map[`${x},${y}`];
            }
        }
        console.log(`#${y}`, line);
    }
    console.log('\n\n');
    for(let y = 0 ; y <= yMax ; y++) {
        let line = '';
        for(let x = 0; x <= xMax; x++) {
            if(map[`${x},${y}`] !== '.') {
                part2++;
            } else if (antinodeMap2[`${x},${y}`] === 1) {
                part2++;
            }
            if(antinodeMap2[`${x},${y}`] === 1) {
                if(map[`${x},${y}`] === '.') {
                    line += '#';
                } else {
                    line += map[`${x},${y}`];
                }
            } else {
                line += map[`${x},${y}`];
            }
        }
        console.log(`#${y}`, line);
    }

    console.log('solution', solution, 'part2', part2);

    process.emit('exit_event');
}

main();

// enumerate all posible combinations of n items in m bins with repetition not allowed 
function putInBinCombinationsNoRepetition(arrayOfNitems, k, m) {
    if(m === 1) {
        return arrayOfNitems.map(n => [n]);
    }
    let result = [];
    for(let i = 0; i < arrayOfNitems.length; i++) {
        let rest = putInBinCombinationsNoRepetition(arrayOfNitems.slice(i + 1), k - 1, m - 1);
        for(let j = 0; j < rest.length; j++) {
            result.push([arrayOfNitems[i]].concat(rest[j]));
        }
    }
    return result;
}