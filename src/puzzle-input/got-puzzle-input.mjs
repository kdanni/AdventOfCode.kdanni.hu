import got from 'got';

export async function gotInput(day){

    try {
        const result = await got(`https://adventofcode.com/2024/day/${day}/input`, {
            headers: {
                Cookie: `session=${process.env.TOKEN};`
            }
        });
        const {body} = result;
        // console.log(body);
        return `${body}`;
    } catch (err) {
        console.error(err);
    }
}

export function toLines(input){
    if(!input || input.length < 1) {
        throw 'Imput error!';
    }
    return  `${input}`.match(/[^\r\n]+/g);
}

export function toArray(line, notNumber){
    if(!line || line.length < 1) {
        throw 'Line error!';
    }
    let match = `${line}`.match(/[^ \t]+/g);
    if(!notNumber) {
        match = match.map(v => {return Number.parseInt(v)});
    }
    return match;
}