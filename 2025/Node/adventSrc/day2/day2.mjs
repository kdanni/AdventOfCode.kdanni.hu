import { gotInput, toLines, toArray, getInputFile } from '../../src/puzzle-input/got-puzzle-input.mjs';

import emitter from '../../src/event-emitter.mjs';

const DAY = 2;

let solution = 0;
let part2 = 0;

emitter.on(`2025-day${DAY}`, (msg) => {
    console.log(`2025-day${DAY} eventListener` , msg);

    // part2 = part2 + msg.value;
});



async function main() {
    console.log(`[day${DAY}]`);

    // const input = await getInputFile(`${DAY}`, 'example.txt');
    
    const input = await gotInput(DAY);
    
    const lines = toLines(input);

    const ranges = [];
    for(let line of lines) {
        const pairs = `${line}`.match(/[^,]+/g) || [];
        // console.log(line, pairs);
        for (let pair of pairs || []) {
            const r = `${pair}`.match(/[^-]+/g) || [];
            // console.log(r);
            r[0] = Number.parseInt(r[0]);
            r[1] = Number.parseInt(r[1]);
            ranges.push(r);
        }
    }
    
    for (let r of ranges) {
        console.log(r[0], r[1]);
        for (let i = r[0] ; i <= r[1] ; i++) {
            // console.log(i, isPartRepeated(i));
            if(isPartRepeated(i)) {
                solution += i;
            }
            if(isPartRepeatedMore(i)){
                part2 += i;
            }
        }
    }



    console.log('solution', solution, 'part2', part2);
    process.emit('exit_event');
}

main();


function isPartRepeated(id) {
    for(let i = 0 ; i < `${id}`.length; i++) {
        let reg = `${id}`.substring(0,i+1);
        let exp = new RegExp('^' + reg + reg + '$');
        if(exp.test(id)){
            return true;
        }
    }
    return false;
}

function isPartRepeatedMore(id) {
    for(let i = 0 ; i < `${id}`.length; i++) {
        let reg = `${id}`.substring(0,i+1);
        let exp = new RegExp('^' + reg + '(' + reg + ')+' + '$');
        if(exp.test(id)){
            return true;
        }
    }
    return false;
}