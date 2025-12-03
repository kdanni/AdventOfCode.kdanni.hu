import { gotInput, toLines, toArray, getInputFile } from '../../src/puzzle-input/got-puzzle-input.mjs';

import emitter from '../../src/event-emitter.mjs';
import { timeStamp } from 'node:console';
import { get } from 'node:http';

const DAY = 17;

let solution = 0;
let part2 = 0;

emitter.on(`2024-day${DAY}`, (msg) => {
    console.log(`2024-day${DAY} eventListener` , msg);

    // part2 = part2 + msg.value;

    console.log('solution', solution, 'part2', part2, 'example expected', 117440);
    process.emit('exit_event');
});



async function main() {
    console.log(`[day${DAY}]`);
    
    const input = await gotInput(DAY);
    const lines = toLines(input);
    
    
    // let computer = new Computer(
    //     new Register(729),
    //     new Register(0),
    //     new Register(0),
    //     new Program([0,1,5,4,3,0])
    // );
    // let computer = new Computer(
    //     // new Register(2024),
    //     new Register(117440),
    //     new Register(0),
    //     new Register(0),
    //     new Program([0,3,5,4,3,0])
    // );
    
    let computer = Computer.parseInput(lines);
    
    computer.printState();
    computer.run();
    solution = computer.getSolution();

    // console.log('\n\n');
    // computer.reverse();
    // part2 = computer.getPart2();

    let promises = [];
    for(let i = 1000000016569736; 
        i < Number.MAX_SAFE_INTEGER ; i++) {
        let func = async (i) => {
            computer = Computer.parseInput(lines);
            // let computer = new Computer(
            //     // new Register(2024),
            //     new Register(117440),
            //     new Register(0),
            //     new Register(0),
            //     new Program([0,3,5,4,3,0])
            // );
            computer.registerA.set(i);
            computer.run();
            let output = computer.testOutputAndProgram();
            console.log('i', i, 'output', output);
            if(output) {
                part2 = i;
                this.emit(`2024-day${DAY}`, {value: i});
            }
        }
        promises.push(func(i));
    }

    await Promise.all(promises);


    console.log('solution', solution, 'part2', part2, 'example expected', 117440);
    process.emit('exit_event');
}

main();


class Program {
    static parseProgram(value) {
        if (typeof value === 'string') {
            let prog = `${value}`.replace('Program: ', '');
            prog = prog.split(',');
            prog = prog.map((v) => parseInt(v));
            return new Program(prog);
        } else {
            return new Program([]);
        }
    }
    
    constructor(program) {
        this.program = program || [];
    }

    printProgram() {
        console.log(this.program);
    }

    get(instructionPointer) {
        if(instructionPointer >= this.program.length) {
            return null;
        }
        return [ this.program[instructionPointer], this.program[instructionPointer + 1]];        
    }
}


class Register {
    static parseRegister(value) {
        if (typeof value === 'number') {
            return new Register(value);
        } else if (typeof value === 'string') {
            let m = /Register .+: (\d+)/.exec(value) || [value, value];
            return new Register(parseInt(`${m[1]}`));
        } else if (value instanceof Register) {
            return new Register(value.value);
        } else {
            return new Register(0);
        }
    }

    constructor(value) {
        this.value = value || 0;
    }

    get() {
        return this.value;
    }

    set(value) {
        this.value = value;
    }
    
    printValue() {
        console.log(this.value);
    }
    printBinary() {
        console.log(this.value.toString(2));
    }
    printOctal() {
        console.log(this.value.toString(8));
    }
    printHex() {
        console.log(this.value.toString(16));
    }
}

class Computer {
    static parseInput(input) {
        let registerA;
        let registerB;
        let registerC;
        let program;
        for(let y = 0 ; y < input.length ; y++) {
            let line = input[y];
            // console.log(`#${y} `, line);
            if(line.startsWith('Register A')) {
                registerA = Register.parseRegister(line);
            } else if(line.startsWith('Register B')) {
                registerB = Register.parseRegister(line);
            } else if(line.startsWith('Register C')) {
                registerC = Register.parseRegister(line);
            } else if(line.startsWith('Program')) {
                program = Program.parseProgram(line);
            }
        }
        return new Computer(registerA, registerB, registerC, program);
    }

    constructor(registerA, registerB, registerC, program) {
        this.registerA = registerA;
        this.registerB = registerB;
        this.registerC = registerC;
        this.program = program;
        this.instructionPointer = 0;
        this.outputArray = [];
        this.reverseArray = [];
        this.jumps = {};
    }

    getPart2() {   
        return this.registerA.get();
    }

    run() {
        let halt = false;
        this.instructionPointer = 0;
        while(!halt) {
            let instruction = this.program.get(this.instructionPointer);
            if(!instruction) {
                halt = true;
                break;
            }
            let [opcode, operand] = instruction;
            // console.log(`[${this.instructionPointer}] ${opcode} ${operand}`);
            
            let jnz = this.perform(opcode, operand);
            this.printState()

            if(isNaN(jnz)) {
                this.instructionPointer += 2;
            } else {
                this.instructionPointer = jnz;
            }
        }
    }

    testOutputAndProgram() {

        if(this.outputArray.length !== this.program.program.length) {
            // console.log('outputArray.length !== program.length');
            return false;
        }
        for(let i = 0 ; i < this.outputArray.length ; i++) {
            let output = this.outputArray[i];
            let code = this.program.program[i];
            if(output !== code) {
                console.log('output !== code');
                return false;
            }
        }
        return true;

    }
    
