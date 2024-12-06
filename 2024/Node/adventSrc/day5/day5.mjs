import { gotInput, toLines, toArray } from '../../src/puzzle-input/got-puzzle-input.mjs';

async function main() {
    console.log('[day5]');

    const input = await gotInput(5);
    const lines = toLines(input);
        
    let solution = 0;
    let part2 = 0;
    let pageOrderingRules = [];
    let pageNumbersOfEachUpdate = [];
    for(let i = 0 ; i < lines.length ; i++) {
        
        const rule = /^(\d+)\|(\d+)$/.exec(lines[i]) || [];
        // console.log('rule', rule);
        if( rule[1] && rule[2] ) {
            pageOrderingRules.push([rule[1], rule[2]]);
            //console.log(`#${i} `, lines[i], pageOrderingRules[pageOrderingRules.length - 1]);
        } else {
            const update = lines[i].split(/[^\d]/g) || [];
            if( update.length > 1 ) {
                pageNumbersOfEachUpdate.push(update);
            }
            //console.log(`#${i} `, lines[i], pageNumbersOfEachUpdate[pageNumbersOfEachUpdate.length - 1]);
        }        
    }

    const beforeRules = {};
    const afterRules = {};
    for(let rule of pageOrderingRules) {
        beforeRules[rule[0]] = beforeRules[rule[0]] || {};
        beforeRules[rule[0]][rule[1]] = true;
        afterRules[rule[1]] = afterRules[rule[1]] || {};
        afterRules[rule[1]][rule[0]] = true;
    }
    
    let correctCount = 0;
    let fullSum = 0;
    for( let update of pageNumbersOfEachUpdate ) {
        let correct = true;
        let midNum = update[(update.length - 1) / 2];
        for(let i = 0; i < update.length - 1; i++) {
            let page1 = update[i];
            for(let j = i + 1; j < update.length; j++) {
                let page2 = update[j];
                // page 1 should be before page 2
                if(beforeRules[page1][page2]) {
                    // OK
                }
                // page 1 should be after page 2
                // so the update order is wrong
                else if(afterRules[page1][page2]) {
                    correct = false;
                    break;
                }
                // page 2 should be before page 1
                // so the update order is wrong
                if(beforeRules[page2][page1]) {
                    correct = false;
                    break;
                }
                // page 2 should be after page 1
                else if(afterRules[page2][page1]) {
                    // OK
                }
            }
            if(!correct) {
                break;
            }
        }
        if(correct) {
            solution += Number.parseInt(midNum);
            correctCount++;
        }
        let deepCopyArray = JSON.parse(JSON.stringify(update));
        deepCopyArray.sort((a, b,) => sortFunction(a, b, beforeRules, afterRules));
        let midNum2 = deepCopyArray[(deepCopyArray.length - 1) / 2];
        fullSum += Number.parseInt(midNum2);
        if(!correct) {
            part2 += Number.parseInt(midNum2);
        }
        if(!correct) {
            console.log('update', update, 'midNum', midNum, 'deepCopyArray', deepCopyArray, 'midNum2', midNum2);
        } else {
            console.log('update', update, 'midNum', midNum);
        } 
    }

    console.log('solution', solution, `(${correctCount})`, 'part2', part2, `(fullSum: ${fullSum})`);

    process.emit('exit_event');
}

main();

function sortFunction(a, b, beforeRules, afterRules) {
    if(beforeRules[a][b]) {
        return -1;
    }
    else if(afterRules[a][b]) {
        return 1;
    }
    else if(beforeRules[b][a]) {
        return 1;
    }
    else if(afterRules[b][a]) {
        return -1;
    }
    else {
        return 0;
    }
}