import { gotInput, toLines, toArray } from '../../src/puzzle-input/got-puzzle-input.mjs';

import emitter from '../../src/event-emitter.mjs';


let part2 = 0;

emitter.on('2024-day7', (msg) => {
    console.log('2024-day7 eventListener' , msg);

    part2 = part2 + msg.value;
});

async function main() {
    console.log('[day7]');

    const input = await gotInput(7);
    const lines = toLines(input);
        
    let solution = 0;
    let equations = [];
    for(let i = 0 ; i < lines.length ; i++) {
        let line = lines[i];
        // console.log(`#${i} `, line);
        let match = /(\d+):[^\d]*(.+)$/.exec(line) || [];
        if(match[1] && match[2]) {
            // console.log('match', match[1], ':', match[2]);
            let d1 = Number.parseInt(match[1]);
            let split = match[2].split(/[^\d]/);
            // console.log('split', split);
            let d2 = split.map(d => { try { return Number.parseInt(d); } catch(e) { return 1 * d; } });
            // console.log('d2', d2);
            equations.push([d1, d2]);
        }
    }

    console.log('equations', equations);
    
    let perms = permutations(['+', '*']);
    console.log('perms', perms);

    let bins = putInBinCombinations(['+', '*'], 1,  5);
    console.log('bins', bins);

    
    for(let eq of equations) {
        let len = eq[1].length;
        let ops = putInBinCombinations([add, mul], 1, len - 1);
        // console.log(eq[0] , ' = ' , eq[1] , 'ops', ops);
        let isthereAnyCorrect = false;
        let correctCount = 0;
        let possibleOpOrder = ops.length;
        let correctOpOrder = [];
        for(let op of ops) {
            let equation = `${eq[0]} ?= `;
            let s = eq[1][0];
            for(let i = 0; i < len; i++) {
                let num = eq[1][i];
                if(i > 0) {
                    s = op[i - 1](s, num);
                }
                if(i < len - 1) {
                    equation += `${num} ${op[i] === mul ? '*':'+'} `;
                } else {
                    equation += `${num}`;
                }
            }
            if(s === eq[0]) {
                equation += ` =  ${s}  =  ${eq[0]}`;	
                correctCount++;
                correctOpOrder.push(op);
                isthereAnyCorrect = true;
            } else {
                equation += ` =  ${s}  !=  ${eq[0]}`;
            }
            // console.log('equation', equation);
        }
        console.log(`${eq[0]}: ${eq[1]}`, 'correctCount', correctCount, 'possibleOpOrder', possibleOpOrder);
        if(isthereAnyCorrect) {
            solution = solution + eq[0];
        }
    }

    let promisses = [];

    for(let eq of equations) {
        const func = async () => {
            let len = eq[1].length;
            let ops = putInBinCombinations([add, mul, concat], 1, len - 1);
            // console.log(eq[0] , ' = ' , eq[1] , 'ops', ops);
            let isthereAnyCorrect = false;
            let correctCount = 0;
            let possibleOpOrder = ops.length;
            let correctOpOrder = [];
            for(let op of ops) {
                let equation = `${eq[0]} ?= `;
                let s = eq[1][0];
                for(let i = 0; i < len; i++) {
                    let num = eq[1][i];
                    if(i > 0) {
                        s = op[i - 1](s, num);
                    }
                    if(i < len - 1) {
                        equation += `${num} ${op[i] === mul ? '*': (op[i] === add ? '+' : '||')} `;
                    } else {
                        equation += `${num}`;
                    }
                }
                if(s === eq[0]) {
                    equation += ` =  ${s}  =  ${eq[0]}`;	
                    correctCount++;
                    correctOpOrder.push(op);
                    isthereAnyCorrect = true;
                } else {
                    equation += ` =  ${s}  !=  ${eq[0]}`;
                }
                // console.log('equation', equation);
            }
            console.log(`${eq[0]}: ${eq[1]}`, 'correctCount', correctCount, 'possibleOpOrder', possibleOpOrder);
            if(isthereAnyCorrect) {
                // part2 = part2 + eq[0];                
                emitter.emit('2024-day7', {value: eq[0], correctCount});
            }
        }
        promisses.push(func());
    }

    await Promise.all(promisses);
    await new Promise((resolve) => { setTimeout(resolve, 2000); });

    console.log('solution', solution, 'part2', part2);

    process.emit('exit_event');
}

main();

function add(a, b) {
    return a + b;
}
function mul(a, b) {
    return a * b;
}
function concat (a, b) {
    try {
        return Number.parseInt(`${a}${b}`);
    } catch(e) {
        return 1 * `${a}${b}`;
    }
}

function permutations(arr) {
    if(arr.length === 1) {
        return [arr];
    }
    let result = [];
    for(let i = 0; i < arr.length; i++) {
        let rest = arr.slice(0, i).concat(arr.slice(i + 1));
        let restPerm = permutations(rest);
        for(let j = 0; j < restPerm.length; j++) {
            result.push([arr[i]].concat(restPerm[j]));
        }
    }
    return result;
}

// out of n items put k items in m bins reapeting allowed
// Unused but context for Copilot
function putInBins(n, k, m) {
    if(m === 1) {
        return [[n]];
    }
    let result = [];
    for(let i = 0; i <= n; i++) {
        let rest = putInBins(n - i, k - 1, m - 1);
        for(let j = 0; j < rest.length; j++) {
            result.push([i].concat(rest[j]));
        }
    }
    return result;
}

// enumerate all posible combinations of n items in m bins with repetition allowed 
function putInBinCombinations(arrayOfNitems, k, m) {
    if(m === 1) {
        return arrayOfNitems.map(n => [n]);
    }
    let result = [];
    for(let i = 0; i < arrayOfNitems.length; i++) {
        let rest = putInBinCombinations(arrayOfNitems, k - 1, m - 1);
        for(let j = 0; j < rest.length; j++) {
            result.push([arrayOfNitems[i]].concat(rest[j]));
        }
    }
    return result;
}