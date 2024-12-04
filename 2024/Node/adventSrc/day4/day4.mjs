import { gotInput, toLines, toArray } from '../../src/puzzle-input/got-puzzle-input.mjs';

async function main() {
    console.log('[day4]');
    
    const input = await gotInput(4);
    const lines = toLines(input);
        
    let solution = 0;
    let part2 = 0;
    let countLtR = 0;
    let countRtL = 0;
    let countTtB = 0;
    let countBtT = 0;
    let countTLtBR = 0;
    let countTRtBL = 0;
    let countBLtTR = 0;
    let countBRtTL = 0;

    for(let i = 0 ; i < lines.length ; i++) {
        // console.log(lines[i]);
        let m = `${lines[i]}`.match(/XMAS/g) || [];
        countLtR += m.length;
    }
    
    for(let i = 0 ; i < lines.length ; i++) {
        let line = '';
        for(let j = lines[i].length - 1 ; j > -1 ; j--) {
            line = line + lines[i][j];
        }
        let m = `${line}`.match(/XMAS/g) || [];
        countRtL += m.length;
    }
    for(let i = 0 ; i < lines.length ; i++) {
        let line = '';
        for(let j = 0 ; j < lines[i].length ; j++) {
            line = line + lines[j][i];
        }
        let m = `${line}`.match(/XMAS/g) || [];
        countTtB += m.length;
    }        
    for(let i = 0 ; i < lines.length ; i++) {
        let line = '';
        for(let j = lines[i].length - 1 ; j > -1 ; j--) {
            line = line + lines[j][i];
        }
        let m = `${line}`.match(/XMAS/g) || [];
        countBtT += m.length;
    }

    for(let i = 0 ; i < lines.length ; i++) {
        for(let j = 0 ; j < lines[i].length ; j++) {
            if(i === 0 || j === 0 ) {
                let line = '';
                for(let k = 0 ; (i + k < lines.length) && (j + k < lines[i].length) ; k++) {
                    line = line + lines[i+k][j+k];
                }
                let m = `${line}`.match(/XMAS/g) || [];
                // console.log(line);
                countTLtBR += m.length;
            }
        }
    }
    for(let i = 0 ; i < lines.length ; i++) {
        for(let j = 0 ; j < lines[i].length ; j++) {
            if(i === 0 || j === lines[i].length - 1 ) {
                let line = '';
                for(let k = 0 ; (i + k < lines.length) && (j - k > -1) ; k++) {
                    line = line + lines[i+k][j-k];
                }
                let m = `${line}`.match(/XMAS/g) || [];
                // console.log(line);
                countTRtBL += m.length;
            }
        }
    }
    for(let i = 0 ; i < lines.length ; i++) {
        for(let j = 0 ; j < lines[i].length ; j++) {
            if(i === lines.length -1 || j === 0 ) {
                let line = '';
                for(let k = 0 ; (i - k > -1) &&  (j + k < lines[i].length) ; k++) {
                    line = line + lines[i-k][j+k];
                }
                let m = `${line}`.match(/XMAS/g) || [];
                // console.log(line);
                countBLtTR += m.length;
            }
        }
    }
    for(let i = 0 ; i < lines.length ; i++) {
        for(let j = 0 ; j < lines[i].length ; j++) {
            if(i === lines.length -1 || j === lines[i].length - 1 ) {
                let line = '';
                for(let k = 0 ; (i - k > -1) && (j - k > -1) ; k++) {
                    line = line + lines[i-k][j-k];
                }
                let m = `${line}`.match(/XMAS/g) || [];
                // console.log(line);
                countBRtTL += m.length;
            }
        }
    }


    console.log('countLtR', countLtR);
    console.log('countRtL', countRtL);
    console.log('countTtB', countTtB);
    console.log('countBtT', countBtT);
    console.log('countTLtBR', countTLtBR);
    console.log('countTRtBL', countTRtBL);
    console.log('countBLtTR', countBLtTR);
    console.log('countBRtTL', countBRtTL);

    solution = countLtR + countRtL + countTtB + countBtT + countTLtBR + countTRtBL + countBLtTR + countBRtTL;


    for(let i = 0 ; i < lines.length ; i++) {
        for(let j = 0 ; j < lines[i].length ; j++) {
            if(lines[i][j] === 'A' ) {
                if(i !== 0 && j!== 0 && i !== lines.length -1 && j !== lines[i].length - 1 ) {
                    // let xmas = [['.','.','.'],['.','A','.'],['.','.','.']]; 
                    let regexxing = ''; 
                    // let M = 0;
                    // let S = 0;
                    for(let k = -1 ; k < 2 ; k+=2) {
                        for(let l = -1 ; l < 2 ; l+=2) {
                            // if(lines[i+k][j+l] === 'M') {
                            //     M++;
                            // }
                            // if(lines[i+k][j+l] === 'S') {
                            //     S++;
                            // }
                            // xmas[1+k][1+l] = lines[i+k][j+l]; 
                            // console.log(i,j,lines[i][j] ,k,l, lines[i+k][j+l], 1+k, 1+l, xmas[1+k][1+l]);                           
                            regexxing += lines[i+k][j+l];
                        }
                    }
                    // if(M === 2 && S === 2) {
                        // if(xmas[0][0] === xmas[2][2]) {              
                        //     // M . S    S . M
                        //     // . A .    . A .
                        //     // S . M    M . S     
                        //     // console.log(xmas);
                        // }
                        // else {
                        //     part2 = part2 + 1;                        
                        // }
                    // }                    
                    // console.log(regexxing);
                    if(/(SSMM|SMSM|MSMS|MMSS)/.test(regexxing)){
                        part2 = part2 + 1;
                    }
                }                
            }
        }
    }

    console.log('lines.length', lines.length, 'solution', solution, 'part2', part2);
    process.emit('exit_event');
}

main();
