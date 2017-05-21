#!/usr/bin/env node

'use strict';

var watch = require('node-watch'),
    program = require('commander'),
    simpleGit = require('simple-git'),
    packageJson = require('./package.json');

let messages = [
    'Fix bug.',
    'Refactoring.',
    'Improvements.',
    'Small fixes.'
];

function getProgramVersion() {
    if (Object.keys(packageJson).indexOf('version') !== -1) {
        return packageJson.version;
    }
    return '0.0.1';
}

function getRandomMessage() {
    return messages[Math.round(Math.random()) * (messages.length - 1)];
}

program.version(getProgramVersion());
    
program
    .command('work [env]')
    .description('Adds a watch which will commit every time you save a file.')
    .action((env, options) => {
        console.log("You will be productive in no time!");
        console.log(`[debug] I'll watch: ${process.cwd()}`);

        let localGit = simpleGit(process.cwd());
        watch(process.cwd(), {
            recursive: true,
            filter: (name) => {
                console.log("Filter");
                return (name.indexOf('.git') === -1);
            }
        }, (evt, name) => {
            console.log('[debug] new change: ', evt, name);

            localGit.add('./*').commit(getRandomMessage());
        });
    });
    
program.parse(process.argv);
