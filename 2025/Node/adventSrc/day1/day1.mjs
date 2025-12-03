import { matchesGlob } from 'node:path';
import { gotInput, toLines, toArray, getInputFile } from '../../src/puzzle-input/got-puzzle-input.mjs';

async function main() {
    console.log('[day1]');

    let solution = 0;
    let part2 = 0;

    const input = await gotInput(1);
    // const input = await getInputFile(1 , 'example.txt');
    const lines = toLines(input);

    const rot = [];
        
    let i = 0;
    for(let line of lines) {
        console.log(`#${i++}`, `${line}`);
        const match = /^(\D)(\d*)$/i.exec(line) || [undefined, undefined];
        if(match[1]) {
            if(match[1] === 'L') {
                let int = Number.parseInt(`${match[2]}`);
                rot.push(-1 * int);
            }
            if(match[1] === 'R') {
                let int = Number.parseInt(`${match[2]}`);
                rot.push(int);
            }
        }

    }

    console.dir(rot);
    let dial = 50;
    for (var diff of rot) {
        let orig = dial;
        let dialPlusR = (dial + diff);

        let norm = diff >= 0 ? dial : (100-dial);
        let final = norm + (diff >= 0 ? diff : -1 * diff);
        if(norm >= 100) {
            norm -= 100;
            final -= 100;
        }
                
        dial = (dial + diff) % 100;
        dial = dial < 0 ? 100 + dial : dial;

        let to = final / 100;
        let toDec = to;
        to = Math.floor(to);
        part2 += to;

        if(dial === 0) {
            solution+=1;
        }
        console.log('orig', orig, 'diff', diff, 'newPos', dial , `(${dialPlusR})`, 'norm', norm, 'final', final, 'turn over', to, ',', toDec);
    }


    console.log('solution', solution, 'part2', part2);

    process.emit('exit_event');
}

main();