    reverse() {
        this.findJumps();
        console.log('Jumps', this.jumps);
        this.findOutputs();
        this.instructionPointer = this.program.program.length - 2;
        console.log('this.instructionPointer', this.instructionPointer);
        let halt = false;
        while(!halt) {
            let instruction = this.program.get(this.instructionPointer);
            let [opcode, operand] = instruction;
            
            console.log(`[${this.instructionPointer}] ${opcode} ${operand}`);
            let jnz = this.perform(opcode, operand, true);

            this.printState();
            // console.log('outputArray', this.outputArray);
            console.log('reverseArray', this.reverseArray);

            if(this.program.program.length <= this.reverseArray.length) {
                halt = true;
                break;
            }
            if(isNaN(jnz)) {
                this.instructionPointer -= 2;
            } else {
                this.instructionPointer = jnz;
                this.program.printProgram();
            }
        }
    }


    findJumps() {
        for(let i = 0 ; i < this.program.program.length ; i+=2) {
            let instruction = this.program.get(i);
            let [opcode, operand] = instruction;
            if(opcode === 3) {
                this.jumps[operand] = this.jumps[operand] || [];
                this.jumps[operand].push(i);
            }
        }
    }
    findOutputs() {
        let outputs = [];
        for(let i = 0 ; i < this.program.program.length ; i+=2) {
            let instruction = this.program.get(i);
            let [opcode, operand] = instruction;
            if(opcode === 5) {
                outputs.push({i, opcode , operand, combo: this.getComboOperand(operand)});
            }
        }
        console.log('program');
        this.program.printProgram();
        console.log('outputs', outputs);
    }

    perform(opcode, operand, reverse = false) {
        if(opcode == 0) {
            // The adv instruction (opcode 0) performs division

            // The numerator is the value in the A register.
            if(!reverse) {
                let numerator = this.registerA.get();
                let denominator = Math.pow(2, this.getComboOperand(operand));
                let div = numerator / denominator;
                div = Math.floor(div);

                this.registerA.set(div);

            } else {
                let a = this.registerA.get();
                let denominator = Math.pow(2, this.getComboOperand(operand));
                let mul = (a == 0) ? operand : a * denominator;

                this.registerA.set(mul);

            }

        } else if(opcode == 1) {
            // The bxl instruction (opcode 1) calculates the bitwise XOR
            // of register B and the instruction's literal operand,
            
            let b = this.registerB.get();
            let bxl = b ^ operand;

            //  then stores the result in register B.
            this.registerB.set(bxl);

        } else if(opcode == 2) {
            // The bst instruction (opcode 2) calculates the value of its combo operand modulo 8
            // (thereby keeping only its lowest 3 bits), then writes that value to the B register

            let comboOperand = this.getComboOperand(operand);
            let mod = comboOperand % 8;

            this.registerB.set(mod);

        } else if(opcode == 3) {
            // The jnz instruction (opcode 3) does nothing if the A register is 0. 
            if(this.registerA.get() === 0) {
                return NaN;
            }

            // However, if the A register is not zero,
            // it jumps by setting the instruction pointer to the value of its literal operand
            // if this instruction jumps, the instruction pointer 
            // is not increased by 2 after this instruction

            if(!reverse) {
                return operand;
            }

        } else if(opcode == 4) {
            /* The bxc instruction (opcode 4) calculates the 
            bitwise XOR of register B and register C, 
            then stores the result in register B. 
            (For legacy reasons, this instruction reads an operand but ignores it.) */

            let b = this.registerB.get();
            let c = this.registerC.get();

            let bxc = b ^ c;

            this.registerB.set(bxc);

        } else if(opcode == 5) {
            /* The out instruction (opcode 5) calculates 
            the value of its combo operand modulo 8, then outputs that value. */

            let comboOperand = this.getComboOperand(operand);
            let mod = comboOperand % 8;

            if(!reverse) {
                this.outputArray.push(mod);
            } else {
                let i = this.program.program.length - 1 - this.reverseArray.length;
                let code = this.program.program[i];
                console.log('opcode 5, code', i, this.program.program[i]);
                this.registerB.set(code);
                this.reverseArray.unshift(code);
            }

        } else if(opcode == 6) {
            /* The bdv instruction (opcode 6) works exactly like the adv 
             instruction except that the result is stored in the B register.
             (The numerator is still read from the A register.) */

            if(!reverse) {
                let numerator = this.registerA.get();
                let denominator = Math.pow(2, this.getComboOperand(operand));
                let div = numerator / denominator;
                div = Math.floor(div);

                this.registerB.set(div);
            } else {
                // NOP
            }
            

        } else if(opcode == 7) {
            /* The cdv instruction (opcode 7) works exactly like the adv 
             instruction except that the result is stored in the C register.
             (The numerator is still read from the A register.) */

            if(!reverse) {
                let numerator = this.registerA.get();
                let denominator = Math.pow(2, this.getComboOperand(operand));
                let div = numerator / denominator;
                div = Math.floor(div);

                this.registerC.set(div);
            } else {
                // NOP
            }
            
        } else {
            throw new Error('Invalid opcode');
        }
        if(reverse) {
            return this.jumps[this.instructionPointer] || NaN;
        }
        return NaN;
    }
     
    getComboOperand(operand) {
        if(operand >= 0 && operand <= 3) {
            return operand;
        } else if(operand === 4) {
            return this.registerA.get();
        } else if(operand === 5) {
            return this.registerB.get();
        } else if(operand === 6) {
            return this.registerC.get();
        } else {
            throw new Error('Invalid operand');
        }
    }

    getSolution() {
        return this.outputArray.join(',');
    }

    printState() {
        // this.registerA.printValue();
        // this.registerB.printValue();
        // this.registerC.printValue();
        // this.program.printProgram();
    }
}