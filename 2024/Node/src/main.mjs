let commandString = '';
if (process.argv.length > 2) {
    for (let i = 2; i < process.argv.length; i++) {
        commandString += `${process.argv[i]} `;
    }
    commandString = commandString.trim();
}

if (/^no[- ]operation\b/.test(commandString)) {
    process.exit(0);
} 
// else if (/^db[- ]?install\b/.test(commandString)) {
//     dbinstall();
// } 
else if (/^day[- ]?\d+$/.test(commandString)) {
    importDayX(commandString)
}
else if (/^day[- ]?\d+ \S+\b/.test(commandString)) {
    importDayX_vS(commandString)
} else {
    main();
}


async function importDayX(commandString) {
    const match = /^day[- ]?(\d+)\b/.exec(commandString) || ['0','0'];
    // console.log(match[1]);
    if(match[1]) {
        try {
            await import(`../adventSrc/day${match[1]}/day${match[1]}.mjs`);
        } catch (err) {
            console.error(`[main] import of "../adventSrc/day${match[1]}/day${match[1]}.mjs" failed.`);
            process.emit('exit_event');
        }
    }
}

async function importDayX_vS (commandString) {
    const match = /^day[- ]?(\d+) (\S+)\b/.exec(commandString) || ['0','0','0'];
    console.log(match[1], match[2]);
    if(match[1] && match[2]) {
        try {
            await import(`../adventSrc/day${match[1]}/day${match[1]}_${match[2]}.mjs`);
        } catch (err) {
            console.error(`[main] import of "../adventSrc/day${match[1]}/day${match[1]}_${match[2]}.mjs" failed.`);
            process.emit('exit_event');
        }
    }
}

// async function dbinstall() {
//     await import('./db-install/db-install.mjs');
// }

async function main() {
    console.log('Usage:');
    console.log('\tnpm start day X');
    console.log('\tnpm run day X');
    console.log('');
    console.log('\trequired: process.env.TOKEN');
    console.log('');
    process.emit('exit_event');

    // await import('./log/event-logger.mjs');
    // const emitter = (await import('./event-emitter.mjs')).default;
    // emitter.on('main', () => {/* NOP */ });
    // await import('./main/main.mjs');
}