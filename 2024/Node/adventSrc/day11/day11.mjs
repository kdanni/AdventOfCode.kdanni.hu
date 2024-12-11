import { gotInput, toLines, toArray, getInputFile } from '../../src/puzzle-input/got-puzzle-input.mjs';

import emitter from '../../src/event-emitter.mjs';

const DAY = 11;

let map = {};

let solution = 0;
let part2 = 0;

emitter.on(`2024-day${DAY}`, (msg) => {
    console.log(`2024-day${DAY} eventListener` , msg);

    // part2 = part2 + msg.value;
});

let dirs = ['N', 'E', 'S', 'W'];
const dirOffset = (dir) => {
    if(dir === 'N') return {x: 0, y: -1};
    if(dir === 'E') return {x: 1, y: 0};
    if(dir === 'S') return {x: 0, y: 1};
    if(dir === 'W') return {x: -1, y: 0};
}
let trailhead = {};

async function main() {
    console.log(`[day${DAY}]`);

    // const input = await getInputFile(`${DAY}`, 'example.txt');
    
    const input = await gotInput(DAY);
    
    const lines = toLines(input);
    // const lines = ['125 17'];
    // const lines = ['0 1 10 99 999'];
        
    for(let y = 0 ; y < lines.length ; y++) {
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
    for(let itteration = 1; itteration <= 75; itteration++) {
        let len = 0;
        for(let i = 0; i < arrayOfArrays.length; i++) {
            let arr2 = arrayOfArrays[i].map((val) => blink(val));
            let nextArr = [];
            for(let i = 0; i < arr2.length; i++) {
                if(arr2[i][1] != null) {
                    nextArr.push(arr2[i][0]);
                    nextArr.push(arr2[i][1]);
                }
                else {
                    nextArr.push(arr2[i][0]);
                }
            }
            arr2 = nextArr;
            if(itteration == 25) {
                solution += arr2.length;
            }
            if(itteration == 75) {
                part2 += arr2.length;
            }
            len += arr2.length;
            arrayOfArrays[i] = arr2;
        }
        console.log('itteration', itteration, 'len', len, 'arrayOfArrays.length', arrayOfArrays.length);
        if(itteration % 3 == 0 && itteration < 75) {
            let newArrayOfArrays = [];
            for(let i = 0; i < arrayOfArrays.length; i++) {
                let arr2 = arrayOfArrays[i];
                let t = splitArrayIntoParts(arr2, arr2.length / 3);
                // console.log('t', t);
                newArrayOfArrays = newArrayOfArrays.concat(t);
            }
            arrayOfArrays = newArrayOfArrays;
        }
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
function blink(value) {
    if(value == 0) {
        return [1, null];
    }
    else if(value.toString().length % 2 == 0) {
        let num = value.toString();
        let num1 = num.slice(0, num.length / 2);
        let num2 = num.slice(num.length / 2);
        return [parseInt(num1), parseInt(num2)];
    }
    else {
        return [2024 * value, null];
    }
}

function splitArrayIntoParts(array, n) {
    const result = [];
    const partSize = Math.ceil(array.length / n);

    for (let i = 0; i < array.length; i += partSize) {
        result.push(array.slice(i, i + partSize));
    }

    return result;
}
