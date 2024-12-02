import { gotInput, toLines, toArray } from '../../puzzle-input/got-puzzle-input.mjs';

async function main() {
    console.log('[day1]');

    const input = await gotInput(1);
    const lines = toLines(input);
        
    let solution = 0;
    let part2 = 0;
    let left = [];
    let right = [];
    for(let i = 0 ; i < lines.length ; i++) {
        let match = toArray(`${lines[i]}`);

        left.push(match[0]);
        right.push(match[1]);

        if(i < 5) {
            console.log(lines[i], match);
        }
        if(i == 500) {
            console.log('...');
        }
        if(i > lines.length - 10) {
            console.log(lines[i], match);
        }
    }

    // console.log('left', left);
    // console.log('right', right);

    left = left.sort((a,b) => a - b);
    right = right.sort((a,b) => a - b);

    // console.log('sorted left', left);
    // console.log('sorted right', right);

    for(let i = 0 ; i < left.length ; i ++){
        let distance = Math.abs(left[i]-right[i]);
        solution = solution + distance;
    }

    for(let l of left){
        let similarityScore = 0;
        for(let r of right) {
            if(r === l) {
                similarityScore = similarityScore + l;
            } 
        }
        part2 = part2 + similarityScore;
    }


    console.log('solution', solution, 'part2', part2);

    process.emit('exit_event');
}

main();
