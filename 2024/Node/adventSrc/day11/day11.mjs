import { gotInput, toLines, toArray, getInputFile } from '../../src/puzzle-input/got-puzzle-input.mjs';
import { Level } from 'level';
const db = new Level('level11', { valueEncoding: 'json' });

import emitter from '../../src/event-emitter.mjs';

const DAY = 11;

let map = {};

let solution = 0;
let part2 = 0;

emitter.on(`2024-day${DAY}`, (msg) => {
    console.log(`2024-day${DAY} eventListener`, msg);

    // part2 = part2 + msg.value;
});

let dirs = ['N', 'E', 'S', 'W'];
const dirOffset = (dir) => {
    if (dir === 'N') return { x: 0, y: -1 };
    if (dir === 'E') return { x: 1, y: 0 };
    if (dir === 'S') return { x: 0, y: 1 };
    if (dir === 'W') return { x: -1, y: 0 };
}
let trailhead = {};

async function main() {
    console.log(`[day${DAY}]`);

    // const input = await getInputFile(`${DAY}`, 'example.txt');

    const input = await gotInput(DAY);

    const lines = toLines(input);
    // const lines = ['125 17'];
    // const lines = ['0 1 10 99 999'];

    for (let y = 0; y < lines.length; y++) {
        let line = lines[y];
        console.log(`#${y} `, line);
        // for(let x = 0; x < line.length; x++) {
        //     let char = line[x];
        //     char = Number.isInteger(char) ? Number.parseInt(char) : char;
        //     map[`${x},${y}`] = char;            
        // }
    }
    // console.log('map', map);


    let arr = toArray(lines[0]);
    console.log('arr', arr);

    // arr = arr.map((val) => blink(val));
    // console.log('arr', arr);

    let arrayOfArrays = [arr];
    for (let itteration = 1; itteration <= 75; itteration++) {
        let len = 0;
        for (let i = 0; i < arrayOfArrays.length; i++) {
            let arr2 = []
            // arrayOfArrays[i].map((val) => blink(val));
            for (let j = 0; j < arrayOfArrays[i].length; j++) {
                let val = arrayOfArrays[i][j];
                let t = await blink(val);
                arr2 = [].concat(arr2, t);
            }
            if (itteration == 25) {
                solution += arr2.length;
            }
            if (itteration == 75) {
                part2 += arr2.length;
            }
            len += arr2.length;
            arrayOfArrays[i] = arr2;
        }
        console.log('itteration', itteration, 'len', len, 'arrayOfArrays.length', arrayOfArrays.length);
        process.emit('log-uptime');
        // if (itteration % 3 == 0 && itteration < 75) {
        //     let newArrayOfArrays = [];
        //     for (let i = 0; i < arrayOfArrays.length; i++) {
        //         let arr2 = arrayOfArrays[i];
        //         let t = splitArrayIntoParts(arr2, arr2.length / 3);
        //         // console.log('t', t);
        //         newArrayOfArrays = newArrayOfArrays.concat(t);
        //     }
        //     arrayOfArrays = newArrayOfArrays;
        // }
    }

    // console.log('arr', arr);

    console.log('solution', solution, 'part2', part2);
    process.emit('exit_event');
}

main();

/*

    if value == 0:
        return (1,None)
    elif len(f"{value}") % 2 == 0:
        num = f"{value}"
        num1 = num[:len(num)//2] 
        num2 = num[len(num)//2:]
        return (int(num1),int(num2))
    else:
        return (2024 * value, None)

 */
async function blink(value) {
    if (value == 0) {
        return [1];
    }
    let l = null;
    try {
        l = await db.get(value);
        // console.log('db.get(value)', l);
        return l;
    } catch (error) {
        // Key does not exist
        // console.log('error', error);
    }
    if (value.toString().length % 2 == 0) {
        let num = value.toString();
        let num1 = num.slice(0, num.length / 2);
        let num2 = num.slice(num.length / 2);
        let r = [parseInt(num1), parseInt(num2)];
        // console.log('r', r);
        await db.put(value, r);
        return r;
    }
    let r = [2024 * value];
    // console.log('r', r);
    await db.put(value, r);
    return r;
}

function splitArrayIntoParts(array, n) {
    const result = [];
    const partSize = Math.ceil(array.length / n);

    for (let i = 0; i < array.length; i += partSize) {
        result.push(array.slice(i, i + partSize));
    }

    return result;
}
