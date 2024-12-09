import { gotInput, toLines, toArray } from '../../src/puzzle-input/got-puzzle-input.mjs';

import emitter from '../../src/event-emitter.mjs';

const DAY = 9;

let map = {};

let solution = 0;
let part2 = 0;

emitter.on(`2024-day${DAY}`, (msg) => {
    console.log(`2024-day${DAY} eventListener` , msg);

    // part2 = part2 + msg.value;
});

async function main() {
    console.log(`[day${DAY}]`);

    const input = await gotInput(DAY);
    const lines = toLines(input);
        
    // for(let y = 0 ; y < lines.length ; y++) {
    //     let line = lines[y];
    //     // console.log(`#${y} `, line);
    //     for(let x = 0; x < line.length; x++) {
    //         let char = line[x];
    //         map[`${x},${y}`] = char;
    //     }
    // }
    // console.log('map', map);

    let types = ['f', '.']
    let currentType = 'f';
    let blocks = [];
    for(let i = 0 , f = 0; i < `${lines}`.length; i++) {
        blocks.push({num: Number.parseInt(`${lines}`[i]), type: currentType, id : f});
        if(currentType === 'f') {
            f++;
            currentType = '.';
        } else if(currentType === '.') {
            currentType = 'f';
        }
    }
    
    let flatBlocks = [];
    let fileBlockCount = 0;
    let freespaceBlockCount = 0;
    
    for(let i = 0; i < blocks.length; i++) {
        for(let j = 0; j < blocks[i].num; j++) {
            if(blocks[i].type === '.') {
                delete blocks[i].id;
            }
            flatBlocks.push(blocks[i]);
            if(blocks[i].type === 'f') {
                fileBlockCount++;
            } else if(blocks[i].type === '.') {
                freespaceBlockCount++;
            }
        }
    }

    // console.log('flatBlocks', flatBlocks);

    let reFrag = [];
    for(let i = 0, j = flatBlocks.length-1; i < flatBlocks.length; i++) {
        if(flatBlocks[i].type === 'f') {
            reFrag.push(flatBlocks[i]);
        } else if(flatBlocks[i].type === '.') {
            while(flatBlocks[j].type !== 'f') {
                j--;
            }
            reFrag.push(flatBlocks[j]);
            j--;
        }
        if(reFrag.length === fileBlockCount) {
            break;
        }
    }

    // console.log('reFrag', reFrag);

    for(let i = 0; i < reFrag.length; i++) {
        let v = i * reFrag[i].id;
        solution += v;
    }

    // Defrag:

    let newFlatBlocks = JSON.parse(JSON.stringify(flatBlocks));
    
    for(let i = 0; i < newFlatBlocks.length; i++) {
        if(newFlatBlocks[i].type === 'f') {
            newFlatBlocks[i].deFraged = true;
        } else if(newFlatBlocks[i].type === '.') {
            let freeSpaceLen = newFlatBlocks[i].num;
            let freespaceUsed = 0;
            for(let j = newFlatBlocks.length-1; j >= i; j--) {

                // console.log('newFlatBlocks[i]', i, newFlatBlocks[i], 
                //     'newFlatBlocks.length-1', newFlatBlocks.length-1,
                //     'newFlatBlocks[j]', j, newFlatBlocks[j]);
            
                let doBreak = false;
                if(newFlatBlocks[j].type === 'f') {                    
                    if(freeSpaceLen >= newFlatBlocks[j].num) {
            
                        // console.log('newFlatBlocks[i]', i, newFlatBlocks[i], 
                        //     'newFlatBlocks.length-1', newFlatBlocks.length-1,
                        //     'newFlatBlocks[j]', j, newFlatBlocks[j]);
                    
                        doBreak = true;
                        for(let k = 0; k < newFlatBlocks[j].num; k++) {
                            if(
                                newFlatBlocks[i+k].type === '.' 
                                && newFlatBlocks[j-k].type === 'f'
                                && newFlatBlocks[j-k].deFraged !== true
                            )
                            {
                                // console.log('before newFlatBlocks[i]', newFlatBlocks[i]);
                                newFlatBlocks[i+k].type = 'f';
                                newFlatBlocks[i+k].num = newFlatBlocks[j-k].num;
                                newFlatBlocks[i+k].id = newFlatBlocks[j-k].id;
                                newFlatBlocks[i+k].deFraged = true;
                                freespaceUsed++;
                                newFlatBlocks[j-k].type = '.';
                                newFlatBlocks[j-k].oldFile = newFlatBlocks[i+k];
                                newFlatBlocks[j-k].movedTo = i+k;
                                newFlatBlocks[j-k].deFraged = true;
                                delete newFlatBlocks[j-k].id;
                                // console.log('after newFlatBlocks[i]', newFlatBlocks[i]);
                            } else {

                                // console.log('newFlatBlocks[i+k]', i, k , newFlatBlocks[i+k], 
                                //     'newFlatBlocks.length-1', newFlatBlocks.length-1,
                                //     'newFlatBlocks[j-k]', j, k, newFlatBlocks[j-k]);
                            
                            }
                        }
                        for(let k = 0; k < freeSpaceLen; k++) {
                            if(newFlatBlocks[i+k].type === '.') {
                                newFlatBlocks[i+k].num = newFlatBlocks[i+k].num - freespaceUsed;
                            }
                        }
                    }
                }
                if(doBreak) {
                    break;
                }
            } // for j
        }
    } // for i

    console.log('flatBlocks', flatBlocks);
    console.log('newFlatBlocks', newFlatBlocks);
   
    let fileBlockCount2 = 0;
    for (let i = 0; i < newFlatBlocks.length; i++) {
        if(newFlatBlocks[i].type === 'f') {
            fileBlockCount2++;
            let v = i * newFlatBlocks[i].id;
            part2 += v;
        }
        if(fileBlockCount2 <= fileBlockCount) {
            if(fileBlockCount2 == fileBlockCount) {
                fileBlockCount2 *= 2;
            }
            console.log('newFlatBlocks[i]', i, newFlatBlocks[i]);
        }
    }


    console.log('fileBlockCount', fileBlockCount, 'freespaceBlockCount', freespaceBlockCount
        , 'reFrag', reFrag.length, 'flatBlocks', flatBlocks.length);
    
    console.log('solution', solution, 'part2', part2);

    process.emit('exit_event');
}

main();

