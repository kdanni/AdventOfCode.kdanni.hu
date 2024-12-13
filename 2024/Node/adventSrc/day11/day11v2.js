const startUpTime = new Date();

let input = '5 89749 6061 43 867 1965860 0 206250';
input = input.split(' ');
input = input.map(Number);

console.log('input', input);

let dict = new Map();
let split = new Map();
function blink(stone, n) {
    let ret = 0;
    if (n == 1) {
        // number of stones
        if(`${stone}`.length % 2 == 0) {
            ret = 2;
        } else {
            ret = 1;
        }
    } else if (dict.get(`${stone},${n}`)) {
        return dict.get(`${stone},${n}`);
    } else if(stone == 0) {
        return blink(1, n - 1);
    } else if(`${stone}`.length % 2 == 0) {
        let nums = [];
        if(split.get(stone)) {
            nums = split.get(stone);
        } else {
            let num = `${stone}`;
            let num1 = parseInt(num.slice(0, num.length / 2));
            let num2 = parseInt(num.slice(num.length / 2));
            nums = [num1, num2];
            split.set(stone, nums);
        }
        ret = blink(nums[0], n - 1) + blink(nums[1], n - 1);
    } else {
        ret = blink(2024*stone, n - 1);      
    }
    dict.set(`${stone},${n}`, ret);
    return ret;
}

let solution = 0;
let part2 = 0;
for ( let i = 0; i < input.length; i++) {
    solution = solution + blink(input[i], 25);
    part2 = part2 + blink(input[i], 75);
}

console.log('solution', solution, 'part2', part2, 'dict', Object.keys(dict).length, 'split', Object.keys(split).length);
let upTimeMilis = new Date().getTime() - startUpTime.getTime();
console.log(`${Math.floor(upTimeMilis / 1000)%60}.${upTimeMilis % 1000}`);