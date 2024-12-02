import { gotInput, toLines, toArray } from '../../puzzle-input/got-puzzle-input.mjs';

async function main() {
    console.log('[day2]');
    
    const input = await gotInput(2);
    const lines = toLines(input);
        
    let solution = 0;
    let part2 = 0;
    for(let i = 0 ; i < lines.length ; i++) {
        let match = toArray(`${lines[i]}`);
        
        let {order, safe, firstTry, match2} = levelCheckPart2(match);

        part2 = part2 + safe;
        solution = solution + (firstTry === 1 ? safe : 0);

        // if(i < 50 && firstTry !== 1) {
        if(i < 5) {
            console.log(lines[i], match, order, safe === 1, firstTry, match2);
        }
        if(i == 500) {
            console.log('...');
        }
        // if(i > lines.length - 50 && firstTry !== 1) {
        if(i > lines.length - 10) {
            console.log(lines[i], match, order, safe === 1, firstTry, match2);
        }
    }

    console.log('lines.length', lines.length, 'solution', solution, 'part2', part2);
    process.emit('exit_event');
}

main();


function levelCheckPart2(match) {
    let firstTry = 0;
    let match2 = null;
    let order = 0 
    let safe = 0 
    let l1 = levelCheck(match);
    safe = l1.safe;
    order = l1.order;
    if(safe === 0) { 
        for(let i = 0; i < match.length ; i++) {
            match2 = [];
            for(let j = 0; j < match.length ; j++) {
                if(i !== j) {
                    match2.push(match[j]);
                }                
            }
            let l2 = levelCheck(match2);
            safe = l2.safe;
            order = l2.order;
            if(safe === 1) {
                break;
            }
        }
    } else {
        firstTry = 1;
    }
    
    return {order, safe, firstTry, match2};
}

function levelCheck(match) {
    let order = 0;
    let safe = 0;
    for (let j = 0; j < match.length -1 ; j++){
        let a = match[j];
        let b = match[j+1];
        let distance = Math.abs(b-a);
        if(distance > 3) {
            order = NaN;
            safe = 0;
            break;
        }
        if(b - a == 0 ) {
            order = 0;
            safe = 0;
            break;
        } else if ( b - a > 0) {
            if(order === 0) {
                order = 1;
            } else if (order !== 1) {
                order = 2;
                safe = 0;
                break;
            }
        } else if (b - a < 0 ) {
            if(order === 0) {
                order = -1;
            } else if (order !== -1) {
                order = -2;
                safe = 0;
                break;
            }
        }
        safe = 1;
    }
    return {order, safe};
}