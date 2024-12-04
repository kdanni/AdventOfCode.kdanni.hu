import { gotInput, toLines, toArray } from '../../src/puzzle-input/got-puzzle-input.mjs';

async function main() {
    console.log('[day3]');
    
    const input = await gotInput(3);
    const lines = toLines(input);
        
    let solution = 0;
    let part2 = 0;
    let oneLine = '';
    for(let i = 0 ; i < lines.length ; i++) {
        // let match = toArray(`${lines[i]}`);
        
        // console.log('\n' + lines[i] + '\n');
        
        let muls = `${lines[i]}`.match(/mul\(\d\d?\d?,\d\d?\d?\)/g);

        // console.log(muls);

        for(let mul of muls) {
            let match = /mul\((\d+),(\d+)\)/.exec(`${mul}`) || ['0','0','0'];
            if(match[1] && match[2]) {
                solution = solution + (1 * match[1] * match[2]);
                console.log(`mul( ${match[1]} , ${match[2]} ) = `, (1 * match[1] * match[2]))
            }
        }

        oneLine += `${lines[i]}`;
    } 

    let dont = ('dummy|do()' + oneLine).split(/don't\(\)/);

    // console.log(dont);
    for(let d of dont) {
        let enabled = /do\(\)(.+)$/.exec(d) || ['',''];
        if(enabled[1]) {
            console.log('\n' + enabled[1] + '\n', /dp\(\)/.test(enabled[1]), /dpn't\(\)/.test(enabled[1]));
            
            let muls = `${enabled[1]}`.match(/mul\(\d\d?\d?,\d\d?\d?\)/g);

            // console.log(muls);

            for(let mul of muls) {
                let match = /mul\((\d+),(\d+)\)/.exec(`${mul}`) || ['0','0','0'];
                if(match[1] && match[2]) {
                    part2 = part2 + (1 * match[1] * match[2]);
                    console.log(`mul( ${match[1]} , ${match[2]} ) = `, (1 * match[1] * match[2]))
                }
            }
        }
    }

    console.log('lines.length', lines.length, 'solution', solution, 'part2', part2);
    process.emit('exit_event');
}

main();
