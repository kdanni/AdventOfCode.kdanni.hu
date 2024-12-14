export class RobotMap {
    constructor(maxX, maxY) {
        this.robots = [];
        this.maxX = maxX || 101;
        this.maxY = maxY || 103;
        this.seconds = 0;
    }
    push(robot) {
        this.robots.push(robot);
    }
    move() {
        for (let i = 0; i < this.robots.length; i++) {
            this.robots[i].move();
        }
        this.seconds++;
    }
    printNextMove() {
        for (let i = 0; i < this.robots.length; i++) {
            this.robots[i].printNextMove();
        }
    }
    printMap(easterEgg) {
        !easterEgg && console.log('\n' + `No. ${this.seconds}:`);
        let printEasterEgg = false;
        let asciiArt = '';
        const safetyScore = {};
        const robotPositons = {};
        for (let i = 0; i < this.robots.length; i++) {
            let pos = `${this.robots[i].x},${this.robots[i].y}`;
            robotPositons[pos] = robotPositons[pos] || 0;
            robotPositons[pos] += 1;
        }
        for (let y = 0; y < this.maxY; y++) {
            let line = '';
            let xInLine = 0;
            for (let x = 0; x < this.maxX; x++) {
                line += ' ';
                if(robotPositons[`${x},${y}`] > 0) {
                    xInLine++;
                    line += `${robotPositons[`${x},${y}`]}`;
                    if(x < Math.floor(this.maxX/2) && y < Math.floor(this.maxY/2)) {
                        // Q1
                        safetyScore['Q1'] = safetyScore['Q1'] || 0;
                        safetyScore['Q1'] += robotPositons[`${x},${y}`];
                    }
                    if(x > Math.floor(this.maxX/2) && y < Math.floor(this.maxY/2)) {
                        // Q2
                        safetyScore['Q2'] = safetyScore['Q2'] || 0;
                        safetyScore['Q2'] += robotPositons[`${x},${y}`];
                    }
                    if(x < Math.floor(this.maxX/2) && y > Math.floor(this.maxY/2)) {
                        // Q3
                        safetyScore['Q3'] = safetyScore['Q3'] || 0;
                        safetyScore['Q3'] += robotPositons[`${x},${y}`];
                    }
                    if(x > Math.floor(this.maxX/2) && y > Math.floor(this.maxY/2)) {
                        // Q4
                        safetyScore['Q4'] = safetyScore['Q4'] || 0;
                        safetyScore['Q4'] += robotPositons[`${x},${y}`];
                    }
                    if(xInLine > 10) {
                        printEasterEgg = true;
                    }
                } else  {
                    xInLine = 0;
                    line += '.';
                }
                // if(x === Math.floor(this.maxX/2)) {
                //     line = line.substring(0, line.length-1) + ' ';
                // }
                // if(y === Math.floor(this.maxY/2)) {
                //     line = line.substring(0, line.length-1) + ' ';
                // }
            }
            // line += ' ';
            !easterEgg && console.log(`#${`${y}`.padStart(3,' ')}`, line);
            asciiArt += line + '\n';
        }
        let safetyScoreSum = 1;
        let safetyScoreKeys = Object.keys(safetyScore);
        for (const key in safetyScore) {
            !easterEgg && console.log(`Safety score: ${key} = ${safetyScore[key]}`);
            safetyScoreSum *= safetyScore[key];
        }
        !easterEgg && console.log(`No. ${this.seconds} | Safety score: ${safetyScoreSum} (${safetyScoreKeys})` + '\n');
        if(easterEgg && printEasterEgg) {
            console.log('\n\n' + asciiArt + '\n\n');
            console.log(`No. ${this.seconds} | Safety score: ${safetyScoreSum} (${safetyScoreKeys})` + '\n');
        }
    }
}