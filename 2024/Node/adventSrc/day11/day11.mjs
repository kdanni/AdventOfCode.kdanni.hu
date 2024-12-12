import { gotInput, toLines, toArray, getInputFile } from '../../src/puzzle-input/got-puzzle-input.mjs';

import emitter from '../../src/event-emitter.mjs';

const DAY = 11;

let solution = 0;
let part2 = 0;

emitter.on(`2024-day${DAY}`, (msg) => {
    console.log(`2024-day${DAY} eventListener` , msg);

    // part2 = part2 + msg.value;
});

let dict = {};


async function main() {
    console.log(`[day${DAY}]`);

    // const input = await getInputFile(`${DAY}`, 'example.txt');
    
    const input = await gotInput(DAY);
    
    const lines = toLines(input);
    // const lines = ['125 17'];
    // const lines = ['0 1 10 99 999'];

    // let map = {};
    // for(let y = 0 ; y < lines.length ; y++) {
    //     let line = lines[y];
    //     console.log(`#${y} `, line);
    //     // for(let x = 0; x < line.length; x++) {
    //     //     let char = line[x];
    //     //     char = Number.isInteger(char) ? Number.parseInt(char) : char;
    //     //     map[`${x},${y}`] = char;            
    //     // }
    // }
    // // console.log('map', map);

    
    let arr = toArray(lines[0]);
    console.log('arr', arr);


    for ( let i = 0; i < arr.length; i++) {
        // solution = solution + blink(arr[i], 38);
        solution = solution + blink(arr[i], 25);
        part2 = part2 + blink(arr[i], 75);
    }
    // console.log(dict);

    console.log('solution', solution, 'part2', part2, 'dict', Object.keys(dict).length, 'split', Object.keys(split).length);
    process.emit('exit_event');
}

main();

let split = {};
function blink(stone, n) {
    let ret = 0;
    if (n == 1) {
        // number of stones
        if(`${stone}`.length % 2 == 0) {
            ret = 2;
        } else {
            ret = 1;
        }
    } else if (dict[`${stone},${n}`]) {
        return dict[`${stone},${n}`];
    } else if(stone == 0) {
        return blink(1, n - 1);
    } else if(`${stone}`.length % 2 == 0) {
        let nums = [];
        if(split[stone]) {
            nums = split[stone];
        } else {
            let num = `${stone}`;
            let num1 = parseInt(num.slice(0, num.length / 2));
            let num2 = parseInt(num.slice(num.length / 2));
            nums = [num1, num2];
            split[stone] = nums;
        }
        ret = blink(nums[0], n - 1) + blink(nums[1], n - 1);
    } else {
        ret = blink(2024*stone, n - 1);      
    }
    dict[`${stone},${n}`] = ret;
    return ret;
}