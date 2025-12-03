import * as fs from 'node:fs/promises';
import { sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const metaUrlPath = fileURLToPath(new URL('.', import.meta.url));

import got from 'got';

export async function gotInput(day){

    try {
        const result = await got(`https://adventofcode.com/2025/day/${day}/input`, {
            headers: {
                Cookie: `session=${process.env.TOKEN};`
            }
        });
        const {body} = result;
        // console.log(body);

        try {
            const adventDir = fileURLToPath(pathToFileURL(`${metaUrlPath}${sep}..${sep}..${sep}adventSrc`));
            const filePath = fileURLToPath(pathToFileURL(`${adventDir}${sep}day${day}${sep}day${day}.txt`));
            console.log(filePath);
            await fs.writeFile(filePath, `${body}`);
            
        } catch (ferr) {
            console.error(ferr);
        }

        return `${body}`;
    } catch (err) {
        console.error(err);
    }
}

export async function getInputFile(day, fileName){
    try {
        const adventDir = fileURLToPath(pathToFileURL(`${metaUrlPath}${sep}..${sep}..${sep}adventSrc`));
        const filePath = fileURLToPath(pathToFileURL(`${adventDir}${sep}day${day}${sep}${fileName}`));
        console.log(filePath);
        const data = await fs.readFile(filePath, 'utf-8');
        return data;
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